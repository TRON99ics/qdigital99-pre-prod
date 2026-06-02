import { Suspense, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, MeshReflectorMaterial, Loader } from '@react-three/drei'
import * as THREE from 'three'
import RobotModel from './RobotModel'
import SceneDirector from './SceneDirector'
import Particles from './Particles'

const SPACE = '#05060a'

function Floor({ bounds }) {
  const h = bounds.size.y
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[bounds.center.x, bounds.min.y, bounds.center.z]}
      receiveShadow
    >
      <planeGeometry args={[h * 8, h * 8]} />
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
    </mesh>
  )
}

export default function HeroScene({ progressRef }) {
  const [bounds, setBounds] = useState(null)
  const onBounds = useCallback((b) => setBounds(b), [])

  return (
    <>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.9 }}
        camera={{ fov: 40, near: 0.01, far: 8000, position: [0, 100, 260] }}
      >
        <color attach="background" args={[SPACE]} />
        <fogExp2 attach="fog" args={[SPACE, 0.0006]} />

        <Suspense fallback={null}>
          <RobotModel onBounds={onBounds} facing={0} />
          {bounds && (
            <>
              <Floor bounds={bounds} />
              <ContactShadows
                position={[0, 0.5, 0]}
                scale={bounds.size.y * 2.2}
                blur={2.4}
                opacity={0.65}
                far={bounds.size.y * 0.6}
              />
              <Particles progressRef={progressRef} bounds={bounds} />
            </>
          )}
        </Suspense>

        <SceneDirector progressRef={progressRef} bounds={bounds} />
      </Canvas>
      <Loader
        containerStyles={{ background: SPACE }}
        barStyles={{ background: '#1347ff', height: '2px' }}
        dataStyles={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', letterSpacing: '0.18em' }}
        dataInterpolation={(p) => `ENTERING ${p.toFixed(0)}%`}
      />
    </>
  )
}
