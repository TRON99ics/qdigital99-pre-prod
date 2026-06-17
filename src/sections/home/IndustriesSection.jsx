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
              className="group grid grid-cols-[2.25rem_1fr] items-start gap-x-4 gap-y-3 border-b border-line py-7 md:grid-cols-[2.5rem_minmax(11rem,24vw)_minmax(0,1fr)_1.25rem] md:items-start md:gap-x-8 md:py-9 lg:grid-cols-[2.75rem_minmax(13rem,22vw)_minmax(0,1fr)_1.5rem] lg:gap-x-12"
            >
              <span className="pt-1.5 text-xs tabular-nums text-ink-muted md:pt-2.5">
                0{i + 1}
              </span>

              <h3 className="col-start-2 text-balance text-3xl font-medium leading-tight tracking-tight text-ink transition-transform duration-500 md:col-start-2 md:text-4xl md:group-hover:translate-x-2 lg:text-5xl">
                {ind.name}
              </h3>

              <p
                className={`col-span-2 pl-[calc(2.25rem+1rem)] text-base leading-relaxed text-ink-muted transition-opacity duration-500 md:col-span-1 md:col-start-3 md:row-start-1 md:max-w-[44ch] md:pl-0 md:pt-2.5 md:text-lg ${
                  hover === i ? 'opacity-100' : 'md:opacity-40'
                }`}
              >
                {ind.line}{' '}
                <span className="text-ink-soft">{ind.note}</span>
              </p>

              <span
                className="col-start-2 hidden justify-self-end pt-1.5 text-sm text-ink-muted transition-transform duration-500 group-hover:translate-x-1 md:col-start-4 md:row-start-1 md:flex md:pt-3"
                aria-hidden
              >
                →
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
