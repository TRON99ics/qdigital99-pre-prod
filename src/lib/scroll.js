import { ScrollTrigger } from './gsap'

let lenisInstance = null

/** Lenis syncTouch is unreliable on Android — use native scroll there only. */
export function isAndroidDevice() {
  if (typeof navigator === 'undefined') return false
  return /Android/i.test(navigator.userAgent)
}

export function setLenis(lenis) {
  lenisInstance = lenis
}

export function getLenis() {
  return lenisInstance
}

function scrollerProxyTarget() {
  return document.documentElement
}

function setupNativeScrollProxy() {
  const root = scrollerProxyTarget()

  ScrollTrigger.scrollerProxy(root, {
    scrollTop(value) {
      if (arguments.length) {
        window.scrollTo({ top: value, left: 0, behavior: 'instant' })
      }
      return window.scrollY ?? window.pageYOffset ?? 0
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    },
  })

  const onScroll = () => ScrollTrigger.update()
  window.addEventListener('scroll', onScroll, { passive: true })

  return () => {
    window.removeEventListener('scroll', onScroll)
    ScrollTrigger.scrollerProxy(root, {})
  }
}

export function setupScrollDriver({ onRefresh } = {}) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return () => {}

  if (isAndroidDevice()) {
    setLenis(null)
    const teardownProxy = setupNativeScrollProxy()

    const onLoad = () => onRefresh?.()
    window.addEventListener('load', onLoad)
    const t1 = setTimeout(() => onRefresh?.(), 100)
    const t2 = setTimeout(() => onRefresh?.(), 800)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('load', onLoad)
      teardownProxy()
      ScrollTrigger.clearScrollMemory()
    }
  }

  return null
}

/** Recalculate all ScrollTrigger positions (call after route change, images, resize). */
export function refreshScroll() {
  requestAnimationFrame(() => {
    lenisInstance?.resize()
    ScrollTrigger.refresh(true)
  })
}
