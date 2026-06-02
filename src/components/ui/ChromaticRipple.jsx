import { useEffect, useRef } from 'react'

const FILTER_ID = 'chromatic-ripple'

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

/**
 * Chromatic ripple — only on aggressive mouse movement (reading stays clear).
 * Below SPEED_MIN nothing happens; above SPEED_FULL the wave is strongest.
 * Default system cursor is untouched. Pointer-device only.
 */

/** px/ms — normal hover/reading stays below this */
const SPEED_MIN = 3.35
/** px/ms — fast swipe reaches full strength */
const SPEED_FULL = 3.8
/** Filter only engages above this smoothed level */
const LEVEL_ON = 0.1
export default function ChromaticRipple({ children }) {
  const wrapRef = useRef(null)
  const turbRef = useRef(null)
  const rRef = useRef(null)
  const gRef = useRef(null)
  const bRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const wrap = wrapRef.current
    const turb = turbRef.current
    const dispR = rRef.current
    const dispG = gRef.current
    const dispB = bRef.current
    if (!wrap || !turb || !dispR || !dispG || !dispB) return

    let raf = 0
    let running = false
    let last = performance.now()
    let lx = 0
    let ly = 0
    let lt = performance.now()
    let energy = 0 // target, fed by mouse speed
    let level = 0 // smoothed, drives the filter

    const MAX_SCALE = 28 // px of displacement at full energy (green channel)

    const apply = () => {
      const t = performance.now() / 1000
      // Subtle living motion so the wave travels while active.
      const bx = 0.009 + 0.0035 * Math.sin(t * 1.4)
      const by = 0.014 + 0.0045 * Math.cos(t * 1.1)
      turb.setAttribute('baseFrequency', `${bx.toFixed(5)} ${by.toFixed(5)}`)

      const base = level * MAX_SCALE
      // Different scale per channel => chromatic fringing.
      dispR.setAttribute('scale', (base * 1.5).toFixed(2))
      dispG.setAttribute('scale', base.toFixed(2))
      dispB.setAttribute('scale', (base * 0.55).toFixed(2))
    }

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      energy *= Math.pow(0.015, dt) // drop off quickly when movement slows
      level += (energy - level) * Math.min(1, dt * 14)

      if (level < LEVEL_ON && energy < LEVEL_ON) {
        level = 0
        wrap.style.filter = 'none'
        running = false
        return
      }

      wrap.style.filter = `url(#${FILTER_ID})`
      apply()
      raf = requestAnimationFrame(tick)
    }

    const ensureRunning = () => {
      if (running) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      const now = performance.now()
      const dt = Math.max(now - lt, 1)
      const dist = Math.hypot(e.clientX - lx, e.clientY - ly)
      const speed = dist / dt // px per ms
      lx = e.clientX
      ly = e.clientY
      lt = now

      if (speed < SPEED_MIN) return

      const t = clamp((speed - SPEED_MIN) / (SPEED_FULL - SPEED_MIN), 0, 1)
      const target = t * t * t // steep curve — only aggressive sweeps matter
      if (target > energy) energy = target
      if (energy > LEVEL_ON) ensureRunning()
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      wrap.style.filter = 'none'
    }
  }, [])

  return (
    <>
      <svg
        aria-hidden="true"
        width="0"
        height="0"
        className="pointer-events-none absolute"
        style={{ position: 'absolute' }}
      >
        <defs>
          <filter
            id={FILTER_ID}
            x="-12%"
            y="-12%"
            width="124%"
            height="124%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={turbRef}
              type="turbulence"
              baseFrequency="0.009 0.014"
              numOctaves="2"
              seed="7"
              stitchTiles="stitch"
              result="noise"
            />

            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="rChan"
            />
            <feDisplacementMap
              ref={rRef}
              in="rChan"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
              result="rDisp"
            />

            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="gChan"
            />
            <feDisplacementMap
              ref={gRef}
              in="gChan"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
              result="gDisp"
            />

            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
              result="bChan"
            />
            <feDisplacementMap
              ref={bRef}
              in="bChan"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
              result="bDisp"
            />

            <feBlend in="rDisp" in2="gDisp" mode="screen" result="rg" />
            <feBlend in="rg" in2="bDisp" mode="screen" />
          </filter>
        </defs>
      </svg>

      <div ref={wrapRef} className="chromatic-ripple-root">
        {children}
      </div>
    </>
  )
}
