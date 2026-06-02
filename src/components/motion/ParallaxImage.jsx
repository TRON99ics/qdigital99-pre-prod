import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'

/**
 * Image with a scale-reveal mask and gentle scroll parallax on the inner image.
 */
export default function ParallaxImage({
  src,
  alt = '',
  className = '',
  amount = 12,
  rounded = true,
}) {
  const wrap = useRef(null)
  const img = useRef(null)

  useLayoutEffect(() => {
    const el = wrap.current
    const image = img.current
    if (!el || !image) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.fromTo(
          image,
          { scale: 1.25 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
        gsap.fromTo(
          image,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      }
    }, el)
    return () => ctx.revert()
  }, [amount])

  return (
    <div
      ref={wrap}
      className={`relative overflow-hidden ${rounded ? 'rounded-[var(--radius-xl)]' : ''} ${className}`}
    >
      <img
        ref={img}
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover"
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}
