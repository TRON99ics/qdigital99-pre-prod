import { useEffect } from 'react'
import { site, brand } from '../data/site'

function setMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Lightweight SEO controller. Keeps title + core meta/OG tags in sync per page.
 * Architecture is ready to swap for react-helmet / SSR metadata later.
 */
export function useSeo({ title, description, path } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`
    const pageUrl = path ? `${site.url}${path}` : site.url
    const imageUrl = `${site.url}${brand.ogImage}`

    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', pageUrl)
    setMeta('property', 'og:image', imageUrl)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', imageUrl)
  }, [title, description, path])
}
