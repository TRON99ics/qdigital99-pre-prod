/** Fixed nav height — synced to DOM via syncSiteHeaderVar() */
export function getSiteHeaderPx() {
  const header = document.querySelector('[data-site-header]')
  if (header) return header.offsetHeight
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--site-header').trim()
  if (!raw) return 88
  const probe = document.createElement('div')
  probe.style.cssText = `position:absolute;visibility:hidden;height:${raw};pointer-events:none`
  document.body.appendChild(probe)
  const px = probe.offsetHeight
  probe.remove()
  return px
}

/** Keep --site-header in sync with measured header (resize, route, shell reveal). */
export function syncSiteHeaderVar() {
  if (typeof document === 'undefined') return 88
  const px = getSiteHeaderPx()
  document.documentElement.style.setProperty('--site-header', `${px}px`)
  return px
}
