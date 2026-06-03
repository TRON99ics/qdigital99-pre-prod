import { useEffect, useRef, createContext, useContext } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { refreshScroll, setLenis, setupScrollDriver } from '../lib/scroll'

const LenisContext = createContext(null)
export const useLenis = () => useContext(LenisContext)

/**
 * Lenis + ScrollTrigger everywhere except Android (native scroll there).
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    const teardownNative = setupScrollDriver({ onRefresh: refreshScroll })
    if (teardownNative) {
      return teardownNative
    }

    const coarse = window.matchMedia('(pointer: coarse)').matches
    const narrow = window.matchMedia('(max-width: 767px)').matches
    const syncTouch = coarse || narrow

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch,
      syncTouchLerp: 0.075,
      touchInertiaExponent: 1.7,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
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
    gsap.ticker.add(onTick, false, true)
    gsap.ticker.lagSmoothing(0)

    const onRefresh = () => lenis.resize()
    ScrollTrigger.addEventListener('refresh', onRefresh)

    const onLoad = () => refreshScroll()
    window.addEventListener('load', onLoad)

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
