import PageHeader from '../components/layout/PageHeader'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/motion/Reveal'
import Button from '../components/ui/Button'
import { useSeo } from '../lib/useSeo'
import { capabilities, packages } from '../data/services'

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

      <section className="bg-paper py-24 md:py-32">
        <Container>
          <div className="border-t border-line">
            {capabilities.map((c, i) => (
              <Reveal
                key={c.id}
                delay={(i % 2) * 0.05}
                className="grid gap-8 border-b border-line py-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:py-16"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm tabular-nums text-ink-muted">{c.index}</span>
                    <span className="eyebrow text-blue">{c.tag}</span>
                  </div>
                  <h2 className="mt-5 text-4xl font-medium tracking-tight text-ink md:text-5xl">
                    {c.title}
                  </h2>
                  <p className="mt-5 max-w-[40ch] text-lg text-ink-soft">{c.summary}</p>
                </div>
                <div className="flex flex-col justify-between">
                  <p className="max-w-[52ch] text-lg leading-relaxed text-ink-muted">{c.detail}</p>
                  <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-ink-soft">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue" />
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

      <section className="bg-surface py-28 md:py-40">
        <Container>
          <SectionHeading
            eyebrow="Engagements"
            title="Simple, transparent pricing."
            intro="Flexible packages that grow with you. Every plan includes dedicated support and clear reporting."
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {packages.map((pkg, i) => (
              <Reveal
                key={pkg.name}
                delay={i * 0.08}
                className={`flex flex-col rounded-[var(--radius-xl)] border p-9 md:p-10 ${
                  pkg.featured ? 'border-transparent bg-ink text-white' : 'border-line bg-paper'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`eyebrow ${pkg.featured ? 'text-blue-soft' : 'text-blue'}`}>
                    {pkg.name}
                  </span>
                  {pkg.featured && (
                    <span className="rounded-full bg-blue px-3 py-1 text-xs">Most popular</span>
                  )}
                </div>
                <div className="mt-8 text-5xl font-semibold tracking-tight">{pkg.price}</div>
                <div className={`mt-2 text-sm ${pkg.featured ? 'text-white/50' : 'text-ink-muted'}`}>
                  {pkg.period}
                </div>
                <ul className="mt-8 flex flex-1 flex-col gap-3">
                  {pkg.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-center gap-3 text-sm ${
                        pkg.featured ? 'text-white/75' : 'text-ink-soft'
                      }`}
                    >
                      <span className="text-blue">→</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <Button
                    to="/contact"
                    variant={pkg.featured ? 'primary' : 'dark'}
                    className="w-full"
                  >
                    Get started
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
