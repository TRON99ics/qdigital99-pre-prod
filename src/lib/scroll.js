import { ScrollTrigger } from './gsap'

let lenisInstance = null

export function setLenis(lenis) {
  lenisInstance = lenis
}

export function getLenis() {
  return lenisInstance
}

/** Recalculate all ScrollTrigger positions (call after route change, images, resize). */
export function refreshScroll() {
  requestAnimationFrame(() => {
    lenisInstance?.resize()
    ScrollTrigger.refresh(true)
  })
}
