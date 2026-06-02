import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ChromaticRipple from '../ui/ChromaticRipple'
import EnteringLoader from '../loading/EnteringLoader'
import { syncSiteHeaderVar } from '../../lib/layout'
import { useEnteringLoad } from '../../lib/useEnteringLoad'
import { getLenis, refreshScroll } from '../../lib/scroll'
import { preloadRobotModel } from '../../lib/robotModel'

export default function Layout() {
  const { pathname } = useLocation()
  const { display, progress, phase, finishExit } = useEnteringLoad(pathname)
  const ready = phase === 'idle'

  useEffect(() => {
    preloadRobotModel()
  }, [])

  useEffect(() => {
    syncSiteHeaderVar()
  }, [pathname])

  useEffect(() => {
    if (!ready) return
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }

    refreshScroll()
    const t = setTimeout(refreshScroll, 400)
    return () => clearTimeout(t)
  }, [pathname, ready])

  return (
    <>
      <EnteringLoader
        display={display}
        progress={progress}
        phase={phase}
        onExitComplete={finishExit}
      />

      <div className={ready ? undefined : 'invisible'} aria-hidden={!ready}>
        <Navbar />
        <ChromaticRipple>
          <main>
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </main>
          <Footer />
        </ChromaticRipple>
      </div>
    </>
  )
}
