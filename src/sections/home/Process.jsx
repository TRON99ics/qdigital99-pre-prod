import { useLayoutEffect, useRef, useState } from 'react'
import Container from '../../components/ui/Container'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { process } from '../../data/content'

/**
 * SECTION 05 — Process. Pinned, scroll-driven narrative across four steps.
 */
export default function Process() {
  const wrap = useRef(null)
  const fill = useRef(null)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const el = wrap.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: '+=300%',
        pin: '[data-pin]',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress
          if (fill.current) gsap.set(fill.current, { scaleY: p })
          const idx = Math.min(process.length - 1, Math.floor(p * process.length))
          setActive((prev) => (prev === idx ? prev : idx))
        },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={wrap} className="bg-surface">
      <div data-pin className="flex h-screen items-center">
        <Container>
          <div className="grid gap-12 md:grid-cols-[auto_1fr] md:gap-20">
            <div className="flex items-stretch gap-6">
              <div className="relative w-px bg-line">
                <div
                  ref={fill}
                  className="absolute left-0 top-0 w-px origin-top bg-blue"
                  style={{ height: '100%', transform: 'scaleY(0)' }}
                />
              </div>
              <ul className="flex flex-col justify-between py-2">
                {process.map((s, i) => (
                  <li
                    key={s.step}
                    className={`eyebrow transition-colors duration-300 ${
                      active === i ? 'text-ink' : 'text-ink-muted/50'
                    }`}
                  >
                    {s.step} {s.title}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="eyebrow mb-6 text-blue">Process — {process[active].step}</div>
              <div className="relative min-h-[34vh]">
                {process.map((s, i) => (
                  <div
                    key={s.step}
                    className={`absolute inset-0 transition-all duration-500 ${
                      active === i ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
                    }`}
                  >
                    <h3 className="display text-ink">{s.title}</h3>
                    <p className="mt-8 max-w-[40ch] text-xl leading-relaxed text-ink-muted md:text-2xl">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
