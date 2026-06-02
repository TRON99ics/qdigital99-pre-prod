import { useRef, useLayoutEffect, createElement } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { refreshScroll } from '../../lib/scroll'

/**
 * Headline word reveal. Words stay visible until the trigger fires; if the
 * section is already on screen (e.g. after fast scroll), they reveal immediately.
 */
export default function SplitText({
  children,
  as = 'h2',
  className = '',
  delay = 0,
  stagger = 0.06,
  duration = 1,
  trigger = true,
  start = 'top 88%',
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const words = el.querySelectorAll('[data-word]')
    if (!words.length) return

    if (reduced) {
      gsap.set(words, { yPercent: 0 })
      return
    }

    const play = () => {
      gsap.fromTo(
        words,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration,
          delay,
          ease: 'expo.out',
          stagger,
          overwrite: 'auto',
        },
      )
    }

    const ctx = gsap.context(() => {
      if (!trigger) {
        play()
        return
      }

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
  }, [children, delay, stagger, duration, trigger, start])

  const text = String(children)
  const words = text.split(' ')

  return createElement(
    as,
    { ref, className: `split-safe ${className}`.trim() },
    words.map((word, i) => (
      <span
        key={i}
        className="line-mask"
      >
        <span data-word style={{ display: 'inline-block', willChange: 'transform' }}>
          {word}
        </span>
        {i < words.length - 1 ? '\u00A0' : ''}
      </span>
    )),
  )
}
