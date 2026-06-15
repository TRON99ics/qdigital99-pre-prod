import PageHeader from '../components/layout/PageHeader'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/motion/Reveal'
import Button from '../components/ui/Button'
import { useSeo } from '../lib/useSeo'
import { industries, industryExpertise } from '../data/industries'

export default function Industries() {
  useSeo({
    title: 'Industries',
    description:
      'Growth systems tuned to how each market buys — technology, healthcare, education, real estate, e-commerce, D2C and professional services.',
    path: '/industries',
  })

  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="We speak your market's language."
        intro="Sales cycles, buyer behavior and competition differ by industry. Our strategies are built for yours."
      />

      <section className="bg-paper py-24 md:py-32">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal
                key={ind.id}
                delay={(i % 3) * 0.06}
                className="group relative flex min-h-[300px] flex-col justify-between bg-paper p-9 transition-colors hover:bg-ink hover:text-white md:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm tabular-nums text-ink-muted group-hover:text-white/40">
                    0{i + 1}
                  </span>
                  <span className="text-sm opacity-0 transition-opacity group-hover:opacity-100">→</span>
                </div>
                <div>
                  <h2 className="text-3xl font-medium tracking-tight md:text-4xl">{ind.name}</h2>
                  <p className="mt-4 text-lg text-ink-soft group-hover:text-white/80">{ind.line}</p>
                  <p className="mt-3 max-w-[34ch] text-sm text-ink-muted group-hover:text-white/50">
                    {ind.note}
                  </p>
                </div>
              </Reveal>
            ))}
            <div className="flex min-h-[300px] flex-col justify-center gap-6 bg-blue p-9 text-white md:p-10">
              <h2 className="text-3xl font-medium tracking-tight">Not listed?</h2>
              <p className="max-w-[28ch] text-white/80">
                We build custom growth systems for ambitious brands in any category.
              </p>
              <Button to="/contact" variant="light">
                Let's talk
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20 sm:py-28 md:py-40">
        <Container>
          <SectionHeading
            eyebrow={industryExpertise.eyebrow}
            title={industryExpertise.title}
          />
          <div className="mt-8 max-w-[62ch] space-y-5 sm:mt-10">
            {industryExpertise.paragraphs.map((paragraph) => (
              <Reveal key={paragraph}>
                <p className="text-base leading-relaxed text-ink-muted sm:text-lg md:text-xl">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line sm:mt-16 sm:grid-cols-2">
            {industryExpertise.pillars.map((pillar, i) => (
              <Reveal
                key={pillar.title}
                delay={(i % 2) * 0.08}
                className="group relative flex min-h-[200px] flex-col bg-paper p-7 transition-colors duration-500 hover:bg-ink hover:text-white sm:min-h-[220px] sm:p-9 md:p-12"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm tabular-nums text-blue transition-colors duration-300 group-hover:text-blue-soft">
                    0{i + 1}
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
                  {pillar.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-ink-muted transition-colors duration-300 group-hover:text-white/75 sm:mt-4 sm:max-w-[40ch]">
                  {pillar.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
