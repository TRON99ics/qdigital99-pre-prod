import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getSiteHeaderPx } from './layout'
import { getLenis } from './scroll'

/**
 * Home: transparent nav over hero; solid pill after hero scrolls away.
 * Other routes: pill visible immediately.
 */
export function useNavShell() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [shell, setShell] = useState(!isHome)

  useEffect(() => {
    if (!isHome) {
      setShell(true)
      return
    }

    const hero = document.querySelector('[data-hero]')
    if (!hero) {
      setShell(true)
      return
    }

    const sync = (inHero) => setShell(!inHero)
    const margin = () => `-${getSiteHeaderPx()}px 0px 0px 0px`

    const observer = new IntersectionObserver(
      ([entry]) => sync(entry.isIntersecting),
      { threshold: 0, rootMargin: margin() },
    )
    observer.observe(hero)

    const onScroll = () => {
      const rect = hero.getBoundingClientRect()
      sync(rect.bottom > getSiteHeaderPx())
    }
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    const lenis = getLenis()
    lenis?.on('scroll', onScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      lenis?.off('scroll', onScroll)
    }
  }, [isHome, pathname])

  return { shell, isHome }
}
