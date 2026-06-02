import { useRef } from 'react'
import { gsap } from '../../lib/gsap'

/**
 * Magnetic hover wrapper — element drifts toward the cursor and snaps back.
 */
export default function Magnetic({ children, strength = 0.4, className = '' }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.6, ease: 'power3.out' })
  }

  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  )
}
