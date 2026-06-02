import PageHeader from '../components/layout/PageHeader'
import Container from '../components/ui/Container'
import Reveal from '../components/motion/Reveal'
import ParallaxImage from '../components/motion/ParallaxImage'
import Counter from '../components/motion/Counter'
import { useSeo } from '../lib/useSeo'
import { caseStudies } from '../data/caseStudies'

export default function CaseStudies() {
  useSeo({
    title: 'Case Studies',
    description:
      'Real growth stories across healthcare, real estate, e-commerce and education — built on strategy, not guesswork.',
    path: '/case-studies',
  })

  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        title="Built on strategy. Not guesswork."
        intro="Each story shows the challenge, the system we built, and the revenue it returned."
        meta={[
          { value: '4', label: 'Featured stories' },
          { value: '+312%', label: 'Avg. revenue growth' },
          { value: '4.8×', label: 'Average ROAS' },
        ]}
      />

      <section className="bg-paper py-24 md:py-32">
        <Container>
          <div className="flex flex-col gap-24 md:gap-40">
            {caseStudies.map((cs, i) => (
              <article
                key={cs.id}
                className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                  i % 2 ? 'md:[direction:rtl]' : ''
                }`}
              >
                <div className="md:[direction:ltr]">
                  <ParallaxImage src={cs.image} alt={cs.title} className="aspect-[4/3]" />
                </div>
                <div className="md:[direction:ltr]">
                  <div className="eyebrow text-blue">{cs.industry} · {cs.client}</div>
                  <h2 className="mt-5 text-4xl font-medium tracking-tight text-ink md:text-5xl">
                    {cs.title}
                  </h2>
                  <p className="mt-6 max-w-[46ch] leading-relaxed text-ink-muted">
                    <span className="text-ink-soft">Challenge.</span> {cs.challenge}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {cs.strategy.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-ink-soft"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <Reveal
                    stagger={0.1}
                    className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-8"
                  >
                    {cs.results.map((r) => (
                      <div key={r.label}>
                        <div className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                          <Counter value={r.value} suffix={r.suffix} />
                        </div>
                        <div className="mt-2 max-w-[16ch] text-sm text-ink-muted">{r.label}</div>
                      </div>
                    ))}
                  </Reveal>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
