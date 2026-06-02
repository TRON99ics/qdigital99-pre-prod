import { useRef, useLayoutEffect, useState } from 'react'

/**
 * Seamless looping marquee. Speed in px/sec. Direction -1 (left) or 1 (right).
 * Uses translateX(-50%) on two identical halves — no GSAP modulo gaps.
 */
export default function Marquee({ children, speed = 60, direction = -1, className = '' }) {
  const track = useRef(null)
  const [duration, setDuration] = useState(30)
  const [paused, setPaused] = useState(false)

  useLayoutEffect(() => {
    const el = track.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setPaused(reduced)

    const sync = () => {
      const segment = el.children[0]?.offsetWidth ?? el.offsetWidth / 2
      if (segment > 0) setDuration(segment / speed)
    }

    sync()
    const ro = new ResizeObserver(sync)
    ro.observe(el)
    if (el.children[0]) ro.observe(el.children[0])

    return () => ro.disconnect()
  }, [speed, children])

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        ref={track}
        className="marquee-track flex w-max will-change-transform"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: direction === -1 ? 'normal' : 'reverse',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        <div className="marquee-segment flex shrink-0">{children}</div>
        <div className="marquee-segment flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
