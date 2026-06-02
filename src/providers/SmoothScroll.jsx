import { useEffect, useRef, createContext, useContext } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { setLenis, refreshScroll } from '../lib/scroll'

const LenisContext = createContext(null)
export const useLenis = () => useContext(LenisContext)

/**
 * Lenis smooth scroll synced to GSAP ScrollTrigger.
 * scrollerProxy keeps ScrollTrigger aligned with Lenis scroll position so
 * reveal animations actually fire (otherwise sections stay opacity: 0).
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      autoRaf: false,
    })
    lenisRef.current = lenis
    setLenis(lenis)

    const root = document.documentElement

    ScrollTrigger.scrollerProxy(root, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
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

    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time) => lenis.raf(time * 1000)
    // Prioritize Lenis in the ticker to reduce jitter with ScrollTrigger.
    gsap.ticker.add(onTick, false, true)
    gsap.ticker.lagSmoothing(0)

    const onRefresh = () => lenis.resize()
    ScrollTrigger.addEventListener('refresh', onRefresh)

    const onLoad = () => refreshScroll()
    window.addEventListener('load', onLoad)

    // Initial refresh after all section ScrollTriggers mount.
    const t1 = setTimeout(refreshScroll, 100)
    const t2 = setTimeout(refreshScroll, 800)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('load', onLoad)
      ScrollTrigger.removeEventListener('refresh', onRefresh)
      gsap.ticker.remove(onTick)
      lenis.destroy()
      lenisRef.current = null
      setLenis(null)
      ScrollTrigger.scrollerProxy(root, {})
      ScrollTrigger.clearScrollMemory()
    }
  }, [])

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
}
