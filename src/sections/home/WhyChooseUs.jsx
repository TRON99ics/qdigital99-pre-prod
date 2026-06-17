import { useLayoutEffect, useRef, useState } from 'react'
import Container from '../../components/ui/Container'
import SectionHeading from '../../components/ui/SectionHeading'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { getSiteHeaderPx } from '../../lib/layout'
import { isAndroidDevice } from '../../lib/scroll'
import { whyChooseUs } from '../../data/content'

const { reasons } = whyChooseUs
const stepLabel = (i) => String(i + 1).padStart(2, '0')

function StackedReasons({ className = '' }) {
  return (
    <div className={className}>
      <SectionHeading
        eyebrow={whyChooseUs.eyebrow}
        title={whyChooseUs.title}
        intro={whyChooseUs.intro}
      />
      <div className="mt-14">
        {reasons.map((reason, i) => (
          <article
            key={reason.title}
            className={i > 0 ? 'mt-14 border-t border-line pt-14' : undefined}
          >
            <div className="eyebrow text-ink-muted">
              {stepLabel(i)} — {reason.title}
            </div>
            <h3 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl">
              {reason.title}
            </h3>
            <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-ink-muted md:text-xl">
              {reason.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}

/**
 * SECTION 05 — Why choose us. Pinned scroll narrative (desktop); stacked steps (mobile).
 */
export default function WhyChooseUs() {
  const wrap = useRef(null)
  const fill = useRef(null)
  const rail = useRef(null)
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
    const el = wrap.current
    if (!el || useStacked) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: el,
          start: () => `top top+=${getSiteHeaderPx()}`,
          end: `+=${Math.round((reasons.length / 4) * 300)}%`,
          pin: '[data-pin]',
          pinType: 'transform',
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress
            if (fill.current) gsap.set(fill.current, { scaleY: p })
            const idx = Math.min(reasons.length - 1, Math.floor(p * reasons.length))
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
        className="hidden min-h-0 md:grid md:h-[calc(100svh-var(--site-header))] md:grid-rows-1 md:overflow-hidden"
      >
        <Container className="flex min-h-0 items-center py-6 lg:py-10">
          <div className="grid w-full min-h-0 max-h-[calc(100svh-var(--site-header)-3rem)] grid-cols-[minmax(0,12rem)_minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
            <div className="why-choose-rail-column flex max-h-[min(32rem,calc(100svh-var(--site-header)-7rem))] shrink-0 items-stretch gap-4 self-center lg:gap-6">
              <div className="why-choose-track relative w-px shrink-0 bg-line">
                <div
                  ref={fill}
                  className="absolute inset-0 w-px origin-top bg-blue will-change-transform"
                  style={{ transform: 'scaleY(0)' }}
                />
              </div>
              <ul
                ref={rail}
                className="why-choose-rail flex min-h-0 flex-1 flex-col justify-between gap-2 overflow-y-auto overscroll-contain py-0.5"
              >
                {reasons.map((reason, i) => (
                  <li
                    key={reason.title}
                    className={`text-sm leading-snug transition-colors duration-300 lg:text-base ${
                      active === i ? 'text-ink' : 'text-ink-muted/45'
                    }`}
                  >
                    <span className="tabular-nums">{stepLabel(i)}</span>{' '}
                    <span className={active === i ? 'font-medium' : undefined}>{reason.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex min-h-0 min-w-0 flex-col overflow-y-auto overscroll-contain pr-1">
              <div className="eyebrow mb-2 shrink-0 text-blue lg:mb-4">
                {whyChooseUs.eyebrow} — {stepLabel(active)}
              </div>
              <p className="why-choose-intro mb-2 max-w-[52ch] shrink-0 text-lg leading-relaxed text-ink-muted lg:text-xl">
                {whyChooseUs.intro}
              </p>
              <div key={active} className="why-choose-panel min-h-0">
                <h3 className="display max-w-[18ch] text-balance text-ink">{activeReason.title}</h3>
                <p className="mt-8 max-w-[42ch] text-xl leading-relaxed text-ink-muted md:mt-10 md:text-2xl">
                  {activeReason.body}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
