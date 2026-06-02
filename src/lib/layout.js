/** Fixed nav height — keep in sync with Navbar + `.nav-shell-bg` in index.css */
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
