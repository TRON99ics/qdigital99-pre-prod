import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DEFAULT_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://qdigital99.com",
  "https://www.qdigital99.com",
];

let ipRatelimit;
let emailRatelimit;

function getAllowedOrigins() {
  const origins = new Set(DEFAULT_ORIGINS);
  if (process.env.PUBLIC_BASE_URL) {
    origins.add(process.env.PUBLIC_BASE_URL.replace(/\/$/, ""));
  }
  for (const origin of (process.env.ALLOWED_ORIGINS || "").split(",")) {
    const trimmed = origin.trim();
    if (trimmed) origins.add(trimmed);
  }
  return origins;
}

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"] || req.headers["x-real-ip"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

export function applyCors(req, res) {
  const origin = req.headers.origin;
  const allowed = getAllowedOrigins();

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");

  if (origin && allowed.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    return true;
  }

  if (!origin) return true;
  return false;
}

export function parseRequestBody(req) {
  const raw = req.body;
  if (!raw) return {};
  if (typeof raw === "object") return raw;
  if (typeof raw === "string") {
    if (!raw.trim()) return {};
    return JSON.parse(raw);
  }
  return {};
}

export const contactPayloadSchema = z.object({
  username: z.string().trim().max(100).optional().default(""),
  email: z
    .string()
    .trim()
    .max(254)
    .refine((value) => EMAIL_RE.test(value), "Invalid email address"),
  contact: z.string().trim().max(50).optional().default(""),
  info: z.string().trim().max(10000).optional().default(""),
  remarks: z.string().trim().min(1, "Message is required").max(5000),
  userLocation: z.string().trim().max(500).optional().default(""),
  turnstileToken: z.string().trim().max(2048).optional().default(""),
  website: z.string().optional().default(""),
});

export function validateContactPayload(body) {
  const result = contactPayloadSchema.safeParse(body);
  if (!result.success) {
    const message = result.error.issues[0]?.message || "Invalid request";
    return { ok: false, error: message };
  }

  const data = result.data;
  if (data.website?.trim()) {
    return { ok: false, honeypot: true };
  }

  return {
    ok: true,
    data: {
      username: data.username,
      email: data.email.toLowerCase(),
      contact: data.contact,
      info: data.info,
      remarks: data.remarks,
      userLocation: data.userLocation || "",
      turnstileToken: data.turnstileToken,
    },
  };
}

function getIpRatelimit() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  if (!ipRatelimit) {
    ipRatelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, "1 m"),
      prefix: "qdigital99:contact:ip",
    });
  }
  return ipRatelimit;
}

function getEmailRatelimit() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  if (!emailRatelimit) {
    emailRatelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(3, "1 h"),
      prefix: "qdigital99:contact:email",
    });
  }
  return emailRatelimit;
}

async function countRecentEmailSubmissions(supabase, email) {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count, error } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("email", email)
    .gte("created_at", since);

  if (error) {
    console.error("Email rate-limit lookup failed:", error.message);
    return 0;
  }
  return count ?? 0;
}

export async function enforceRateLimits({ req, email, supabase }) {
  const ip = getClientIp(req);
  const ipLimiter = getIpRatelimit();
  if (ipLimiter) {
    const { success } = await ipLimiter.limit(ip);
    if (!success) {
      return { ok: false, status: 429, error: "Too many requests. Please try again later." };
    }
  }

  const emailLimiter = getEmailRatelimit();
  if (emailLimiter) {
    const { success } = await emailLimiter.limit(email);
    if (!success) {
      return {
        ok: false,
        status: 429,
        error: "Too many submissions for this email. Please try again later.",
      };
    }
  }

  const recentCount = await countRecentEmailSubmissions(supabase, email);
  if (recentCount >= 3) {
    return {
      ok: false,
      status: 429,
      error: "Too many submissions for this email. Please try again later.",
    };
  }

  return { ok: true };
}

export async function verifyTurnstileToken({ token, ip }) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: true };

  if (!token) {
    return { ok: false, error: "Security verification is required. Please refresh and try again." };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: ip,
  });

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    console.error("Turnstile verification HTTP error:", response.status);
    return { ok: false, error: "Security verification failed. Please try again." };
  }

  const result = await response.json();
  if (!result.success) {
    console.error("Turnstile verification failed:", result["error-codes"] || result);
    return { ok: false, error: "Security verification failed. Please try again." };
  }

  return { ok: true };
}

export function getTurnstileSiteKey() {
  return process.env.TURNSTILE_SITE_KEY || process.env.VITE_TURNSTILE_SITE_KEY || "";
}
