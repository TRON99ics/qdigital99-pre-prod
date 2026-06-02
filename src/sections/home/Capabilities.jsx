import { useState } from 'react'
import Container from '../../components/ui/Container'
import SectionHeading from '../../components/ui/SectionHeading'
import { capabilities } from '../../data/services'

/**
 * SECTION 02 — Capabilities. Interactive list with a hover-revealed detail panel.
 */
export default function Capabilities() {
  const [active, setActive] = useState(0)

  return (
    <section className="bg-paper py-28 md:py-40">
      <Container>
        <SectionHeading
          eyebrow="Capabilities"
          title="One partner. The full growth stack."
          intro="Every service runs on a single framework — acquire high-intent demand, convert with precision, and scale with automation."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line md:grid-cols-[1.2fr_1fr]">
          <ul className="bg-paper">
            {capabilities.map((c, i) => (
              <li
                key={c.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group flex cursor-pointer items-center gap-5 border-b border-line px-6 py-5 transition-colors last:border-0 md:px-9 md:py-6 ${
                  active === i ? 'bg-ink text-white' : 'hover:bg-surface'
                }`}
              >
                <span className={`text-xs tabular-nums ${active === i ? 'text-blue-soft' : 'text-ink-muted'}`}>
                  {c.index}
                </span>
                <span className="text-2xl font-medium tracking-tight md:text-3xl">{c.title}</span>
                <span
                  className={`ml-auto text-sm transition-transform duration-300 ${
                    active === i ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                  }`}
                >
                  →
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col justify-between bg-surface p-9 md:p-12">
            <div>
              <div className="eyebrow text-blue">{capabilities[active].price}</div>
              <p className="mt-6 text-2xl font-medium leading-snug tracking-tight text-ink md:text-3xl">
                {capabilities[active].summary}
              </p>
              <p className="mt-5 max-w-[40ch] leading-relaxed text-ink-muted">
                {capabilities[active].detail}
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {capabilities[active].points.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-line bg-paper px-4 py-1.5 text-sm text-ink-soft"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
