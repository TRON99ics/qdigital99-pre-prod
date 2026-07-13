import { siteConfig } from '../data/siteConfig'

export function submitToLeadSheet(payload) {
  if (!siteConfig.leadSheetUrl) return
  fetch(siteConfig.leadSheetUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    mode: 'no-cors',
  }).catch(() => {})
}

export async function notifyContactApi(payload, { honeypot = '', turnstileToken = '' } = {}) {
  const res = await fetch(siteConfig.contactApiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      website: honeypot,
      turnstileToken,
    }),
  })
  if (!res.ok) {
    let detail
    try {
      const j = await res.json()
      detail = j?.error || ''
    } catch {
      detail = await res.text()
    }
    throw new Error(detail || `Request failed (${res.status})`)
  }
}
