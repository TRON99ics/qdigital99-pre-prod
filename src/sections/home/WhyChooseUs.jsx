import Container from '../../components/ui/Container'
import SectionHeading from '../../components/ui/SectionHeading'
import Reveal from '../../components/motion/Reveal'
import { whyChooseUs } from '../../data/content'

/**
 * SECTION 05 — Why choose us. Trust signals in a responsive card grid.
 */
export default function WhyChooseUs() {
  return (
    <section className="bg-surface py-20 sm:py-28 md:py-40">
      <Container>
        <SectionHeading
          eyebrow={whyChooseUs.eyebrow}
          title={whyChooseUs.title}
          intro={whyChooseUs.intro}
        />
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line sm:mt-16 sm:grid-cols-2">
          {whyChooseUs.reasons.map((reason, i) => (
            <Reveal
              key={reason.title}
              delay={(i % 2) * 0.08}
              className="group relative flex min-h-[200px] flex-col bg-paper p-7 transition-colors duration-500 hover:bg-ink hover:text-white sm:min-h-[220px] sm:p-9 md:p-12"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm tabular-nums text-blue transition-colors duration-300 group-hover:text-blue-soft">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="h-px flex-1 bg-line transition-colors duration-300 group-hover:bg-white/20"
                  aria-hidden
                />
                <span
                  className="text-sm opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-2"
                  aria-hidden
                >
                  →
                </span>
              </div>
              <h3 className="mt-5 text-xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-1 sm:mt-6 sm:text-2xl md:text-3xl">
                {reason.title}
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-ink-muted transition-colors duration-300 group-hover:text-white/75 sm:mt-4 sm:max-w-[40ch]">
                {reason.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
