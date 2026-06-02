import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import HeroScene from './HeroScene'
import HeroAqua from './HeroAqua'
import { site } from '../../data/site'

const smoothstep = (e0, e1, x) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

export default function Hero() {
  const trigger = useRef(null)
  const progressRef = useRef(0)
  const heroText = useRef(null)
  const cue = useRef(null)
  const vignette = useRef(null)
  const chroma = useRef(null)
  const singularity = useRef(null)
  const aqua = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      progressRef.current = 0.66
      gsap.set([cue.current, vignette.current, chroma.current, singularity.current, aqua.current], {
        autoAlpha: 0,
      })
      return
    }

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: trigger.current,
        start: 'top top',
        end: '+=600%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress
          progressRef.current = p
          gsap.set(heroText.current, {
            autoAlpha: 1 - smoothstep(0.02, 0.12, p),
            yPercent: -p * 40,
          })
          gsap.set(cue.current, { autoAlpha: 1 - smoothstep(0.02, 0.1, p) })
          const diveP = smoothstep(0.82, 1, p)
          gsap.set(vignette.current, {
            opacity: smoothstep(0.5, 0.85, p) * (1 - diveP * 0.35) + diveP * 0.85,
          })
          gsap.set(chroma.current, { opacity: smoothstep(0.78, 0.92, p) * (1 - diveP * 0.5) })
          gsap.set(singularity.current, {
            opacity: diveP,
            scale: 0.55 + diveP * 2.85,
          })
          gsap.set(aqua.current, {
            opacity: (1 - diveP * 0.95) * (0.35 + smoothstep(0.08, 0.45, p) * 0.65),
          })
        },
      })
      return () => st.kill()
    }, trigger)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={trigger} className="relative h-screen w-full overflow-hidden bg-[#05060a]">
      <div className="absolute inset-0">
        <HeroScene progressRef={progressRef} />
      </div>

      <div ref={aqua} className="opacity-0">
        <HeroAqua />
      </div>

      {/* SHOT 01 — arrival copy */}
      <div
        ref={heroText}
        className="pointer-events-none absolute inset-x-0 bottom-[12vh] z-20 flex flex-col items-center px-6 text-center text-white"
      >
        <div className="eyebrow mb-5 text-white/50">{site.name} — Acquire · Convert · Scale</div>
        <h1 className="mega max-w-[16ch] text-balance text-white">Growth, engineered.</h1>
        <p className="mt-6 max-w-[42ch] text-base text-white/60 md:text-lg">
          A growth partner that understands both creativity and performance.
        </p>
      </div>

      {/* Scroll cue */}
      <div
        ref={cue}
        className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="eyebrow">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-white/40" />
      </div>

      {/* Cinematic vignette (dive) */}
      <div
        ref={vignette}
        className="pointer-events-none absolute inset-0 z-30 opacity-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 78%, rgba(0,0,0,0.95) 100%)',
        }}
      />

      {/* Chromatic aberration approximation */}
      <div
        ref={chroma}
        className="pointer-events-none absolute inset-0 z-30 opacity-0 mix-blend-screen"
        style={{
          background:
            'radial-gradient(circle at 47% 48%, rgba(255,0,80,0.16), transparent 42%), radial-gradient(circle at 53% 52%, rgba(0,160,255,0.16), transparent 42%)',
        }}
      />

      {/* SHOT 06 — black hole dive: collapsing singularity */}
      <div
        ref={singularity}
        className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center opacity-0"
        style={{ transformOrigin: '50% 48%' }}
      >
        <div
          className="hero-singularity h-[min(200vmax,2800px)] w-[min(200vmax,2800px)] rounded-full"
          aria-hidden
        />
      </div>
    </section>
  )
}
