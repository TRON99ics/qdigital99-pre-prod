import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import HeroScene from './HeroScene'
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
  const singularity = useRef(null)
  const enterWorld = useRef(null)
  const enterCue = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      progressRef.current = 0.66
      gsap.set([cue.current, vignette.current, singularity.current, enterWorld.current, enterCue.current], {
        autoAlpha: 0,
      })
      return
    }

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: trigger.current,
        start: 'top top',
        end: '+=520%',
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
          const diveP = smoothstep(0.78, 0.9, p)
          gsap.set(vignette.current, {
            opacity: smoothstep(0.5, 0.85, p) * (1 - diveP * 0.35) + diveP * 0.85,
          })
          gsap.set(singularity.current, {
            opacity: diveP,
            scale: 0.55 + diveP * 2.85,
          })
          // Text reveals after the void — last ~8% of hero scroll releases to next section
          const enterP = smoothstep(0.91, 0.99, p)
          gsap.set(enterWorld.current, {
            autoAlpha: enterP,
            scale: 0.92 + enterP * 0.08,
            y: (1 - enterP) * 24,
          })
          gsap.set(enterCue.current, { autoAlpha: enterP * smoothstep(0.5, 1, enterP) })
        },
      })
      return () => st.kill()
    }, trigger)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={trigger}
      data-hero
      className="relative h-screen w-full overflow-hidden bg-[#05060a]"
    >
      <div className="absolute inset-0">
        <HeroScene progressRef={progressRef} />
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

      {/* Black hole dive — invitation copy */}
      <div
        ref={enterWorld}
        className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center px-5 opacity-0 sm:px-8"
        style={{ transformOrigin: '50% 48%' }}
      >
        <p className="enter-world-text max-w-[22ch] text-center text-pretty text-white sm:max-w-[28ch]">
          <span className="enter-world-quote" aria-hidden>
            &ldquo;
          </span>
          You are about to enter my world
          <span className="enter-world-quote" aria-hidden>
            &rdquo;
          </span>
        </p>
      </div>

      <div
        ref={enterCue}
        className="pointer-events-none absolute inset-x-0 bottom-8 z-50 flex flex-col items-center gap-2 text-white/45 opacity-0"
      >
        <span className="eyebrow">Continue scrolling</span>
        <span className="h-8 w-px bg-white/35" />
      </div>
    </section>
  )
}
