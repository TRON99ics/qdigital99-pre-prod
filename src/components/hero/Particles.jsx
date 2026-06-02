import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Atmospheric dust column around the model. Fades in across the reveal shots.
 */
export default function Particles({ progressRef, bounds, count = 320 }) {
  const ref = useRef(null)

  const positions = useMemo(() => {
    const h = bounds.size.y
    const r = Math.max(bounds.size.x, bounds.size.z) * 1.4 || h * 0.6
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2
      const rad = Math.pow(Math.random(), 0.6) * r
      arr[i * 3] = bounds.center.x + Math.cos(a) * rad
      arr[i * 3 + 1] = bounds.min.y + Math.random() * h * 1.15
      arr[i * 3 + 2] = bounds.center.z + Math.sin(a) * rad
    }
    return arr
  }, [bounds, count])

  useFrame((_, dt) => {
    if (!ref.current) return
    const p = progressRef.current
    const targetOpacity = THREE.MathUtils.smoothstep(p, 0.32, 0.82) * 0.85
    ref.current.material.opacity = THREE.MathUtils.damp(
      ref.current.material.opacity,
      targetOpacity,
      4,
      Math.min(dt, 0.05),
    )
    ref.current.rotation.y += dt * 0.04
  })

  return (
    <points ref={ref} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={bounds.size.y * 0.006}
        sizeAttenuation
        color="#acc2ff"
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
