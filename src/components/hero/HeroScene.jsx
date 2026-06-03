import { Suspense, useState, useCallback, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, MeshReflectorMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { isAndroidDevice } from '../../lib/scroll'
import RobotModel from './RobotModel'
import SceneDirector from './SceneDirector'
import Starfield from './Starfield'
import AquaCaustics from './AquaCaustics'

const SPACE = '#05060a'

/** Standard mobile hero framing — smaller subject, more breathing room for copy. */
const MOBILE_HERO = {
  robotScale: 0.68,
  fov: 48,
}

function Floor({ bounds, lite }) {
  const h = bounds.size.y
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[bounds.center.x, bounds.min.y, bounds.center.z]}
      receiveShadow={!lite}
    >
      <planeGeometry args={[h * 8, h * 8]} />
      {lite ? (
        <meshStandardMaterial color="#06070c" roughness={0.92} metalness={0.08} />
      ) : (
        <MeshReflectorMaterial
          resolution={512}
          mixBlur={1}
          mixStrength={2.2}
          blur={[600, 120]}
          roughness={0.85}
          depthScale={0.8}
          minDepthThreshold={0.3}
          maxDepthThreshold={1.2}
          color="#06070c"
          metalness={0.5}
        />
      )}
    </mesh>
  )
}

function useIsMobile() {
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const onChange = () => setMobile(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return mobile
}

export default function HeroScene({ progressRef }) {
  const [bounds, setBounds] = useState(null)
  const onBounds = useCallback((b) => setBounds(b), [])
  const isMobile = useIsMobile()
  const android = isAndroidDevice()
  const liteGpu = android

  return (
    <>
      <Canvas
        shadows={!isMobile && !android}
        dpr={android ? [1, 1.1] : isMobile ? [1, 1.25] : [1, 2]}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.9 }}
        camera={{
          fov: isMobile ? MOBILE_HERO.fov : 44,
          near: 0.01,
          far: 8000,
          position: [0, 100, 260],
        }}
      >
        <color attach="background" args={[SPACE]} />
        <fogExp2 attach="fog" args={[SPACE, 0.00012]} />

        <Suspense fallback={null}>
          {bounds && <Starfield progressRef={progressRef} bounds={bounds} />}
          <RobotModel
            onBounds={onBounds}
            facing={Math.PI}
            scale={isMobile ? MOBILE_HERO.robotScale : 1}
          />
          {bounds && (
            <>
              <Floor bounds={bounds} lite={liteGpu} />
              {!liteGpu && <AquaCaustics bounds={bounds} progressRef={progressRef} />}
              <ContactShadows
                position={[bounds.center.x, bounds.min.y + 0.001, bounds.center.z]}
                scale={bounds.size.y * 2.2}
                blur={isMobile ? 1.8 : 2.4}
                opacity={0.65}
                far={bounds.size.y * 0.6}
                resolution={isMobile ? 512 : 1024}
              />
            </>
          )}
        </Suspense>

        <SceneDirector progressRef={progressRef} bounds={bounds} mobile={isMobile || android} />
      </Canvas>
    </>
  )
}
