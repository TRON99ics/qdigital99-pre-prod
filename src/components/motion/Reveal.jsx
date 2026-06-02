import { useRef, useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { refreshScroll } from '../../lib/scroll'

/**
 * Scroll-in reveal. Uses immediateRender: false so content stays visible until
 * the ScrollTrigger activates (prevents stuck opacity: 0 with Lenis).
 */
export default function Reveal({
  children,
  className = '',
  y = 28,
  delay = 0,
  duration = 0.9,
  stagger = 0,
  start = 'top 88%',
  as: Tag = 'div',
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = stagger ? el.children : el
    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    const play = () => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        { opacity: 1, y: 0, duration, delay, ease: 'power3.out', stagger, overwrite: 'auto' },
      )
    }

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: play,
      })

      const revealIfVisible = () => {
        const rect = el.getBoundingClientRect()
        const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0
        if (st.isActive || inView) play()
      }

      requestAnimationFrame(revealIfVisible)
    }, el)

    refreshScroll()
    return () => ctx.revert()
  }, [y, delay, duration, stagger, start])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
