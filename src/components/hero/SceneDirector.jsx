import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { sampleCamera } from './cameraPath'

const damp = (current, target, lambda, dt) =>
  THREE.MathUtils.damp(current, target, lambda, dt)

/**
 * Camera, lighting, and scroll-driven fog for the interstellar hero.
 */
export default function SceneDirector({ progressRef, bounds }) {
  const { camera, gl, scene } = useThree()
  const target = useRef({ pos: new THREE.Vector3(), look: new THREE.Vector3() })
  const curLook = useRef(new THREE.Vector3())
  const keyLight = useRef(null)
  const rimLight = useRef(null)
  const fillLight = useRef(null)
  const ambient = useRef(null)
  const inited = useRef(false)

  useEffect(() => {
    if (!bounds) return
    const h = bounds.size.y
    camera.near = h * 0.002
    camera.far = h * 12
    camera.updateProjectionMatrix()
    inited.current = false
  }, [bounds, camera])

  useFrame((_, delta) => {
    if (!bounds) return
    const h = bounds.size.y
    const p = progressRef.current
    const dt = Math.min(delta, 0.05)

    sampleCamera(p, bounds, target.current)

    if (!inited.current) {
      camera.position.copy(target.current.pos)
      curLook.current.copy(target.current.look)
      inited.current = true
    } else {
      camera.position.x = damp(camera.position.x, target.current.pos.x, 4, dt)
      camera.position.y = damp(camera.position.y, target.current.pos.y, 4, dt)
      camera.position.z = damp(camera.position.z, target.current.pos.z, 4, dt)
      curLook.current.x = damp(curLook.current.x, target.current.look.x, 5, dt)
      curLook.current.y = damp(curLook.current.y, target.current.look.y, 5, dt)
      curLook.current.z = damp(curLook.current.z, target.current.look.z, 5, dt)
    }
    camera.lookAt(curLook.current)

    const expose = THREE.MathUtils.smoothstep(p, 0.08, 0.62)
    const dive = THREE.MathUtils.smoothstep(p, 0.82, 1.0)
    gl.toneMappingExposure = 0.85 + expose * 0.7
    if (ambient.current) ambient.current.intensity = 0.25 + expose * 0.55
    if (keyLight.current) keyLight.current.intensity = 1.0 + expose * 2.2
    if (rimLight.current) rimLight.current.intensity = 2.2 + expose * 3.2
    if (fillLight.current) fillLight.current.intensity = 0.6 + expose * 1.2

    if (scene.fog) {
      scene.fog.density = ((1.5 - expose * 1.05) + dive * 2.4) / h
    }
  })

  if (!bounds) return null
  const h = bounds.size.y
  const top = bounds.max.y

  return (
    <>
      <hemisphereLight args={['#8a9ec8', '#0a0c14', 0.35]} />
      <ambientLight ref={ambient} intensity={0.25} />
      <directionalLight
        ref={keyLight}
        position={[h * 0.4, top + h * 0.3, h * 0.9]}
        intensity={1.0}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0002}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-h, h, h * 1.4, -h * 0.2, 0.1, h * 5]}
        />
      </directionalLight>
      <directionalLight
        ref={rimLight}
        position={[-h * 0.7, top + h * 0.2, -h * 0.8]}
        intensity={2.2}
        color="#1347ff"
      />
      <directionalLight ref={fillLight} position={[0, top * 0.5, h * 1.2]} intensity={0.6} color="#cfe0ff" />
      <pointLight position={[0, top + h * 0.2, h * 0.4]} intensity={h * 0.4} distance={h * 6} color="#cfe0ff" />
    </>
  )
}
