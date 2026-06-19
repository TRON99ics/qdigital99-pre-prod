import { useLayoutEffect, useRef, useState } from 'react'
import Container from '../../components/ui/Container'
import SectionHeading from '../../components/ui/SectionHeading'
import Reveal from '../../components/motion/Reveal'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { getSiteHeaderPx } from '../../lib/layout'
import { isAndroidDevice } from '../../lib/scroll'
import { whyChooseUs } from '../../data/content'

const { reasons } = whyChooseUs
const stepLabel = (i) => String(i + 1).padStart(2, '0')
const STEP_COUNT = reasons.length

function StackedReasons() {
  return (
    <>
      <SectionHeading
        eyebrow={whyChooseUs.eyebrow}
        title={whyChooseUs.title}
        intro={whyChooseUs.intro}
      />
      <div className="mt-12 space-y-5 sm:mt-14">
        {reasons.map((reason, i) => (
          <Reveal key={reason.title} delay={(i % 2) * 0.06}>
            <article className="relative overflow-hidden rounded-[var(--radius-xl)] border border-line bg-paper p-7 sm:p-9">
              <span
                className="pointer-events-none absolute right-5 top-4 text-5xl font-semibold tabular-nums text-blue/[0.08] sm:right-7 sm:top-5 sm:text-6xl"
                aria-hidden
              >
                {stepLabel(i)}
              </span>
              <div className="eyebrow text-blue">
                {stepLabel(i)} / {stepLabel(STEP_COUNT - 1)}
              </div>
              <h3 className="mt-4 max-w-[28ch] text-balance text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                {reason.title}
              </h3>
              <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-ink-muted sm:mt-5 sm:text-lg">
                {reason.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </>
  )
}

function WhyChoosePanel({ reason, index, segments }) {
  const title = useRef(null)
  const body = useRef(null)
  const ghost = useRef(null)

  useLayoutEffect(() => {
    const t = title.current
    const b = body.current
    const g = ghost.current
    if (!t || !b || !g) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      gsap.set([t, b, g], { opacity: 1, y: 0, scale: 1 })
      return
    }

    const tl = gsap.timeline({ defaults: { ease: 'expo.out', overwrite: 'auto' } })
    tl.fromTo(g, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.5 })
      .fromTo(t, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, '-=0.35')
      .fromTo(b, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.32')

    return () => tl.kill()
  }, [index])

  return (
    <div className="why-choose-card relative flex w-full flex-col rounded-[var(--radius-xl)] border border-line bg-paper p-7 lg:p-9">
      <span
        ref={ghost}
        className="pointer-events-none absolute -right-1 top-0 text-[clamp(4rem,10vw,7rem)] font-semibold leading-none tabular-nums text-blue/[0.07]"
        aria-hidden
      >
        {stepLabel(index)}
      </span>

      <div className="relative z-10 flex shrink-0 items-center justify-between gap-4">
        <div className="eyebrow text-blue">
          {whyChooseUs.eyebrow} — {stepLabel(index)}
        </div>
        <span className="text-xs tabular-nums text-ink-muted">
          {stepLabel(index)} / {stepLabel(STEP_COUNT - 1)}
        </span>
      </div>

      <div className="relative z-10 mt-5 lg:mt-6">
        <h3
          ref={title}
          className="max-w-[16ch] text-balance text-[clamp(1.75rem,3.8vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-ink"
        >
          {reason.title}
        </h3>
        <p
          ref={body}
          className="mt-5 max-w-[44ch] text-base leading-relaxed text-ink-muted lg:mt-6 lg:text-lg"
        >
          {reason.body}
        </p>
      </div>

      <div className="relative z-10 mt-6 flex shrink-0 gap-1 lg:mt-8">
        {reasons.map((_, i) => (
          <span key={stepLabel(i)} className="h-1 flex-1 overflow-hidden rounded-full bg-line">
            <span
              ref={(node) => {
                segments.current[i] = node
              }}
              className="block h-full w-full origin-left scale-x-0 rounded-full bg-blue will-change-transform"
            />
          </span>
        ))}
      </div>
    </div>
  )
}

/**
 * SECTION 05 — Why choose us. Pinned scroll narrative (desktop); card stack (mobile).
 */
export default function WhyChooseUs() {
  const wrap = useRef(null)
  const fill = useRef(null)
  const rail = useRef(null)
  const track = useRef(null)
  const segments = useRef([])
  const [active, setActive] = useState(0)
  const [useStacked, setUseStacked] = useState(false)

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarseNarrow =
      window.matchMedia('(pointer: coarse)').matches &&
      window.matchMedia('(max-width: 1023px)').matches
    setUseStacked(reducedMotion || isAndroidDevice() || coarseNarrow)
  }, [])

  useLayoutEffect(() => {
    if (useStacked) return

    const list = rail.current
    const trackEl = track.current
    if (!list || !trackEl) return

    const syncTrack = () => {
      trackEl.style.height = `${list.offsetHeight}px`
    }

    syncTrack()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncTrack) : null
    ro?.observe(list)
    window.addEventListener('resize', syncTrack)

    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', syncTrack)
    }
  }, [useStacked, active])

  useLayoutEffect(() => {
    const el = wrap.current
    if (!el || useStacked) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: el,
          start: () => `top top+=${getSiteHeaderPx()}`,
          end: `+=${Math.round((STEP_COUNT / 4) * 300)}%`,
          pin: '[data-pin]',
          pinType: 'transform',
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress
            const frac = p * STEP_COUNT
            const idx = Math.min(STEP_COUNT - 1, Math.floor(frac))
            const stepP = Math.min(1, Math.max(0, frac - idx))

            if (fill.current) gsap.set(fill.current, { scaleY: p })

            segments.current.forEach((seg, i) => {
              if (!seg) return
              const scale = i < idx ? 1 : i === idx ? stepP : 0
              gsap.set(seg, { scaleX: scale })
            })

            setActive((prev) => (prev === idx ? prev : idx))
          },
        })
      }, el)
      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [useStacked])

  if (useStacked) {
    return (
      <section className="bg-surface py-20 md:py-28">
        <Container>
          <StackedReasons />
        </Container>
      </section>
    )
  }

  const activeReason = reasons[active]

  return (
    <section ref={wrap} className="bg-surface">
      <div className="py-20 md:hidden">
        <Container>
          <StackedReasons />
        </Container>
      </div>

      <div
        data-pin
        className="why-choose-pin hidden md:grid md:h-[calc(100svh-var(--site-header))] md:grid-rows-1"
      >
        <Container className="why-choose-pin-inner flex h-full min-h-0 flex-col py-6 lg:py-8">
          <div className="grid min-h-0 flex-1 grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12 xl:gap-14">
            <div className="flex min-h-0 flex-col lg:pr-2">
              <header className="shrink-0">
                <div className="eyebrow text-blue">{whyChooseUs.eyebrow}</div>
                <h2 className="mt-3 max-w-[20ch] text-balance text-2xl font-semibold tracking-tight text-ink lg:mt-4 lg:text-3xl xl:text-4xl">
                  {whyChooseUs.title}
                </h2>
                <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-ink-muted lg:mt-4 lg:text-base">
                  {whyChooseUs.intro}
                </p>
              </header>

              <div className="why-choose-rail-column mt-6 flex min-h-0 flex-1 items-stretch gap-3 lg:mt-8 lg:gap-4">
                <div ref={track} className="why-choose-track relative w-px shrink-0 bg-line">
                  <div
                    ref={fill}
                    className="absolute left-0 top-0 h-full w-px origin-top bg-blue will-change-transform"
                    style={{ transform: 'scaleY(0)' }}
                  />
                </div>
                <ul
                  ref={rail}
                  className="why-choose-rail flex min-h-0 w-full flex-1 flex-col justify-between gap-0.5 py-px"
                >
                  {reasons.map((reason, i) => (
                    <li
                      key={reason.title}
                      className={`rounded-md px-2 py-1 text-xs leading-tight transition-[background-color,color,transform] duration-300 lg:py-1.5 lg:text-sm ${
                        active === i
                          ? 'translate-x-1.5 bg-ink font-medium text-white'
                          : 'text-ink-muted'
                      }`}
                    >
                      <span className="tabular-nums">{stepLabel(i)}</span>
                      <span className="mt-0.5 block truncate">{reason.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex min-h-0 min-w-0 items-center justify-center lg:justify-end">
              <WhyChoosePanel reason={activeReason} index={active} segments={segments} />
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
