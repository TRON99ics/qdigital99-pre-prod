import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

const RIPPLE_DEBOUNCE_MS = 400
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  readMutedPreference,
  NAV_RIPPLE_SRC,
  SITE_AUDIO_SRC,
  writeMutedPreference,
} from '../../lib/siteAudio'

const BAR_COUNT = 7

const SiteAudioContext = createContext(null)

export function useSiteAudio() {
  return useContext(SiteAudioContext)
}

/**
 * Background lofi. Native HTMLAudioElement playback (no Web Audio) for maximum
 * cross-device reliability — iOS Safari, Android Chrome, desktop. Starts on the
 * first user interaction anywhere; toggle mutes/plays. Wave is pure CSS.
 */
export function SiteAudioProvider({ active, children }) {
  const audioRef = useRef(null)
  const rippleRef = useRef(null)
  const mutedRef = useRef(readMutedPreference())
  const unlockedRef = useRef(false)
  const detachInteractRef = useRef(() => {})

  const [unlocked, setUnlocked] = useState(false)
  const [muted, setMuted] = useState(() => readMutedPreference())
  const [playing, setPlaying] = useState(false)

  const syncMuted = useCallback((next) => {
    mutedRef.current = next
    setMuted(next)
    writeMutedPreference(next)
    const audio = audioRef.current
    if (audio) audio.muted = next
  }, [])

  // Must run synchronously inside a user gesture — no awaits before play().
  const play = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return Promise.reject(new Error('no audio element'))
    audio.muted = false
    const p = audio.play()
    if (p && typeof p.then === 'function') {
      return p.then(() => setPlaying(true)).catch((err) => {
        setPlaying(false)
        throw err
      })
    }
    setPlaying(true)
    return Promise.resolve()
  }, [])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setPlaying(false)
  }, [])

  const markUnlocked = useCallback(() => {
    if (unlockedRef.current) return
    unlockedRef.current = true
    setUnlocked(true)
  }, [])

  const playNavRipple = useCallback(() => {
    const ripple = rippleRef.current
    if (!ripple) return
    ripple.currentTime = 0
    ripple.play().catch(() => {})
  }, [])

  const toggleMute = useCallback(() => {
    markUnlocked()
    detachInteractRef.current()
    if (mutedRef.current) {
      syncMuted(false)
      play().catch(() => {})
    } else {
      syncMuted(true)
      pause()
    }
  }, [markUnlocked, syncMuted, play, pause])

  // Initial element config + play/pause state sync.
  useEffect(() => {
    const audio = audioRef.current
    const ripple = rippleRef.current
    if (!audio) return

    audio.volume = 0.42
    audio.muted = mutedRef.current
    if (ripple) ripple.volume = 0.55

    const onPlay = () => setPlaying(!audio.muted)
    const onPause = () => setPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.pause()
    }
  }, [])

  // First interaction anywhere on the site → start playing. Retries on each
  // gesture until the browser actually allows playback, then detaches.
  useEffect(() => {
    if (!active) return undefined

    const events = ['pointerdown', 'touchstart', 'mousedown', 'click', 'keydown']
    const detach = () => {
      events.forEach((evt) =>
        document.removeEventListener(evt, onInteract, { capture: true }),
      )
    }

    const onInteract = (e) => {
      if (e.target?.closest?.('[data-audio-toggle]')) {
        detach()
        return
      }
      // Menu chrome must not unlock / start background audio (capture runs before onClick).
      if (e.target?.closest?.('[data-nav-menu-toggle]')) return
      // Nav uses ripple SFX only — never start or restart lofi from nav clicks.
      if (e.target?.closest?.('[data-nav-link]')) return
      if (unlockedRef.current && !mutedRef.current) {
        const audio = audioRef.current
        if (audio && !audio.paused) return
      }

      markUnlocked()
      syncMuted(false)
      play()
        .then(detach)
        .catch(() => {
          /* playback blocked — keep listening for the next gesture */
        })
    }

    detachInteractRef.current = detach
    events.forEach((evt) =>
      document.addEventListener(evt, onInteract, { capture: true, passive: true }),
    )
    return detach
  }, [active, markUnlocked, syncMuted, play])

  // Pause in background tabs; resume when visible (if not muted).
  useEffect(() => {
    const onVis = () => {
      if (!unlockedRef.current) return
      if (document.hidden) pause()
      else if (!mutedRef.current) play().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [pause, play])

  const live = playing && !muted
  const value = { unlocked, muted, playing: live, toggleMute, playNavRipple }

  return (
    <SiteAudioContext.Provider value={value}>
      <audio
        ref={audioRef}
        src={SITE_AUDIO_SRC}
        loop
        preload="auto"
        playsInline
        className="sr-only"
        aria-hidden="true"
      />
      <audio
        ref={rippleRef}
        src={NAV_RIPPLE_SRC}
        preload="auto"
        playsInline
        className="sr-only"
        aria-hidden="true"
      />
      {children}
    </SiteAudioContext.Provider>
  )
}

/** Nav link — plays ripple SFX when navigating to a new route (music on or muted). */
export function NavRippleLink({ to, className, children, onClick, onPointerDown, ...rest }) {
  const ctx = useSiteAudio()
  const { pathname } = useLocation()
  const navigating = pathname !== to
  const lastRippleAt = useRef(0)

  const tryRipple = () => {
    if (!navigating || !ctx?.playNavRipple) return
    const now = performance.now()
    if (now - lastRippleAt.current < RIPPLE_DEBOUNCE_MS) return
    lastRippleAt.current = now
    ctx.playNavRipple()
  }

  return (
    <Link
      to={to}
      data-nav-link
      className={className}
      onPointerDownCapture={(e) => {
        tryRipple()
        onPointerDown?.(e)
      }}
      onClick={(e) => {
        tryRipple()
        onClick?.(e)
      }}
      {...rest}
    >
      {children}
    </Link>
  )
}

function AudioWave({ live, dimmed }) {
  return (
    <span
      className={`audio-wave ${live ? 'audio-wave--live' : ''} ${dimmed ? 'audio-wave--muted' : ''}`}
      aria-hidden="true"
    >
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <span key={i} className="audio-wave-bar" />
      ))}
    </span>
  )
}

export function NavAudioToggle({ className = '' }) {
  const ctx = useSiteAudio()
  if (!ctx) return null

  const { muted, playing, toggleMute, unlocked } = ctx
  const live = playing && !muted
  const label = live ? 'Mute music' : 'Play music'

  return (
    <motion.button
      type="button"
      data-audio-toggle
      onClick={(e) => {
        e.stopPropagation()
        toggleMute()
      }}
      aria-label={label}
      aria-pressed={live}
      whileTap={{ scale: 0.9 }}
      animate={{
        boxShadow: live
          ? '0 0 18px rgba(255, 255, 255, 0.45), 0 0 38px rgba(255, 255, 255, 0.2)'
          : '0 0 0 rgba(255, 255, 255, 0)',
      }}
      transition={{ duration: 0.35 }}
      className={`audio-toggle relative z-10 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors md:h-11 md:w-11 ${className}`}
    >
      <span
        className={`audio-toggle-ring pointer-events-none absolute inset-0 rounded-full ${
          live ? 'bg-white/10' : 'bg-white/5'
        }`}
        aria-hidden
      />
      <AudioWave live={live} dimmed={!live} />
    </motion.button>
  )
}
