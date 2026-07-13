export async function collectUserMetadata() {
  const parts = []
  try {
    parts.push(`UA: ${navigator.userAgent}`)
    parts.push(`Lang: ${navigator.language}`)
    parts.push(`TZ: ${Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown'}`)
    parts.push(`Viewport: ${window.innerWidth}x${window.innerHeight}`)
    const res = await fetch('https://ipapi.co/json/')
    if (res.ok) {
      const j = await res.json()
      parts.push(`IP: ${j.ip || 'N/A'}`)
      parts.push(`City: ${j.city || 'N/A'}`)
      parts.push(`Region: ${j.region || 'N/A'}`)
      parts.push(`Country: ${j.country_name || 'N/A'}`)
    }
  } catch {
    parts.push('IP metadata unavailable')
  }
  return parts.join(' | ')
}
