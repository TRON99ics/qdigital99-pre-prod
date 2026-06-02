import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, site } from '../../data/site'
import Button from '../ui/Button'
import { getLenis } from '../../lib/scroll'

export default function Navbar() {
  const [onLight, setOnLight] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const update = () => {
      const y = getLenis()?.scroll ?? window.scrollY
      setOnLight(y > window.innerHeight * 0.85)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    const lenis = getLenis()
    lenis?.on('scroll', update)
    return () => {
      window.removeEventListener('scroll', update)
      lenis?.off('scroll', update)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const light = onLight || open

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <nav className="pointer-events-auto mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <Link
          to="/"
          className={`relative z-10 flex items-center gap-2 text-lg font-semibold tracking-tight transition-colors duration-300 ${
            light ? 'text-ink' : 'text-white mix-blend-difference'
          }`}
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-blue text-sm text-white">Q</span>
          {site.name}
        </Link>

        <div
          className={`hidden items-center gap-1 rounded-full border px-2 py-2 backdrop-blur-md transition-colors duration-300 md:flex ${
            light
              ? 'border-ink/8 bg-ink/92 shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
              : 'border-white/15 bg-black/25'
          }`}
        >
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                location.pathname === item.to
                  ? 'bg-white text-ink'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button to="/contact" variant={light ? 'dark' : 'light'} size="md">
            Start a project
          </Button>
        </div>

        <button
          type="button"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className={`relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden ${
            light ? 'text-ink' : 'text-white'
          }`}
        >
          <span
            className={`h-0.5 w-6 bg-current transition-transform duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span className={`h-0.5 w-6 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span
            className={`h-0.5 w-6 bg-current transition-transform duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto fixed inset-0 z-50 flex flex-col justify-center gap-2 bg-ink px-8 md:hidden"
          >
            {[...nav, { label: 'Contact', to: '/contact' }].map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.1 }}
              >
                <Link to={item.to} className="display block py-1 text-white">
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
