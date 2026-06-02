import { useEffect, useRef } from 'react'

const CAUSTIC_SCALE = 0.32

/**
 * Animated aqua caustics + drifting color blooms over the hero (DOM layer).
 */
export default function HeroAqua() {
  const canvasRef = useRef(null)
  const raf = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * CAUSTIC_SCALE * dpr))
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * CAUSTIC_SCALE * dpr))
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = (t) => {
      if (reduced) return
      const w = canvas.width
      const h = canvas.height
      const imageData = ctx.createImageData(w, h)
      const data = imageData.data
      const time = t * 0.0004

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const u = x / w
          const v = y / h
          const n1 = Math.sin(u * 14 + time * 4) * Math.sin(v * 11 + time * 3.2)
          const n2 = Math.sin(u * 22 - time * 2.5) * Math.sin(v * 19 + time * 2.8)
          const c = Math.pow(Math.max(0, n1 * 0.55 + n2 * 0.45), 2.4)
          const edge = Math.min(u * 1.8, (1 - u) * 1.8, v * 1.4, (1 - v) * 1.4)
          const a = c * edge * 0.28

          const i = (y * w + x) * 4
          data[i] = 30 + c * 80
          data[i + 1] = 160 + c * 95
          data[i + 2] = 220 + c * 35
          data[i + 3] = a * 255
        }
      }
      ctx.putImageData(imageData, 0, 0)
    }

    const loop = (t) => {
      draw(t)
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="hero-aqua pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden>
      <div className="hero-aqua__blob hero-aqua__blob--1" />
      <div className="hero-aqua__blob hero-aqua__blob--2" />
      <div className="hero-aqua__blob hero-aqua__blob--3" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full mix-blend-screen opacity-70"
        style={{ imageRendering: 'auto' }}
      />
    </div>
  )
}
