import PageHeader from '../components/layout/PageHeader'
import Container from '../components/ui/Container'
import Reveal from '../components/motion/Reveal'
import { useSeo } from '../lib/useSeo'
import { insights } from '../data/content'

const fmt = (d) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export default function Insights() {
  useSeo({
    title: 'Insights',
    description:
      'Field notes on measurement, paid media, SEO and lifecycle — what actually works in modern growth.',
    path: '/insights',
  })

  const [lead, ...rest] = insights

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Field notes from the work."
        intro="No fluff. Practical thinking on measurement, media, search and retention."
      />

      <section className="bg-paper py-24 md:py-32">
        <Container>
          <Reveal>
            <a href="#" className="group grid gap-8 md:grid-cols-2 md:gap-14">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[var(--radius-xl)]">
                <img
                  src={lead.image}
                  alt={lead.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="eyebrow text-blue">
                  {lead.category} · {lead.readingTime}
                </div>
                <h2 className="mt-6 text-4xl font-medium leading-tight tracking-tight text-ink md:text-6xl">
                  {lead.title}
                </h2>
                <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-ink-muted">
                  {lead.excerpt}
                </p>
                <div className="mt-8 text-sm text-ink-muted">{fmt(lead.date)}</div>
              </div>
            </a>
          </Reveal>

          <div className="mt-24 grid gap-x-10 gap-y-16 border-t border-line pt-16 md:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.08}>
                <a href="#" className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)]">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="eyebrow mt-6 text-blue">
                    {post.category} · {post.readingTime}
                  </div>
                  <h3 className="mt-3 text-2xl font-medium leading-snug tracking-tight text-ink">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-ink-muted">{post.excerpt}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
