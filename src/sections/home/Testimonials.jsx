import Container from '../../components/ui/Container'
import SectionHeading from '../../components/ui/SectionHeading'
import Reveal from '../../components/motion/Reveal'
import { testimonials } from '../../data/content'

/**
 * SECTION 07 — Testimonials. Minimal, trust-focused.
 */
export default function Testimonials() {
  return (
    <section className="bg-surface py-28 md:py-40">
      <Container>
        <SectionHeading eyebrow="Trusted by operators" title="The work speaks. So do they." />

        <div className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={(i % 2) * 0.1} className="bg-paper p-9 md:p-12" y={24}>
              <p className="text-xl font-medium leading-snug tracking-tight text-ink md:text-2xl">
                “{t.quote}”
              </p>
              <div className="mt-8 flex items-start gap-3">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue lg:mt-2"
                  aria-hidden
                />
                <div className="min-w-0 flex flex-col gap-1 lg:flex-row lg:flex-wrap lg:items-baseline lg:gap-x-2 lg:gap-y-0">
                  <span className="text-sm font-medium leading-snug text-ink-soft">{t.author}</span>
                  <span className="hidden text-sm text-ink-muted lg:inline" aria-hidden>
                    ·
                  </span>
                  <span className="text-sm leading-snug text-ink-muted">{t.company}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
