import { useEffect, useRef, useState } from 'react'
import LeadMagnetModal from './LeadMagnetModal'

const SESSION_KEY = 'qdigital99_lead_magnet_shown'
const DELAY_MS = 23000

export default function LeadMagnetHost({ enabled = true }) {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!enabled) {
      if (timerRef.current) clearTimeout(timerRef.current)
      return undefined
    }

    const schedule = (delay) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        if (sessionStorage.getItem(SESSION_KEY)) return
        if (document.querySelector('[data-modal-open="true"]')) return
        setVisible(true)
        sessionStorage.setItem(SESSION_KEY, '1')
      }, delay)
    }

    schedule(DELAY_MS)

    const onLeave = (e) => {
      if (e.clientY > 0) return
      if (sessionStorage.getItem(SESSION_KEY)) return
      sessionStorage.setItem(SESSION_KEY, '1')
      setVisible(true)
    }

    document.addEventListener('mouseleave', onLeave)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled])

  if (!visible) return null
  return <LeadMagnetModal onClose={() => setVisible(false)} />
}
