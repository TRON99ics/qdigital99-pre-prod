# QDigital99

Marketing website for **QDigital99** — a growth partner for ambitious brands. The site presents services, case studies, industries, insights, and contact flows with a cinematic scroll experience, 3D hero, and ambient audio.

**Tagline:** Growth, engineered.

**Positioning:** A growth partner that understands both creativity and performance — connecting acquisition, conversion, and retention into measurable revenue systems.

**Markets:** United States, Australia, India (est. 2019)

---

## What is QDigital99?

QDigital99 helps brands grow through full-funnel digital marketing: SEO, paid media, CRM automation, web/CRO, and performance reporting. This repository is the **public marketing site** — not a client dashboard or CMS.

### Site features

| Area | Description |
|------|-------------|
| **Home** | Pinned 3D hero (Moon Man GLB), metrics, capabilities, horizontal featured work, process, testimonials, CTA |
| **Pages** | About, Services, Case Studies, Industries, Insights, Contact |
| **Motion** | GSAP ScrollTrigger + Lenis smooth scroll; section pins and reveals |
| **Loader** | Route entering screen with odometer (000–099), progress bar, wipe exit |
| **Audio** | Background lofi (`chiled-lofi.mp3`), nav ripple SFX (`ripple.mp3`), navbar toggle |
| **UI** | Chromatic ripple on fast pointer movement (desktop); responsive navbar with mobile menu |
| **Content** | Data-driven copy in `src/data/` (easy to edit without touching layout) |
| **SEO** | Per-route metadata via `useSeo` |

---

## Tech stack

| Layer | Technology |
|-------|------------|
| **Runtime** | React 19 |
| **Build** | Vite 8 |
| **Routing** | React Router 7 (lazy-loaded routes) |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) |
| **Typography** | Inter variable (`@fontsource-variable/inter`) |
| **3D** | Three.js, React Three Fiber, Drei |
| **Animation** | GSAP 3 + ScrollTrigger, Framer Motion |
| **Scroll** | Lenis (synced with ScrollTrigger) |
| **Language** | JavaScript (JSX) — no TypeScript in app code |

### Notable integrations

- **ScrollTrigger scroller proxy** on `<html>` for Lenis-compatible pins and scrub animations
- **Entering loader** waits on fonts, GLB preload, window load, route chunk, and minimum display time
- **Site audio** uses native `<audio>` (no Web Audio API) for reliable mobile playback
- **Images** served from `public/images/` (local assets only)

---

## Project structure

```
qdigital99/
├── public/
│   ├── audio/          # chiled-lofi.mp3, ripple.mp3
│   ├── images/         # Marketing photography (26.jpg–35.jpg)
│   └── models/         # moon_man_yo_oc_humanoid.glb (required for hero)
├── src/
│   ├── components/     # UI, layout, hero (R3F), audio, loading, motion
│   ├── data/           # site, content, case studies, services, images paths
│   ├── lib/            # scroll, GSAP, entering load, SEO, site audio helpers
│   ├── pages/          # Route-level pages
│   ├── providers/      # SmoothScroll (Lenis)
│   ├── sections/home/  # Home page sections
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css       # Design tokens + global styles
├── vite.config.js
└── package.json
```

### 3D model credit

Hero uses **Moon man (yo oc humanoid)** by [3DWorkbench](https://skfb.ly/6ZwMo) — [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Place the `.glb` at:

`public/models/moon_man_yo_oc_humanoid.glb`

---

## Prerequisites

- **Node.js** 20+ recommended (18+ minimum for Vite 8)
- **npm** 9+ (or pnpm/yarn if you adapt commands)

---

## Setup

### 1. Clone and install

```bash
git clone <repository-url>
cd qdigital99
npm install
```

### 2. Add required assets

Ensure these exist before running the hero or loader:

| Path | Purpose |
|------|---------|
| `public/models/moon_man_yo_oc_humanoid.glb` | 3D hero character |
| `public/audio/chiled-lofi.mp3` | Background music |
| `public/audio/ripple.mp3` | Nav transition sound |
| `public/images/*.jpg` | Page and card imagery |

If the GLB is missing, the app still runs but the hero preload step may delay or fail until the file is present.

### 3. Run development server

```bash
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173`).

### 4. Production build

```bash
npm run build
npm run preview   # optional: serve dist locally
```

### 5. Lint

```bash
npm run lint
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## Configuration notes

- **Site copy & nav:** `src/data/site.js`, `src/data/content.js`, `src/data/caseStudies.js`, `src/data/services.js`
- **Image paths:** `src/data/images.js` → `public/images/`
- **Audio mute preference:** stored in `sessionStorage` (`qdigital99-audio-muted`)
- **One-time “tap anywhere” to start music:** `qdigital99-audio-gesture-used` in `sessionStorage`; after that, only the navbar toggle controls playback
- **Reduced motion:** respects `prefers-reduced-motion` (disables Lenis, simplifies loader and several animations)

---

## Deployment

Build static assets with `npm run build` and deploy the `dist/` folder to any static host (Netlify, Vercel, S3 + CDN, etc.). Configure SPA fallback so client routes (`/about`, `/services`, …) resolve to `index.html`.

---

## Contact (site)

- **Email:** team.qdigital99@gmail.com  
- **US:** +1 (774) 535-3918  
- **AU:** +61 405 122 110  

---

## License

Private project. Third-party assets (3D model, fonts) retain their respective licenses — see `src/data/site.js` (`modelCredits`) and package licenses.
