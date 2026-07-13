import { useEffect, useMemo, useState } from 'react'
import { ContactSecurityFields } from './ContactSecurityFields'
import Button from './ui/Button'
import { useContactSecurity } from '../hooks/useContactSecurity'
import { collectUserMetadata } from '../lib/userMetadata'
import { notifyContactApi, submitToLeadSheet } from '../lib/submitLead'

export const GROWTH_PLAYBOOK_TITLE =
  '7 Growth Levers to Acquire, Convert & Scale Your Pipeline'

export default function LeadMagnetModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const { honeypot, turnstileToken, resetSecurity, assertReady, securityProps } =
    useContactSecurity()
  const guideTitle = useMemo(() => GROWTH_PLAYBOOK_TITLE, [])

  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow
    const prevHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
    }
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    setLoading(true)
    setStatus({ type: '', message: '' })
    try {
      assertReady()
      const meta = await collectUserMetadata()
      const payload = {
        username: form.name,
        email: form.email,
        contact: 'N/A',
        info: `Source: Lead magnet popup\nGuide: ${guideTitle}`,
        remarks: `Lead magnet — ${guideTitle}`,
        userLocation: meta,
      }
      submitToLeadSheet(payload)
      await notifyContactApi(payload, { honeypot, turnstileToken })
      setStatus({
        type: 'success',
        message: 'Success. We will send your playbook shortly.',
      })
      setForm({ name: '', email: '' })
      resetSecurity()
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Could not submit right now. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  const field =
    'w-full border-b border-line bg-transparent py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-ink'

  return (
    <div className="fixed inset-0 z-[160] overflow-x-hidden overflow-y-auto bg-ink/50 p-3 backdrop-blur-sm md:p-4">
      <div className="flex min-h-dvh items-center justify-center">
        <div
          data-modal-open="true"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-magnet-title"
          className="relative w-full max-w-lg overflow-x-hidden overflow-y-auto rounded-[var(--radius-xl)] bg-paper p-6 shadow-xl max-h-[calc(100dvh-1.5rem)] md:max-h-[calc(100dvh-2rem)] md:p-10"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-ink hover:text-ink"
          >
            ✕
          </button>

          <p className="eyebrow text-blue">Free playbook</p>
          <h3 id="lead-magnet-title" className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Growth, engineered.
          </h3>
          <p className="mt-3 text-ink-muted">{guideTitle}</p>

          <form onSubmit={onSubmit} className="relative mt-8 space-y-5">
            <input
              required
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className={field}
              placeholder="Your name"
              autoComplete="name"
            />
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              className={field}
              placeholder="you@company.com"
              autoComplete="email"
            />
            <div className="w-full min-w-0">
              <ContactSecurityFields {...securityProps} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <p className="text-xs text-ink-muted">No spam. Practical growth tactics only.</p>
              <Button type="submit" variant="primary" disabled={loading} magnetic={false}>
                {loading ? 'Submitting…' : 'Get playbook'}
              </Button>
            </div>
          </form>

          {status.message ? (
            <p
              className={`mt-4 text-sm ${
                status.type === 'success' ? 'text-blue' : 'text-red-600'
              }`}
              role="status"
            >
              {status.message}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
