import PageHeader from '../components/layout/PageHeader'
import Container from '../components/ui/Container'
import Reveal from '../components/motion/Reveal'
import Button from '../components/ui/Button'
import { useSeo } from '../lib/useSeo'
import { industries } from '../data/industries'

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
    </>
  )
}
