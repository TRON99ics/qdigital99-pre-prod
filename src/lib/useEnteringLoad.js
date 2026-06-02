import { useEffect, useState, useCallback } from 'react'
import { preloadRobotModel } from './robotModel'
import { refreshScroll } from './scroll'

const MIN_FIRST_MS = 900
const MIN_ROUTE_MS = 550
const HOLD_AT_99_MS = 180

function waitWindowLoad() {
  if (document.readyState === 'complete') return Promise.resolve()
  return new Promise((resolve) => window.addEventListener('load', resolve, { once: true }))
}

function waitRoutePaint() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  })
}

const LAZY_ROUTES = {
  '/about': () => import('../pages/About'),
  '/services': () => import('../pages/Services'),
  '/case-studies': () => import('../pages/CaseStudies'),
  '/industries': () => import('../pages/Industries'),
  '/insights': () => import('../pages/Insights'),
  '/contact': () => import('../pages/Contact'),
}

function waitRouteChunk(pathname) {
  const load = LAZY_ROUTES[pathname]
  if (!load) return Promise.resolve()
  return load().then(() => undefined)
}

/**
 * Tracks real load gates per navigation; drives 000–099 and loader phases.
 */
export function useEnteringLoad(pathname) {
  const [display, setDisplay] = useState(0)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading') // loading | exiting | idle

  const finishExit = useCallback(() => {
    setPhase('idle')
    refreshScroll()
    setTimeout(refreshScroll, 400)
  }, [])

  useEffect(() => {
    let cancelled = false
    setPhase('loading')
    setDisplay(0)
    setProgress(0)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const minMs = pathname === '/' ? MIN_FIRST_MS : MIN_ROUTE_MS

    const gates = { fonts: 0, model: 0, window: 0, route: 0, chunk: 0, min: 0 }
    const weights = { fonts: 0.1, model: 0.38, window: 0.14, route: 0.08, chunk: 0.2, min: 0.1 }

    const publish = (done = false) => {
      if (cancelled) return
      let p = Object.keys(weights).reduce((sum, k) => sum + gates[k] * weights[k], 0)
      if (!done) p = Math.min(p, 0.9)
      else p = 1
      setProgress(p)
      setDisplay(Math.min(99, Math.floor(p * 99)))
    }

    const minStart = performance.now()
    const minTimer = window.setInterval(() => {
      if (performance.now() - minStart >= minMs) {
        gates.min = 1
        publish()
        clearInterval(minTimer)
      }
    }, 40)

    document.fonts.ready.then(() => {
      gates.fonts = 1
      publish()
    })

    preloadRobotModel().then(() => {
      gates.model = 1
      publish()
    })

    waitWindowLoad().then(() => {
      gates.window = 1
      publish()
    })

    waitRoutePaint().then(() => {
      gates.route = 1
      publish()
    })

    waitRouteChunk(pathname).then(() => {
      gates.chunk = 1
      publish()
    })

    Promise.all([
      document.fonts.ready,
      preloadRobotModel(),
      waitWindowLoad(),
      waitRoutePaint(),
      waitRouteChunk(pathname),
      new Promise((r) => setTimeout(r, minMs)),
    ]).then(() => {
      if (cancelled) return

      if (reduced) {
        setProgress(1)
        setDisplay(99)
        setPhase('idle')
        refreshScroll()
        return
      }

      publish(true)
      setDisplay(99)

      setTimeout(() => {
        if (!cancelled) setPhase('exiting')
      }, HOLD_AT_99_MS)
    })

    return () => {
      cancelled = true
      clearInterval(minTimer)
    }
  }, [pathname])

  return { display, progress, phase, finishExit }
}
