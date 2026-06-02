import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ChromaticRipple from '../ui/ChromaticRipple'
import { syncSiteHeaderVar } from '../../lib/layout'
import { getLenis, refreshScroll } from '../../lib/scroll'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    syncSiteHeaderVar()
  }, [pathname])

  useEffect(() => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }

    refreshScroll()
    const t = setTimeout(refreshScroll, 400)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <>
      <Navbar />
      <ChromaticRipple>
        <main>
          <Outlet />
        </main>
        <Footer />
      </ChromaticRipple>
    </>
  )
}
