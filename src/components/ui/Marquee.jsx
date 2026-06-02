import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'

/**
 * Seamless looping marquee. Speed in px/sec. Direction -1 (left) or 1 (right).
 */
export default function Marquee({ children, speed = 60, direction = -1, className = '' }) {
  const track = useRef(null)

  useLayoutEffect(() => {
    const el = track.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const width = el.scrollWidth / 2
    const ctx = gsap.context(() => {
      gsap.to(el, {
        x: direction * -width,
        duration: width / speed,
        ease: 'none',
        repeat: -1,
        modifiers: { x: gsap.utils.unitize((x) => parseFloat(x) % width) },
      })
    }, el)
    return () => ctx.revert()
  }, [speed, direction])

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={track} className="flex w-max">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
