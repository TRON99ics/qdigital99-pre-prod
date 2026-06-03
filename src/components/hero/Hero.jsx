import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { isAndroidDevice, refreshScroll } from '../../lib/scroll'
import HeroScene from './HeroScene'
import { site } from '../../data/site'

const smoothstep = (e0, e1, x) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

/** Same storyboard as ScrollTrigger pin — used for Android native sticky scroll. */
function applyHeroProgress(p, refs) {
  refs.progressRef.current = p
  gsap.set(refs.heroText.current, {
    autoAlpha: 1 - smoothstep(0.02, 0.12, p),
    yPercent: -p * 40,
  })
  gsap.set(refs.cue.current, { autoAlpha: 1 - smoothstep(0.02, 0.1, p) })
  const diveP = smoothstep(0.78, 0.9, p)
  gsap.set(refs.vignette.current, {
    opacity: smoothstep(0.5, 0.85, p) * (1 - diveP * 0.35) + diveP * 0.85,
  })
  gsap.set(refs.singularity.current, {
    opacity: diveP,
    scale: 0.55 + diveP * 2.85,
  })
  const enterP = smoothstep(0.91, 0.99, p)
  gsap.set(refs.enterWorld.current, {
    autoAlpha: enterP,
    scale: 0.92 + enterP * 0.08,
    y: (1 - enterP) * 24,
  })
  gsap.set(refs.enterCue.current, { autoAlpha: enterP * smoothstep(0.5, 1, enterP) })
}

function bindHeroScroll(trigger, refs, end) {
  return ScrollTrigger.create({
    trigger: trigger.current,
    start: 'top top',
    end,
    pin: true,
    pinType: 'transform',
    scrub: 1,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => applyHeroProgress(self.progress, refs),
  })
}

/** Android: sticky viewport + scroll runway (no GSAP pin — avoids stuck touch scroll). */
function bindAndroidHeroScroll(trigger, refs) {
  const read = () => {
    const root = trigger.current
    if (!root) return
    const scrollable = root.offsetHeight - window.innerHeight
    const p =
      scrollable > 1
        ? Math.min(1, Math.max(0, -root.getBoundingClientRect().top / scrollable))
        : 0
    applyHeroProgress(p, refs)
  }

  read()
  window.addEventListener('scroll', read, { passive: true })
  window.addEventListener('resize', read)
  const t1 = setTimeout(read, 100)
  const t2 = setTimeout(() => {
    read()
    refreshScroll()
  }, 400)

  return () => {
    clearTimeout(t1)
    clearTimeout(t2)
    window.removeEventListener('scroll', read)
    window.removeEventListener('resize', read)
  }
}

export default function Hero() {
  const android = isAndroidDevice()
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

    const refs = { progressRef, heroText, cue, vignette, singularity, enterWorld, enterCue }

    if (android) {
      return bindAndroidHeroScroll(trigger, refs)
    }

    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add('(min-width: 768px)', () => {
        const st = bindHeroScroll(trigger, refs, '+=520%')
        return () => st.kill()
      })
      mm.add('(max-width: 767px)', () => {
        const st = bindHeroScroll(trigger, refs, '+=160%')
        return () => st.kill()
      })
    }, trigger)

    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [android])

  const stageClass = android
    ? 'sticky top-0 z-10 h-[100svh] min-h-[100svh] w-full overflow-hidden'
    : 'relative h-[100svh] min-h-[100svh] w-full overflow-hidden'

  return (
    <section ref={trigger} data-hero className="relative w-full bg-[#05060a]">
      <div className={stageClass}>
        <div className="absolute inset-0">
          <HeroScene progressRef={progressRef} />
        </div>

        <div
          ref={heroText}
          className="pointer-events-none absolute inset-x-0 bottom-[max(16vh,5.5rem)] z-20 flex flex-col items-center px-6 text-center text-white sm:bottom-[14vh] md:bottom-[12vh]"
        >
          <div className="eyebrow mb-5 text-white/50">{site.name} — Acquire · Convert · Scale</div>
          <h1 className="mega max-w-[16ch] text-balance text-white">Growth, engineered.</h1>
          <p className="mt-6 max-w-[42ch] text-base text-white/60 md:text-lg">
            A growth partner that understands both creativity and performance.
          </p>
        </div>

        <div
          ref={cue}
          className="hero-scroll-cue pointer-events-none absolute inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))] z-20 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="eyebrow">Scroll</span>
          <span className="h-10 w-px animate-pulse bg-white/40" />
        </div>

        <div
          ref={vignette}
          className="pointer-events-none absolute inset-0 z-30 opacity-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 78%, rgba(0,0,0,0.95) 100%)',
          }}
        />

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
          className="pointer-events-none absolute inset-x-0 bottom-[max(2rem,env(safe-area-inset-bottom,0px))] z-50 flex flex-col items-center gap-2 text-white/45 opacity-0"
        >
          <span className="eyebrow">Continue scrolling</span>
          <span className="h-8 w-px bg-white/35" />
        </div>
      </div>

      {android && (
        <div className="h-[160dvh] shrink-0 pointer-events-none" aria-hidden data-hero-runway />
      )}
    </section>
  )
}
