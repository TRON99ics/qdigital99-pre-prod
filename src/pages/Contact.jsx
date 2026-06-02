import { useState } from 'react'
import PageHeader from '../components/layout/PageHeader'
import Container from '../components/ui/Container'
import Reveal from '../components/motion/Reveal'
import Button from '../components/ui/Button'
import { useSeo } from '../lib/useSeo'
import { site } from '../data/site'

const services = [
  'SEO & Organic Growth',
  'Paid Media',
  'Performance Marketing',
  'CRM & Automation',
  'Web & Conversion',
  'Brand Strategy',
  'Other',
]

const field =
  'w-full border-b border-line bg-transparent py-4 text-lg text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-ink'

export default function Contact() {
  useSeo({
    title: 'Contact',
    description:
      'Book a strategy call. Tell us about your goals and we will map the highest-impact path to growth.',
    path: '/contact',
  })
  const [sent, setSent] = useState(false)

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's map your growth."
        intro="Tell us where you want to go. We'll come back with a clear, honest read on how to get there."
      />

      <section className="bg-paper py-24 md:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr] lg:gap-24">
            <div>
              {sent ? (
                <Reveal className="flex min-h-[300px] flex-col justify-center">
                  <h2 className="display text-ink">Message sent.</h2>
                  <p className="mt-6 max-w-[40ch] text-xl text-ink-muted">
                    Thanks — we'll reply within one business day.
                  </p>
                </Reveal>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSent(true)
                  }}
                  className="grid gap-8"
                >
                  <div className="grid gap-8 sm:grid-cols-2">
                    <input required placeholder="Your name" className={field} />
                    <input required type="email" placeholder="Email address" className={field} />
                  </div>
                  <div className="grid gap-8 sm:grid-cols-2">
                    <input placeholder="Company" className={field} />
                    <select required defaultValue="" className={`${field} appearance-none`}>
                      <option value="" disabled>
                        Service of interest
                      </option>
                      {services.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    required
                    rows={4}
                    placeholder="What are you trying to grow?"
                    className={`${field} resize-none`}
                  />
                  <div className="pt-2">
                    <Button type="submit" variant="dark" size="lg">
                      Book a strategy call
                    </Button>
                  </div>
                </form>
              )}
            </div>

            <aside className="flex flex-col gap-12">
              <div>
                <div className="eyebrow text-ink-muted">Email</div>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 block text-xl text-ink underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <div className="eyebrow text-ink-muted">Call</div>
                <ul className="mt-3 space-y-2 text-xl text-ink">
                  {site.phones.map((p) => (
                    <li key={p.region}>
                      <span className="text-ink-muted">{p.region}</span> {p.number}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="eyebrow text-ink-muted">Markets</div>
                <ul className="mt-3 space-y-1 text-xl text-ink">
                  {site.markets.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[var(--radius-xl)] bg-surface p-8">
                <div className="eyebrow text-blue">What to expect</div>
                <ul className="mt-5 space-y-3 text-ink-soft">
                  <li>A clear read on your current marketing</li>
                  <li>The highest-impact opportunities first</li>
                  <li>An honest, no-pressure plan</li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}
