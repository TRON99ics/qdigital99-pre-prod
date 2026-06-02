# QDigital99 — Digital Experience System

A cinematic, conversion-focused digital experience for a performance marketing &
digital growth partner. Built with React (Vite), Tailwind v4, GSAP ScrollTrigger,
Lenis, Framer Motion, Three.js and React Three Fiber.

> Positioning: **A growth partner that understands both creativity and performance.**
> Voice: intelligent, premium, fast-moving, trustworthy, modern, experienced.

---

## 1. Sitemap

```
/                 Home          — cinematic 3D hero + full growth narrative
/services         Services      — capability index + transparent pricing
/case-studies     Case Studies  — alternating editorial proof stories
/industries       Industries    — market-tuned positioning grid
/about            About         — philosophy, differentiators, leadership
/insights         Insights      — editorial field notes (lead + grid)
/contact          Contact       — strategy-call form + direct channels
*                 404           — branded fallback
```

Architecture is ready for nested service detail routes
(`/services/seo`, `/paid-media/google-ads`, …) and insight detail pages
(`/insights/:slug`) without structural changes.

## 2. Information Architecture

- **Primary nav:** Work · Services · Industries · About · Insights (+ persistent
  "Start a project" CTA).
- **Conversion is always one click away** — every page ends in a CTA, and the
  global footer is a full closing pitch.
- **Depth on demand:** the home page is the narrative spine; deeper pages expand
  capabilities, proof and positioning. No page repeats another's section rhythm.

## 3. Content Strategy

Source content was compressed 40–60% and rewritten in a Linear/Ramp/Vercel
register: short sentences, strong headlines, minimal body, measurable outcomes.

- Removed: buzzwords (innovative, revolutionary, cutting-edge, best-in-class),
  keyword stuffing, repetition.
- Kept + sharpened: real services, real prices, real case-study metrics,
  industries, process, differentiators, leadership.
- All copy lives in a single data layer (`src/data/`) so it can be edited or
  swapped for a CMS without touching components.

## 4. Design System

| Token | Value | Use |
|---|---|---|
| `ink` | `#000000` | Primary text, dark sections |
| `ink-soft` | `#151515` | Secondary text |
| `ink-muted` | `#5a5a5f` | Tertiary / captions |
| `surface` | `#F0F0F0` | Primary surface |
| `surface-2` | `#EDEDED` | Secondary surface |
| `paper` | `#FFFFFF` | Base background |
| `blue` | `#1347FF` | Intentional accent only |
| `line` | `#dcdcdc` | Hairline borders |

- **Type:** Inter Variable. Display `clamp(3rem→7.5rem)`, mega `clamp(3.5rem→12rem)`,
  body 16–20px. Tight tracking (-0.03 to -0.045em), aggressive hierarchy.
- **Restraint:** whitespace dominates; no neon, glassmorphism, glow or gradient spam.
- Tokens defined in `src/index.css` via Tailwind v4 `@theme`.

## 5. Motion System

Every section animates with purpose, never decoration.

- **Split-text reveals** (`SplitText`) — headlines rise out of clip masks.
- **Stagger reveals** (`Reveal`) — content fades/translates in on scroll.
- **Animated counters** (`Counter`) — metrics count up once in view.
- **Image scale-reveal + parallax** (`ParallaxImage`).
- **Pinned storytelling** — Process section pins and scrubs through 4 steps.
- **Horizontal scroll** — Featured Work scrolls sideways on pin (desktop).
- **Marquee**, **magnetic buttons**, **custom cursor**, **mobile menu**.
- **Lenis** smooth scroll synced to the GSAP ticker + ScrollTrigger.
- Full `prefers-reduced-motion` fallbacks throughout.

## 6. Component Architecture

```
components/
  layout/    Layout, Navbar, Footer, PageHeader
  ui/        Container, Button, Magnetic, Marquee, Cursor, SectionHeading
  motion/    SplitText, Reveal, Counter, ParallaxImage
  hero/      Hero, HeroScene, RobotModel, SceneDirector, Particles, cameraPath
sections/home/  Intro, Capabilities, Results, IndustriesSection,
                Process, FeaturedWork, Testimonials, CTA
```

No monolithic components — each section is isolated and reusable.

## 7. Folder Structure

```
src/
  main.jsx · App.jsx · index.css
  data/        site, services, caseStudies, industries, content
  lib/         gsap (register), useSeo
  providers/   SmoothScroll (Lenis)
  components/  layout · ui · motion · hero
  sections/    home/*
  pages/       Home, About, Services, CaseStudies, Industries, Insights, Contact, NotFound
public/models/ moon_man_yo_oc_humanoid.glb
```

## 8. Page Wireframes (section order)

- **Home:** Hero → Intro → Capabilities → Results → Industries → Process →
  Featured Work → Testimonials → CTA → Footer.
- **Services:** Header → capability list → pricing → footer.
- **Case Studies:** Header(+metrics) → alternating story blocks → footer.
- **Industries:** Header → 7-cell grid + custom CTA cell → footer.
- **About:** Header(+metrics) → philosophy(sticky) → image collage →
  differentiators → leadership → footer.
- **Insights:** Header → lead article → 3-up grid → footer.
- **Contact:** Header → form + contact aside → footer.

## 9. Home Page Layout

The home page begins **after** the hero. The hero is a self-contained film; the
site "emerges" from black into the Intro section (dark), then opens into the
light editorial body.

## 10. Three.js Hero Architecture

- `HeroScene` — R3F `Canvas` (ACES tone mapping, exp2 fog, near-black bg).
- `RobotModel` — loads the GLB, plays its walk clip on infinite loop, reports a
  **bounding box** so the camera is framed relative to the model (model is never
  scaled or moved).
- `SceneDirector` — single `useFrame` that damps `camera.position` + `lookAt`
  along the storyboard and ramps exposure, lights, fog and particles.
- `Particles` — atmospheric dust column that fades in across the reveal.
- Floor uses `MeshReflectorMaterial` + `ContactShadows` for grounding/reflections.

**Storyboard (`cameraPath.js`)** — normalized to model height:

| Shot | Progress | Camera |
|---|---|---|
| 01 Arrival | 0.00 | Near ground, feet & lower legs |
| 02 Ascension | 0.24 | Rising past knees/legs |
| 03 Reveal | 0.47 | Torso, shoulders, detail |
| 04 Eye contact | 0.66 | Face fills frame |
| Hold | 0.78 | Pause for tension |
| 05 The dive | 0.93 | Into the face + vignette/chroma |
| 06 Rebirth | 1.00 | To black → site emerges |

## 11. GSAP Animation Architecture

- One pinned `ScrollTrigger` (`+=600%`) drives the hero; `onUpdate` writes a
  progress ref read by R3F, and sets DOM overlay opacities (text, scroll cue,
  vignette, chromatic aberration, rebirth-to-black).
- Section-level triggers use `once: true` reveals; pinned/scrubbed triggers for
  Process and Featured Work, with `gsap.matchMedia` to disable horizontal scroll
  on mobile and `invalidateOnRefresh` for responsive recalculation.
- `Layout` refreshes ScrollTrigger on route change.

## 12. React Project Structure

React 19 + React Router v7. Pages are route components; the data layer is plain
modules. SEO is handled by a `useSeo` hook (title + meta/OG), ready to swap for
SSR metadata.

## 13. Tailwind Design Tokens

Defined in `@theme` (see §4). Custom utilities: `.display`, `.mega`, `.eyebrow`,
`.line-mask`, `.text-balance`. Tailwind v4 via `@tailwindcss/vite`.

## 14. Responsive Strategy

Mobile-first. Fluid type via `clamp()`. Grids collapse to single column;
horizontal-scroll and some pins are disabled below `768px` via `matchMedia`.
`viewport-fit=cover` + safe spacing. Custom cursor only on `pointer: fine`.

## 15. Desktop / Tablet / Mobile Behavior

- **Desktop:** full cinematic hero, pinned + horizontal scroll, magnetic UI, cursor.
- **Tablet:** hero intact; pins simplify; comfortable two-column editorial.
- **Mobile:** single-column stacks, tap-friendly targets, full-screen menu,
  horizontal sections become vertical; reduced-motion respected.

## 16. Placeholder Image Recommendations

Unsplash editorial photography (creative teams, strategy workshops, dashboards,
content/production, product) — no handshakes, call centers or stock smiles.
Swap the URLs in `src/data/*` for licensed brand assets before launch.

## 17. Conversion Strategy

- Persistent "Start a project" CTA + closing CTA on every page.
- Proof everywhere: animated metrics, named case-study outcomes, testimonials.
- Transparent pricing removes friction; the contact form sets honest expectations.
- Trust signals: markets, retention, ROAS, years operating, named leadership.
- Clear next step at each scroll depth — acquire, convert, scale.

---

### Run

```bash
npm install
npm run dev
```

> Note: if the robot faces away from camera on first load, flip `facing` in
> `RobotModel` (currently `Math.PI`) by ±`Math.PI`. Camera framing auto-adapts to
> the model's real dimensions, so no scaling is ever required.
