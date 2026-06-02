import { useEffect, useRef } from 'react'
import Odometer from './Odometer'

export default function EnteringLoader({ display, progress, phase, onExitComplete }) {
  const panelRef = useRef(null)
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (phase !== 'exiting' || reduced) {
      if (phase === 'exiting' && reduced) onExitComplete?.()
      return
    }

    const el = panelRef.current
    if (!el) return

    const done = () => onExitComplete?.()
    const onEnd = (e) => {
      if (e.target !== el || e.propertyName !== 'transform') return
      done()
    }
    el.addEventListener('transitionend', onEnd)
    const fallback = window.setTimeout(done, 650)
    return () => {
      el.removeEventListener('transitionend', onEnd)
      clearTimeout(fallback)
    }
  }, [phase, reduced, onExitComplete])

  if (phase === 'idle') return null

  return (
    <div
      className="entering-loader fixed inset-0 z-[200] flex bg-[#05060a]"
      role="status"
      aria-busy={phase === 'loading'}
      aria-label="Loading site"
    >
      <div
        ref={panelRef}
        className={`entering-loader-panel safe-bottom flex w-full flex-col justify-end px-6 pb-8 md:px-10 md:pb-10 ${
          phase === 'exiting' && !reduced ? 'entering-loader-panel--exit' : ''
        }`}
      >
        <div className="eyebrow mb-4 text-white/45">Entering</div>

        <div className="flex flex-wrap items-end gap-5 md:gap-6">
          <Odometer value={display} roll={!reduced && phase === 'loading'} />

          <div className="entering-bar mb-1" aria-hidden="true">
            <div
              className="entering-bar-fill"
              style={{ transform: `scaleX(${Math.min(1, Math.max(0, progress))})` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
