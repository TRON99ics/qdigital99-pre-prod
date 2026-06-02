import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

/**
 * Minimal custom cursor — a small dot that grows over interactive elements.
 * Pointer-device only; hidden on touch.
 */
export default function Cursor() {
  const dot = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    const el = dot.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' })

    const move = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }
    const over = (e) => {
      const interactive = e.target.closest('a, button, [data-cursor]')
      gsap.to(el, { scale: interactive ? 3.4 : 1, duration: 0.3, ease: 'power3.out' })
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue mix-blend-difference md:block"
      style={{ willChange: 'transform' }}
    />
  )
}
