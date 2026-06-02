import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  varying vec2 vUv;

  float caustic(vec2 uv, float t) {
    float w = 0.0;
    w += sin(uv.x * 18.0 + t * 1.4) * sin(uv.y * 14.0 + t * 1.1);
    w += sin(uv.x * 28.0 - t * 1.8) * sin(uv.y * 22.0 + t * 1.3) * 0.55;
    w += sin((uv.x + uv.y) * 24.0 + t * 0.9) * 0.35;
    return pow(max(w * 0.5 + 0.5, 0.0), 2.8);
  }

  void main() {
    vec2 uv = vUv * 6.0;
    float t = uTime;
    float c = caustic(uv, t) + caustic(uv * 1.3 + 2.1, t * 0.85) * 0.6;
    vec3 aqua = mix(vec3(0.02, 0.12, 0.18), vec3(0.15, 0.75, 0.95), c);
    vec3 deep = vec3(0.05, 0.22, 0.55);
    vec3 col = mix(deep, aqua, c);
    float alpha = c * uOpacity * 0.55;
    gl_FragColor = vec4(col, alpha);
  }
`

/**
 * Animated aqua caustics on the floor plane — rippling under the robot.
 */
export default function AquaCaustics({ bounds, progressRef }) {
  const mat = useRef(null)
  const h = bounds.size.y

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: 0.85 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  )

  useFrame((state, dt) => {
    if (!mat.current) return
    mat.current.uniforms.uTime.value = state.clock.elapsedTime
    const p = progressRef.current
    const scrollFade = 1 - THREE.MathUtils.smoothstep(p, 0.82, 0.98)
    const target = 0.5 + scrollFade * 0.5
    mat.current.uniforms.uOpacity.value = THREE.MathUtils.damp(
      mat.current.uniforms.uOpacity.value,
      target,
      4,
      Math.min(dt, 0.05),
    )
  })

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[bounds.center.x, bounds.min.y + h * 0.003, bounds.center.z]}
      renderOrder={2}
    >
      <planeGeometry args={[h * 8, h * 8]} />
      <primitive ref={mat} object={material} attach="material" />
    </mesh>
  )
}
