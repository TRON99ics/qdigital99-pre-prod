import { useState } from 'react'
import Container from '../../components/ui/Container'
import SectionHeading from '../../components/ui/SectionHeading'
import { industries } from '../../data/industries'

/**
 * SECTION 04 — Industries. Editorial index list with hover state.
 */
export default function IndustriesSection() {
  const [hover, setHover] = useState(null)

  return (
    <section className="bg-paper py-28 md:py-40">
      <Container>
        <SectionHeading
          eyebrow="Industries"
          title="Strategies tuned to how your market actually buys."
          align="left"
        />

        <div className="mt-16 border-t border-line">
          {industries.map((ind, i) => (
            <div
              key={ind.id}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="group grid items-baseline gap-2 border-b border-line py-7 transition-colors md:grid-cols-[auto_1fr_auto] md:gap-10 md:py-9"
            >
              <div className="flex items-baseline gap-5">
                <span className="text-xs tabular-nums text-ink-muted">0{i + 1}</span>
                <h3 className="text-3xl font-medium tracking-tight text-ink transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                  {ind.name}
                </h3>
              </div>
              <p
                className={`max-w-[44ch] text-ink-muted transition-all duration-500 md:justify-self-start ${
                  hover === i ? 'opacity-100' : 'md:opacity-40'
                }`}
              >
                {ind.line} <span className="text-ink-soft">{ind.note}</span>
              </p>
              <span className="hidden text-sm text-ink-muted transition-transform duration-500 group-hover:translate-x-1 md:block">
                →
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
