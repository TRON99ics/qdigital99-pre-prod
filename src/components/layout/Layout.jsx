import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Cursor from '../ui/Cursor'
import { getLenis, refreshScroll } from '../../lib/scroll'

export default function Layout() {
  const { pathname } = useLocation()

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
      <Cursor />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
