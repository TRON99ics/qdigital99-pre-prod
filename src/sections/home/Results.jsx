import Container from '../../components/ui/Container'
import SectionHeading from '../../components/ui/SectionHeading'
import Counter from '../../components/motion/Counter'
import Reveal from '../../components/motion/Reveal'
import { metrics } from '../../data/content'

/**
 * SECTION 03 — Selected results. Large animated metrics.
 */
export default function Results() {
  return (
    <section className="bg-ink py-28 text-white md:py-40">
      <Container>
        <SectionHeading
          eyebrow="Selected results"
          title="The only metric that matters is revenue."
          intro="Vanity numbers don't pay the bills. We optimize for outcomes you can see in the bank."
          className="[&_h2]:text-white [&_p]:text-white/55"
        />

        <div className="mt-20 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i * 0.08}
              y={30}
              className="min-w-0 bg-ink px-5 py-12 sm:px-6 md:py-14"
            >
              <div className="stat-value whitespace-nowrap">
                <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} />
              </div>
              <div className="mt-5 text-sm leading-snug text-white/50">{m.label}</div>
            </Reveal>
          ))}
        </div>

        <p className="mt-12 max-w-[44ch] leading-relaxed text-white/40">
          Averages across active engagements. Every program launches with defined
          benchmarks and transparent reporting.
        </p>
      </Container>
    </section>
  )
}
