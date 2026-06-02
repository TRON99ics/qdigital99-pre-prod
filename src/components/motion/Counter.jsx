import { useRef, useLayoutEffect, useState } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

/**
 * Animated number counter that runs once on scroll-in.
 */
export default function Counter({ value, prefix = '', suffix = '', decimals, className = '' }) {
  const ref = useRef(null)
  const auto = decimals ?? (Number.isInteger(value) ? 0 : 1)
  const [display, setDisplay] = useState(`${prefix}0${suffix}`)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setDisplay(`${prefix}${value.toFixed(auto)}${suffix}`)
      return
    }
    const obj = { n: 0 }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          n: value,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => setDisplay(`${prefix}${obj.n.toFixed(auto)}${suffix}`),
        })
      },
    })
    return () => st.kill()
  }, [value, prefix, suffix, auto])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
