import { useState } from 'react'
import PageHeader from '../components/layout/PageHeader'
import Container from '../components/ui/Container'
import Reveal from '../components/motion/Reveal'
import Button from '../components/ui/Button'
import { ContactSecurityFields } from '../components/ContactSecurityFields'
import { useContactSecurity } from '../hooks/useContactSecurity'
import { collectUserMetadata } from '../lib/userMetadata'
import { notifyContactApi, submitToLeadSheet } from '../lib/submitLead'
import { useSeo } from '../lib/useSeo'
import { site } from '../data/site'

const services = [
  'SEO & Organic Growth',
  'Digital Growth',
  'Performance Marketing',
  'CRM & Automation',
  'Web & Conversion',
  'Brand Strategy',
  'Other',
]

const field =
  'w-full border-b border-line bg-transparent py-4 text-lg text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-ink'

const emptyForm = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
}

export default function Contact() {
  useSeo({
    title: 'Contact',
    description:
      'Book a strategy call. Tell us about your goals and we will map the highest-impact path to growth.',
    path: '/contact',
  })

  const [form, setForm] = useState(emptyForm)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { honeypot, turnstileToken, resetSecurity, assertReady, securityProps } =
    useContactSecurity()

  const onChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.service || !form.message) {
      setError('Please fill all required fields.')
      return
    }

    setLoading(true)
    setError('')
    try {
      assertReady()
      const meta = await collectUserMetadata()
      const info = [
        `Service: ${form.service}`,
        `Company: ${form.company || 'N/A'}`,
        '',
        form.message,
      ].join('\n')
      const payload = {
        username: form.name,
        email: form.email,
        contact: 'N/A',
        info,
        remarks: `Contact request — ${form.service}`,
        userLocation: meta,
      }
      submitToLeadSheet(payload)
      await notifyContactApi(payload, { honeypot, turnstileToken })
      setSent(true)
      setForm(emptyForm)
      resetSecurity()
    } catch (err) {
      setError(err.message || 'Unable to submit right now. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
                <form onSubmit={onSubmit} className="relative grid gap-8">
                  <div className="grid gap-8 sm:grid-cols-2">
                    <input
                      required
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                      className={field}
                      value={form.name}
                      onChange={onChange('name')}
                    />
                    <input
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Email address"
                      className={field}
                      value={form.email}
                      onChange={onChange('email')}
                    />
                  </div>
                  <div className="grid gap-8 sm:grid-cols-2">
                    <input
                      name="company"
                      autoComplete="organization"
                      placeholder="Company"
                      className={field}
                      value={form.company}
                      onChange={onChange('company')}
                    />
                    <select
                      required
                      name="service"
                      value={form.service}
                      onChange={onChange('service')}
                      className={`${field} appearance-none`}
                    >
                      <option value="" disabled>
                        Service of interest
                      </option>
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder="What are you trying to grow?"
                    className={`${field} resize-none`}
                    value={form.message}
                    onChange={onChange('message')}
                  />
                  <ContactSecurityFields {...securityProps} />
                  {error ? (
                    <p className="text-sm text-red-600" role="alert">
                      {error}
                    </p>
                  ) : null}
                  <div className="pt-2">
                    <Button type="submit" variant="dark" size="lg" disabled={loading}>
                      {loading ? 'Sending…' : 'Book a strategy call'}
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
              {site.phones.length > 0 ? (
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
              ) : null}
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
