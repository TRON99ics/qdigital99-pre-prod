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

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }

  // Voronoi distance to nearest feature point — the basis for caustic webbing.
  float voronoi(vec2 uv, float t) {
    vec2 n = floor(uv);
    vec2 f = fract(uv);
    float md = 8.0;
    for (int j = -1; j <= 1; j++) {
      for (int i = -1; i <= 1; i++) {
        vec2 g = vec2(float(i), float(j));
        vec2 o = hash2(n + g);
        // Animate each cell point on its own little orbit.
        o = 0.5 + 0.5 * sin(t * 0.9 + 6.2831 * o);
        vec2 r = g + o - f;
        md = min(md, dot(r, r));
      }
    }
    return sqrt(md);
  }

  // Sharp bright network lines from the Voronoi edges.
  float causticLayer(vec2 uv, float t) {
    float d = voronoi(uv, t);
    float line = smoothstep(0.0, 0.35, d) * (1.0 - smoothstep(0.35, 0.95, d));
    return pow(1.0 - line, 3.5);
  }

  void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    float t = uTime;

    // Domain warp for an organic, refracting feel.
    vec2 uv = vUv * 7.0;
    vec2 warp = vec2(
      sin(uv.y * 1.7 + t * 0.6),
      cos(uv.x * 1.9 - t * 0.5)
    ) * 0.35;
    uv += warp;

    // Two octaves at different scales/speeds for depth.
    float c1 = causticLayer(uv, t);
    float c2 = causticLayer(uv * 1.9 + 3.7, t * 1.35);
    float c = c1 * 0.7 + c2 * 0.55;
    c = pow(clamp(c, 0.0, 1.0), 1.4);

    // Chromatic dispersion: sample the layer slightly offset per channel.
    float disp = 0.04 + c * 0.06;
    float r = causticLayer(uv + vec2(disp, 0.0), t);
    float b = causticLayer(uv - vec2(0.0, disp), t);

    vec3 deep = vec3(0.01, 0.06, 0.13);
    vec3 mid = vec3(0.05, 0.42, 0.62);
    vec3 crest = vec3(0.55, 0.95, 1.05);

    vec3 col = mix(deep, mid, clamp(c * 1.6, 0.0, 1.0));
    col = mix(col, crest, pow(c, 2.2));
    // Layer the chromatic split onto the bright filaments.
    col.r += r * 0.18;
    col.b += b * 0.22;

    // Radial pool — concentrate under the figure, fade the hard plane edges.
    float radial = 1.0 - smoothstep(0.25, 1.05, length(p));
    float alpha = c * uOpacity * 0.85 * radial;

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
          uOpacity: { value: 1.0 },
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
    const target = 0.6 + scrollFade * 0.55
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
      <planeGeometry args={[h * 6, h * 6]} />
      <primitive ref={mat} object={material} attach="material" />
    </mesh>
  )
}
