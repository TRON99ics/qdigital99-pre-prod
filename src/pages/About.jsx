import PageHeader from '../components/layout/PageHeader'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/motion/Reveal'
import ParallaxImage from '../components/motion/ParallaxImage'
import Button from '../components/ui/Button'
import { useSeo } from '../lib/useSeo'
import { values, team, differentiators } from '../data/content'
import { site } from '../data/site'

export default function About() {
  useSeo({
    title: 'About',
    description:
      'A growth partner that connects creativity and performance. Meet the team and the philosophy behind QDigital99.',
    path: '/about',
  })

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Growth is a system, not a campaign."
        intro="We connect acquisition, conversion and retention into one measurable engine — so marketing investment turns into predictable revenue."
        meta={[
          { value: `${new Date().getFullYear() - site.founded}+ yrs`, label: 'Operating' },
          { value: '3', label: 'Global markets' },
          { value: '98%', label: 'Client retention' },
        ]}
      />

      <section className="bg-paper py-28 md:py-40">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading eyebrow="Our philosophy" title="How we think." />
              <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-ink-muted">
                True growth happens when traffic, conversion, automation and analytics
                operate together. We make decisions in this order — every time.
              </p>
            </div>
            <ul className="flex flex-col">
              {values.map((v, i) => (
                <Reveal
                  key={v}
                  delay={i * 0.05}
                  className="flex items-baseline gap-6 border-b border-line py-8"
                >
                  <span className="text-sm tabular-nums text-blue">0{i + 1}</span>
                  <span className="text-3xl font-medium tracking-tight text-ink md:text-4xl">
                    {v}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-24 md:py-32">
        <Container>
          <div className="grid gap-3 md:grid-cols-12 md:gap-6">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80"
              alt="Strategy workshop"
              className="aspect-[4/5] md:col-span-5"
            />
            <ParallaxImage
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80"
              alt="Creative team at work"
              className="aspect-[4/3] md:col-span-7 md:mt-24"
            />
          </div>
        </Container>
      </section>

      <section className="bg-paper py-28 md:py-40">
        <Container>
          <SectionHeading eyebrow="What sets us apart" title="No isolated tactics. Complete systems." />
          <div className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line sm:grid-cols-2">
            {differentiators.map((d, i) => (
              <Reveal key={d.title} delay={(i % 2) * 0.08} className="bg-paper p-9 md:p-12">
                <div className="text-sm tabular-nums text-blue">0{i + 1}</div>
                <h3 className="mt-6 text-2xl font-medium tracking-tight text-ink">{d.title}</h3>
                <p className="mt-4 max-w-[40ch] leading-relaxed text-ink-muted">{d.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-28 text-white md:py-40">
        <Container>
          <SectionHeading
            eyebrow="Leadership"
            title="Regional expertise, one standard."
            className="[&_h2]:text-white"
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-xl)] border border-white/10 bg-white/10 sm:grid-cols-2">
            {team.map((member) => (
              <div key={member.name} className="bg-ink p-9 md:p-12">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue text-xl font-semibold">
                  {member.name[0]}
                </div>
                <h3 className="mt-8 text-3xl font-medium tracking-tight">{member.name}</h3>
                <p className="mt-2 text-white/60">{member.role}</p>
                <p className="mt-1 text-sm text-white/40">{member.region}</p>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <Button to="/contact" variant="primary" size="lg">
              Work with us
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
