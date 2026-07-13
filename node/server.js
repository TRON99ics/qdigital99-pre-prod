import 'dotenv/config'
import express from 'express'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import {
  applyCors,
  enforceRateLimits,
  escapeHtml,
  getClientIp,
  getTurnstileSiteKey,
  validateContactPayload,
  verifyTurnstileToken,
} from '../api/lib/contact-security.js'

function classifyLead(remarks = '', info = '') {
  const r = String(remarks).toLowerCase()
  const i = String(info).toLowerCase()
  if (r.includes('lead magnet') || i.includes('lead magnet')) return 'lead_magnet'
  return 'contact'
}

function getEmailContent({ type, username }) {
  const safeName = username || 'there'
  if (type === 'lead_magnet') {
    return {
      subject: 'Your QDigital99 growth playbook is on the way',
      heading: `Thanks, ${safeName}!`,
      body: 'We received your request for the growth playbook. Our team will share it with you shortly.',
    }
  }
  return {
    subject: 'Thanks for contacting QDigital99',
    heading: `Thanks, ${safeName}!`,
    body: 'We received your message and will get back to you within one business day.',
  }
}

function getEmailImageUrl() {
  if (process.env.EMAIL_IMAGE_URL) return process.env.EMAIL_IMAGE_URL
  if (process.env.PUBLIC_BASE_URL) {
    return `${process.env.PUBLIC_BASE_URL.replace(/\/$/, '')}/og-image.png`
  }
  return 'https://qdigital99.com/og-image.png'
}

function buildEmailHtml({ heading, body, imageUrl }) {
  const safeHeading = escapeHtml(heading)
  const safeBody = escapeHtml(body)
  const safeImageUrl = escapeHtml(imageUrl)

  return `
    <div style="margin:0;padding:24px;background:#f0f0f0;font-family:Arial,Helvetica,sans-serif;color:#000000;text-align:center;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #dcdcdc;border-radius:16px;padding:28px 22px;">
        <p style="margin:0 0 16px 0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#1347ff;font-weight:600;">QDigital99</p>
        <h2 style="margin:0 0 14px 0;font-size:28px;line-height:1.2;letter-spacing:-0.02em;">${safeHeading}</h2>
        <p style="margin:0 0 20px 0;font-size:16px;line-height:1.6;color:#5a5a5f;">${safeBody}</p>
        <img src="${safeImageUrl}" alt="QDigital99" style="max-width:600px;width:100%;height:auto;border-radius:12px;margin:0 0 20px 0;" />
        <p style="margin:0;font-size:14px;line-height:1.5;color:#5a5a5f;">— QDigital99 Team</p>
      </div>
    </div>
  `
}

const app = express()
app.use(express.json({ limit: '100kb' }))

app.options('/api/contact', (req, res) => {
  const ok = applyCors(req, res)
  return res.status(ok ? 200 : 403).end()
})

app.options('/api/contact-config', (req, res) => {
  const ok = applyCors(req, res)
  return res.status(ok ? 200 : 403).end()
})

app.get('/api/contact-config', (req, res) => {
  if (!applyCors(req, res)) {
    return res.status(403).json({ error: 'Origin not allowed' })
  }
  return res.status(200).json({
    turnstileSiteKey: getTurnstileSiteKey(),
    turnstileRequired: Boolean(process.env.TURNSTILE_SECRET_KEY),
  })
})

app.post('/api/contact', async (req, res) => {
  if (!applyCors(req, res)) {
    return res.status(403).json({ error: 'Origin not allowed' })
  }

  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const resendApiKey = process.env.RESEND_API_KEY

    if (!supabaseUrl || !supabaseServiceRoleKey || !resendApiKey) {
      console.error('Missing required environment variables for /api/contact')
      return res.status(500).json({ error: 'Server configuration error' })
    }

    const validation = validateContactPayload(req.body)
    if (!validation.ok) {
      if (validation.honeypot) {
        return res.status(200).json({ success: true })
      }
      return res.status(400).json({ error: validation.error })
    }

    const { username, email, contact, info, remarks, userLocation, turnstileToken } =
      validation.data

    const ip = getClientIp(req)
    const turnstile = await verifyTurnstileToken({ token: turnstileToken, ip })
    if (!turnstile.ok) {
      return res.status(400).json({ error: turnstile.error })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)
    const rateLimit = await enforceRateLimits({ req, email, supabase })
    if (!rateLimit.ok) {
      return res.status(rateLimit.status).json({ error: rateLimit.error })
    }

    const resend = new Resend(resendApiKey)
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          username,
          email,
          contact,
          info,
          remarks,
          user_location: userLocation,
        },
      ])
      .select()

    if (error) throw error

    const leadType = classifyLead(remarks, info)
    const emailContent = getEmailContent({ type: leadType, username })
    const mailResult = await resend.emails.send({
      from: process.env.RESEND_FROM || 'QDigital99 <noreply@qdigital99.com>',
      to: [email],
      subject: emailContent.subject,
      html: buildEmailHtml({ ...emailContent, imageUrl: getEmailImageUrl() }),
    })
    if (mailResult?.error) {
      throw new Error(mailResult.error.message || 'Failed to send confirmation email')
    }

    return res.status(200).json({ success: true, id: data?.[0]?.id || null })
  } catch (err) {
    console.error('Server error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
})

const port = Number(process.env.PORT || 3000)
app.listen(port, () => {
  console.log(`QDigital99 API listening on http://localhost:${port}`)
})
