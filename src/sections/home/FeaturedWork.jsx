import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/ui/Container'
import SectionHeading from '../../components/ui/SectionHeading'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { getSiteHeaderPx } from '../../lib/layout'
import { caseStudies } from '../../data/caseStudies'

/**
 * SECTION 06 — Featured work. Horizontal GSAP scroll of large editorial cards.
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
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      if (reduced) return
      const distance = row.scrollWidth - window.innerWidth
      if (distance <= 0) return
      gsap.to(row, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: () => `top top+=${getSiteHeaderPx()}`,
          end: () => `+=${distance + window.innerHeight * 0.5}`,
          pin: pinEl,
          pinType: 'transform',
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={wrap} className="relative isolate z-10 overflow-hidden bg-paper py-20 md:py-0">
      <div
        ref={pin}
        className="md:grid md:h-[calc(100svh-var(--site-header))] md:grid-rows-[auto_minmax(0,1fr)] md:gap-6 md:overflow-hidden md:bg-paper md:pb-8 md:pt-5"
      >
        <div className="w-full min-w-0 shrink-0">
          <Container>
            <SectionHeading eyebrow="Featured work" title="Proof, not promises." />
          </Container>
        </div>

        {/* Cards live in a fixed-height stage — no bleed into the next section */}
        <div className="featured-work-stage min-h-0 overflow-hidden bg-paper md:px-10 lg:px-14">
          <div
            ref={track}
            className="flex h-full w-max flex-col gap-8 md:flex-row md:items-stretch md:gap-10"
          >
            {caseStudies.map((cs) => (
              <Link
                key={cs.id}
                to="/case-studies"
                className="group relative flex w-full shrink-0 flex-col overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface md:h-full md:max-h-full md:w-[min(60vw,42rem)] lg:w-[min(44vw,36rem)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-0 md:flex-1">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-paper/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur">
                    {cs.industry}
                  </span>
                </div>
                <div className="flex shrink-0 flex-col p-7 md:p-8">
                  <h3 className="text-2xl font-medium tracking-tight text-ink md:text-3xl">
                    {cs.title}
                  </h3>
                  <div className="mt-auto flex flex-wrap gap-6 pt-6 md:gap-8 md:pt-8">
                    {cs.results.map((r) => (
                      <div key={r.label}>
                        <div className="text-3xl font-semibold tracking-tight text-blue">
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
