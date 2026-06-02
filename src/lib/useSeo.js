import { useEffect } from 'react'
import { site } from '../data/site'

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
    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', path ? `${site.url}${path}` : site.url)
  }, [title, description, path])
}
