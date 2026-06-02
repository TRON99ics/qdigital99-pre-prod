import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  uniform float uScale;
  varying vec3 vColor;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uScale * (720.0 / max(-mv.z, 80.0));
    gl_PointSize = clamp(gl_PointSize, 2.5, 96.0);
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float core = smoothstep(0.22, 0.0, d);
    float halo = smoothstep(0.5, 0.12, d);
    float alpha = (core * 0.95 + halo * 0.45) * uOpacity;
    if (alpha < 0.03) discard;
    gl_FragColor = vec4(vColor * (0.85 + core * 0.35), alpha);
  }
`

function fillStarSphere(count, rMin, rMax, cx, cy, cz) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const color = new THREE.Color()

  for (let i = 0; i < count; i++) {
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)
    const r = rMin + Math.cbrt(Math.random()) * (rMax - rMin)

    positions[i * 3] = cx + r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = cy + r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = cz + r * Math.cos(phi)

    const tint = 0.78 + Math.random() * 0.22
    color.setRGB(0.78 * tint, 0.86 * tint, 1.0 * tint)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b

    // Wider size range — fewer tiny glitter points
    sizes[i] = 1.4 + Math.random() * 2.8
  }

  return { positions, colors, sizes }
}

/**
 * Large soft stars for deep space — scale-aware, no skybox GLB required.
 */
export default function Starfield({ progressRef, bounds }) {
  const points = useRef(null)
  const { viewport } = useThree()

  const h = bounds.size.y
  const cx = bounds.center.x
  const cy = bounds.center.y
  const cz = bounds.center.z

  const geometry = useMemo(() => {
    const near = fillStarSphere(2200, h * 0.6, h * 1.5, cx, cy, cz)
    const far = fillStarSphere(1200, h * 1.5, h * 2.8, cx, cy, cz)
    const count = 3400
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    positions.set(near.positions, 0)
    positions.set(far.positions, near.positions.length)
    colors.set(near.colors, 0)
    colors.set(far.colors, near.colors.length)
    sizes.set(near.sizes, 0)
    sizes.set(far.sizes, near.sizes.length)

    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    return g
  }, [bounds, cx, cy, cz, h])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uScale: { value: 2.2 },
          uOpacity: { value: 0.85 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        fog: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  )

  useFrame((state, dt) => {
    if (!points.current) return
    const p = progressRef.current
    const target = THREE.MathUtils.lerp(
      0.65,
      1.0,
      THREE.MathUtils.smoothstep(p, 0.05, 0.5),
    )
    material.uniforms.uOpacity.value = THREE.MathUtils.damp(
      material.uniforms.uOpacity.value,
      target,
      4,
      Math.min(dt, 0.05),
    )
    material.uniforms.uScale.value = Math.min(viewport.dpr, 2) * (h / 490) * 2.35
    points.current.rotation.y += dt * 0.012
  })

  return (
    <points
      ref={points}
      geometry={geometry}
      material={material}
      renderOrder={-1}
      frustumCulled={false}
    />
  )
}
