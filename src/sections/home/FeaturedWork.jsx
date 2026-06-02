import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/ui/Container'
import SectionHeading from '../../components/ui/SectionHeading'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { getSiteHeaderPx } from '../../lib/layout'
import { refreshScroll } from '../../lib/scroll'
import { caseStudies } from '../../data/caseStudies'

function bindImageRefresh(row) {
  row.querySelectorAll('img').forEach((img) => {
    if (img.complete) return
    img.addEventListener(
      'load',
      () => {
        ScrollTrigger.refresh()
        refreshScroll()
      },
      { once: true },
    )
  })
}

/**
 * SECTION 06 — Featured work. Vertical scroll drives horizontal card travel (all breakpoints).
 */
export default function FeaturedWork() {
  const wrap = useRef(null)
  const pin = useRef(null)
  const track = useRef(null)

  useLayoutEffect(() => {
    const el = wrap.current
    const pinEl = pin.current
    const row = track.current
    if (!el || !pinEl || !row) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      const scrollDistance = () => Math.max(0, row.scrollWidth - window.innerWidth)
      const endPadding = () => (window.innerWidth < 768 ? 0.32 : 0.45)

      gsap.to(row, {
        x: () => -scrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: () => `top top+=${getSiteHeaderPx()}`,
          end: () => `+=${scrollDistance() + window.innerHeight * endPadding()}`,
          pin: pinEl,
          pinType: 'transform',
          scrub: 0.85,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      bindImageRefresh(row)
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={wrap} className="relative isolate z-10 overflow-hidden bg-paper">
      <div
        ref={pin}
        className="grid h-[calc(100svh-var(--site-header))] grid-rows-[auto_minmax(0,1fr)] gap-4 overflow-hidden bg-paper pb-5 pt-4 md:gap-6 md:pb-8 md:pt-5"
      >
        <div className="w-full min-w-0 shrink-0">
          <Container>
            <SectionHeading eyebrow="Featured work" title="Proof, not promises." />
          </Container>
        </div>

        <div className="featured-work-stage min-h-0 overflow-hidden bg-paper md:px-10 lg:px-14">
          <div
            ref={track}
            className="flex h-full w-max flex-row items-stretch gap-5 pl-6 md:gap-10 md:pl-0"
          >
            {caseStudies.map((cs) => (
              <Link
                key={cs.id}
                to="/case-studies"
                className="group relative flex h-full max-h-full w-[min(88vw,22rem)] shrink-0 flex-col overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface md:w-[min(60vw,42rem)] lg:w-[min(44vw,36rem)]"
              >
                <div className="relative min-h-0 flex-1 overflow-hidden">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    loading="lazy"
                    className="h-full min-h-[9rem] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 md:min-h-0"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur md:left-5 md:top-5">
                    {cs.industry}
                  </span>
                </div>
                <div className="flex shrink-0 flex-col p-5 md:p-8">
                  <h3 className="text-xl font-medium tracking-tight text-ink md:text-3xl">{cs.title}</h3>
                  <div className="mt-auto flex flex-wrap gap-4 pt-4 md:gap-8 md:pt-8">
                    {cs.results.map((r) => (
                      <div key={r.label}>
                        <div className="text-2xl font-semibold tracking-tight text-blue md:text-3xl">
                          {r.value}
                          {r.suffix}
                        </div>
                        <div className="mt-1 max-w-[14ch] text-xs text-ink-muted">{r.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
