import { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_URL = '/models/moon_man_yo_oc_humanoid.glb'
useGLTF.preload(MODEL_URL)

/**
 * The character. Walking clip on loop; reports bounding box for camera framing.
 * Recentred to feet-at-y=0 — never scaled, only the camera moves.
 */
export default function RobotModel({ onBounds, facing = 0 }) {
  const outer = useRef(null)
  const inner = useRef(null)
  const { scene, animations } = useGLTF(MODEL_URL)
  const { actions, names } = useAnimations(animations, outer)

  useEffect(() => {
    const clip = names[0]
    if (clip && actions[clip]) {
      actions[clip].reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.4).play()
    }
    scene.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true
        o.receiveShadow = true
        o.frustumCulled = false
        if (o.material) {
          o.material.envMapIntensity = 1.1
          o.material.needsUpdate = true
        }
      }
    })
    return () => {
      if (clip && actions[clip]) actions[clip].fadeOut(0.2)
    }
  }, [actions, names, scene])

  useEffect(() => {
    if (!outer.current || !inner.current) return
    outer.current.position.set(0, 0, 0)
    const box = new THREE.Box3().setFromObject(inner.current)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    outer.current.position.set(-center.x, -box.min.y, -center.z)
    onBounds?.({
      size,
      center: new THREE.Vector3(0, size.y / 2, 0),
      min: new THREE.Vector3(-size.x / 2, 0, -size.z / 2),
      max: new THREE.Vector3(size.x / 2, size.y, size.z / 2),
    })
  }, [onBounds, scene, facing])

  return (
    <group ref={outer}>
      <primitive ref={inner} object={scene} rotation={[0, facing, 0]} />
    </group>
  )
}
