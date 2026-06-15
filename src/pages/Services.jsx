import PageHeader from '../components/layout/PageHeader'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/motion/Reveal'
import { useSeo } from '../lib/useSeo'
import { capabilities, growthFramework } from '../data/services'

export default function Services() {
  useSeo({
    title: 'Services',
    description:
      'SEO, paid media, performance marketing, social, content, brand, web and CRO — engineered around one framework: acquire, convert, scale.',
    path: '/services',
  })

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything you need to grow online."
        intro="Strategy, execution and measurable results — delivered as one connected system instead of disconnected tactics."
      />

      <section className="bg-paper py-20 sm:py-24 md:py-32">
        <Container>
          <div className="border-t border-line">
            {capabilities.map((c, i) => (
              <Reveal
                key={c.id}
                delay={(i % 2) * 0.05}
                className="group -mx-6 grid gap-6 border-b border-line px-6 py-10 transition-colors duration-300 hover:bg-surface/70 sm:gap-8 sm:py-12 md:-mx-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:px-10 md:py-16 lg:-mx-14 lg:px-14"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="text-sm tabular-nums text-ink-muted transition-colors duration-300 group-hover:text-blue">
                      {c.index}
                    </span>
                    <span className="eyebrow text-blue">{c.tag}</span>
                    <span
                      className="ml-auto text-sm text-blue opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:ml-0 md:-translate-x-2"
                      aria-hidden
                    >
                      →
                    </span>
                  </div>
                  <h2 className="mt-4 text-3xl font-medium tracking-tight text-ink transition-transform duration-500 group-hover:translate-x-1 sm:mt-5 sm:text-4xl md:text-5xl">
                    {c.title}
                  </h2>
                  <p className="mt-4 max-w-[40ch] text-base text-ink-soft sm:mt-5 sm:text-lg">
                    {c.summary}
                  </p>
                </div>
                <div className="flex flex-col justify-between">
                  <p className="max-w-[52ch] text-base leading-relaxed text-ink-muted sm:text-lg">
                    {c.detail}
                  </p>
                  <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:mt-8 sm:grid-cols-2">
                    {c.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-3 text-sm text-ink-soft transition-colors duration-300 group-hover:text-ink sm:text-base"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue transition-transform duration-300 group-hover:scale-125" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20 sm:py-28 md:py-40">
        <Container>
          <SectionHeading
            eyebrow={growthFramework.eyebrow}
            title={growthFramework.title}
            intro={growthFramework.intro}
          />
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line sm:mt-16 sm:grid-cols-2">
            {growthFramework.steps.map((step, i) => (
              <Reveal
                key={step.index}
                delay={(i % 2) * 0.08}
                className="group relative flex min-h-[220px] flex-col bg-paper p-7 transition-colors duration-500 hover:bg-ink hover:text-white sm:min-h-[260px] sm:p-9 md:min-h-[280px] md:p-12"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm tabular-nums text-blue transition-colors duration-300 group-hover:text-blue-soft">
                    {step.index}
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
                  {step.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-ink-muted transition-colors duration-300 group-hover:text-white/75 sm:mt-4 sm:max-w-[42ch]">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal className="group mt-12 border-t border-line pt-12 transition-colors duration-300 hover:border-blue/30 sm:mt-16 sm:pt-16 md:mt-20 md:pt-20">
            <p className="max-w-[36ch] text-balance text-xl font-medium leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-blue sm:text-2xl md:text-3xl">
              {growthFramework.statement}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
