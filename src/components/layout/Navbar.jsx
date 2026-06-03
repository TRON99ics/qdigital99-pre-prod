import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, site } from '../../data/site'
import { useNavShell } from '../../lib/useNavShell'
import { syncSiteHeaderVar } from '../../lib/layout'
import { getLenis } from '../../lib/scroll'
import Button from '../ui/Button'
import { NavAudioToggle, NavRippleLink } from '../audio/SiteAudio'

const shellEase = [0.16, 1, 0.3, 1]

export default function Navbar() {
  const { shell } = useNavShell()
  const [open, setOpen] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    const sync = () => syncSiteHeaderVar()
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [shell, location.pathname])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const lenis = getLenis()
    lenis?.stop()
    document.documentElement.classList.add('overflow-hidden')
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      document.documentElement.classList.remove('overflow-hidden')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const linkActive = shell ? 'bg-white text-ink' : 'bg-white/15 text-white'
  const linkIdle = shell
    ? 'text-white/80 hover:bg-white/10 hover:text-white'
    : 'text-white/75 hover:text-white'

  return (
    <header data-site-header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <nav className="safe-top pointer-events-auto relative z-[60] mx-auto max-w-[1600px] px-6 pb-5 md:px-10">
        <div className="relative flex items-center justify-between gap-3 rounded-full px-2 py-2 md:gap-4 md:px-3 md:py-2.5">
          <motion.div
            aria-hidden
            className="nav-shell-bg pointer-events-none absolute inset-0 rounded-full"
            initial={false}
            animate={{
              scaleX: shell ? 1 : 0,
              opacity: shell ? 1 : 0,
            }}
            transition={{
              duration: reducedMotion ? 0 : 0.55,
              ease: shellEase,
            }}
            style={{ transformOrigin: 'center center' }}
          />

          <NavRippleLink
            to="/"
            className="relative z-10 flex min-w-0 items-center gap-2 rounded-full px-2 py-1.5 text-base font-semibold tracking-tight text-white md:text-lg"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-blue text-sm text-white">
              Q
            </span>
            <span className="truncate">{site.name}</span>
          </NavRippleLink>

          <div className="relative z-10 hidden items-center gap-0.5 md:flex">
            {nav.map((item) => (
              <NavRippleLink
                key={item.to}
                to={item.to}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  location.pathname === item.to ? linkActive : linkIdle
                }`}
              >
                {item.label}
              </NavRippleLink>
            ))}
          </div>

          <div className="relative z-10 flex items-center gap-2 md:gap-3">
            <NavAudioToggle />
            <div className="hidden md:block">
              <Button to="/contact" variant="primary" size="md">
                Start a project
              </Button>
            </div>
          </div>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-10 flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 text-white md:hidden"
          >
            <span
              className={`h-0.5 w-6 bg-current transition-transform duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span className={`h-0.5 w-6 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span
              className={`h-0.5 w-6 bg-current transition-transform duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: shellEase }}
            className="nav-menu-overlay pointer-events-auto fixed inset-x-0 bottom-0 z-40 flex flex-col justify-center gap-2 bg-ink px-8 md:hidden"
            style={{ top: 'var(--site-header)' }}
          >
            {[...nav, { label: 'Contact', to: '/contact' }].map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.1 }}
              >
                <NavRippleLink
                  to={item.to}
                  className="block py-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
                >
                  {item.label}
                </NavRippleLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
