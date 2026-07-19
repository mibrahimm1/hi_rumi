import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Trail, Sparkles, useGLTF, MeshTransmissionMaterial, Environment, Center, CameraShake } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import ParticleField from './Letter/ParticleField'
import { swipeState, useBigBang } from '../sharedState'

export const USE_SPLINE_MODELS = false

const CAMERA_TARGETS = [
  new THREE.Vector3(0, 0, 7),           // Act 0: Letter
  new THREE.Vector3(4.5, 1.2, 5.5),     // Act 1: Constellation
  new THREE.Vector3(0, 3.5, 7),         // Act 2: Memory Orbit
  new THREE.Vector3(-4.5, 0.8, 5.5),    // Act 3: Cosmic Vinyl
  new THREE.Vector3(2.5, -2.0, 6.0),    // Act 4: Supernova
  new THREE.Vector3(0, -4.0, 6.5),      // Act 5: Finale Heart
]

export default function Experience({ currentScene, phase }) {
  return (
    <>
      <CameraController currentScene={currentScene} />
      <ambientLight intensity={0.08} />
      <fog attach="fog" args={['#050010', 40, 110]} />
      <DeepStarField />
      <NebulaField />
      {phase === 'enter' && <CakeScene3D />}
      {phase === 'experience' && <SceneElements currentScene={currentScene} />}
      <EffectComposer>
        <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} intensity={1.8} />
        <Vignette darkness={0.55} offset={0.3} />
      </EffectComposer>
    </>
  )
}

function CameraController({ currentScene }) {
  const target = CAMERA_TARGETS[currentScene] || CAMERA_TARGETS[0]
  const lookAt = useMemo(() => new THREE.Vector3(0, 0, 0), [])
  const phase = useBigBang()

  useFrame((state, delta) => {
    const lerpFactor = 1 - Math.pow(0.04, delta)
    state.camera.position.lerp(target, lerpFactor)
    
    // Smooth lookAt transition based on target
    const currentLookAt = new THREE.Vector3(0, 0, 0)
    // Add slight offset for specific scenes to center them better
    if (currentScene === 1) currentLookAt.set(4.5, 1.2, 1.5)
    else if (currentScene === 2) currentLookAt.set(0, 3.5, 2)
    else if (currentScene === 3) currentLookAt.set(-4.5, 0.8, 1.5)
    else if (currentScene === 4) currentLookAt.set(2.5, -2.0, 2.0)
    else if (currentScene === 5) currentLookAt.set(0, -4.0, 2.5)

    lookAt.lerp(currentLookAt, lerpFactor)

    const finalLookAt = lookAt.clone()
    if (currentScene === 4 && phase > 0 && phase < 3) {
       // Shake gets more intense in phase 2
       const intensity = phase === 1 ? 0.05 : 0.3
       const speed = phase === 1 ? 25 : 45
       finalLookAt.x += (Math.random() - 0.5) * intensity
       finalLookAt.y += (Math.random() - 0.5) * intensity
       finalLookAt.z += (Math.random() - 0.5) * intensity
    } else if (currentScene === 4 && phase === 3) {
       // Subtle aftershock
       const intensity = 0.02
       finalLookAt.x += Math.sin(state.clock.elapsedTime * 10) * intensity
       finalLookAt.y += Math.cos(state.clock.elapsedTime * 11) * intensity
    }

    state.camera.lookAt(finalLookAt)
  })

  return null
}

function DeepStarField() {
  const groupRef = useRef()
  const count = 4000

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const siz = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const radius = 12 + Math.random() * 88
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)

      const warmth = Math.random()
      if (warmth > 0.88) {
        col[i * 3] = 1; col[i * 3 + 1] = 0.78; col[i * 3 + 2] = 0.7
      } else if (warmth > 0.75) {
        col[i * 3] = 0.7; col[i * 3 + 1] = 0.78; col[i * 3 + 2] = 1
      } else if (warmth > 0.65) {
        col[i * 3] = 0.95; col[i * 3 + 1] = 0.85; col[i * 3 + 2] = 0.95
      } else {
        col[i * 3] = 1; col[i * 3 + 1] = 1; col[i * 3 + 2] = 1
      }

      siz[i] = (1 - (radius - 12) / 88) * 2.5 + 0.3
    }
    return [pos, col, siz]
  }, [])

  const panY = useRef(0)
  useFrame((state, delta) => {
    if (groupRef.current) {
      panY.current += (swipeState.targetPanY - panY.current) * delta * 2.5
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.004 + panY.current + (swipeState.rotationY * 0.1)
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.001
    }
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.18}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

function NebulaField() {
  const groupRef = useRef()
  const panY = useRef(0)
  useFrame((state, delta) => {
    if (groupRef.current) {
      panY.current += (swipeState.targetPanY - panY.current) * delta * 2.5
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.002 + panY.current + (swipeState.rotationY * 0.05)
    }
  })
  return (
    <group ref={groupRef}>
      <NebulaCloud position={[-15, 5, -25]} color="#ff6b9d" scale={6} />
      <NebulaCloud position={[18, -3, -30]} color="#c44dff" scale={7} />
      <NebulaCloud position={[0, -8, -20]} color="#4d8bff" scale={5} />
      <NebulaCloud position={[-10, 10, -35]} color="#f8b4c8" scale={4} />
      <NebulaCloud position={[12, 8, -40]} color="#b8e6d4" scale={5.5} />
    </group>
  )
}

function NebulaCloud({ position, color, scale = 3 }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.006
      ref.current.rotation.z = state.clock.elapsedTime * 0.004
    }
  })
  return (
    <group ref={ref} position={position}>
      <mesh scale={scale}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <MeshDistortMaterial
          color={color} emissive={color} emissiveIntensity={0.12}
          transparent opacity={0.055} distort={0.5} speed={0.6}
          roughness={1} depthWrite={false}
        />
      </mesh>
      <mesh scale={scale * 0.6} position={[scale * 0.3, 0, 0]}>
        <sphereGeometry args={[1, 24, 24]} />
        <MeshDistortMaterial
          color={color} emissive={color} emissiveIntensity={0.08}
          transparent opacity={0.035} distort={0.6} speed={0.9}
          roughness={1} depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function SceneElements({ currentScene }) {
  return (
    <>
      {currentScene === 0 && <LetterScene3D />}
      {currentScene === 1 && <CosmicJourneyScene3D position={[4.5, 0, 1.5]} />}
      {currentScene === 2 && <MemoryOrbitScene3D />}
      {currentScene === 3 && <CosmicVinylScene3D />}
      {currentScene === 4 && <SupernovaScene3D />}
      {currentScene === 5 && <FinaleScene3D />}
    </>
  )
}

function LetterScene3D() {
  const candleRef = useRef()

  useFrame((state) => {
    if (candleRef.current) {
      const t = state.clock.elapsedTime
      candleRef.current.intensity =
        1.8 + Math.sin(t * 7.3) * 0.4 + Math.sin(t * 13.1) * 0.2 + Math.sin(t * 3.7) * 0.3
    }
  })

  return (
    <group>
      <pointLight ref={candleRef} position={[0, -1, 4]} color="#ffb347" intensity={1.8} distance={12} />
      <pointLight position={[0, 2.5, 3]} color="#f5e6a3" intensity={0.65} distance={10} />
      <Float speed={2} floatIntensity={0.12}>
        <mesh position={[0, -1.9, 1.8]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#8b2252" emissive="#8b2252" emissiveIntensity={3.2} />
        </mesh>
      </Float>
      <ParticleField />
    </group>
  )
}

function ConstellationScene3D() {
  return (
    <group>
      <pointLight position={[4.5, 1.2, 4]} color="#f5e6a3" intensity={1.5} distance={12} />
      <pointLight position={[0, 3, 2]} color="#c8a2c8" intensity={1} distance={10} />
      <ConstellationRUMI position={[4.5, 1.2, 1.5]} />
      <ShootingStar3D startPos={[10, 5, -2]} />
      <ShootingStar3D startPos={[8, 2, -4]} />
      <Sparkles count={50} size={2} scale={10} position={[4.5, 1.2, 1.5]} color="#f5e6a3" speed={0.2} opacity={0.5} />
    </group>
  )
}

function CosmicJourneyScene3D({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <ShootingStar3D startPos={[10, 5, -5]} />
      <ShootingStar3D startPos={[8, -2, -8]} />
      <ShootingStar3D startPos={[12, 4, -10]} />
      <ShootingStar3D startPos={[6, 7, -12]} />
      <Sparkles count={200} size={2.5} scale={20} color="#f5e6a3" speed={0.4} opacity={0.6} />
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 2]} color="#ffb347" intensity={2} distance={10} />
    </group>
  )
}

function ConstellationRUMI({ position = [0, 0, 0] }) {
  const group = useRef()
  const [hovered, setHovered] = useState(false)
  const targetScale = hovered ? 1.1 : 1
  
  const stars = useMemo(() => {
    const s = 0.35, sp = 1.6
    const R = [[-0.3, 0.5], [-0.3, 0.2], [-0.3, -0.1], [-0.3, -0.4], [0, 0.5], [0.2, 0.3], [0, 0.05], [0.2, -0.2], [0.3, -0.4]].map(([x, y]) => [x * s - sp * 1.5, y * s, 0])
    const U = [[-0.3, 0.5], [-0.3, 0.1], [-0.3, -0.2], [-0.1, -0.4], [0.1, -0.4], [0.3, -0.2], [0.3, 0.1], [0.3, 0.5]].map(([x, y]) => [x * s - sp * 0.5, y * s, 0])
    const M = [[-0.3, -0.4], [-0.3, 0], [-0.3, 0.4], [-0.1, 0.1], [0, -0.1], [0.1, 0.1], [0.3, 0.4], [0.3, 0], [0.3, -0.4]].map(([x, y]) => [x * s + sp * 0.5, y * s, 0])
    const I = [[0, 0.5], [0, 0.15], [0, -0.15], [0, -0.4]].map(([x, y]) => [x * s + sp * 1.5, y * s, 0])
    return [...R, ...U, ...M, ...I]
  }, [])

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
      group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group ref={group} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {stars.map((pos, i) => (
        <group key={i}>
          <mesh position={pos}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshBasicMaterial color={hovered ? "#ffb347" : "#f5e6a3"} />
          </mesh>
          <mesh position={pos}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial color={hovered ? "#ffb347" : "#f5e6a3"} transparent opacity={0.15} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function MemoryOrbitScene3D() {
  return (
    <group position={[0, 3.5, 2]}>
      <pointLight position={[0, 0, 4]} color="#f5e6a3" intensity={2} distance={15} />
      <pointLight position={[-3, 0, 2]} color="#f8b4c8" intensity={1.5} distance={12} />
      
      <Float speed={1.5} floatIntensity={0.2} rotationIntensity={0.1}>
        <group>
          <mesh>
            <sphereGeometry args={[0.6, 32, 32]} />
            <MeshDistortMaterial color="#ffb347" emissive="#ffb347" emissiveIntensity={1.5} distort={0.2} speed={2} />
          </mesh>
          <mesh rotation={[Math.PI / 2.5, 0, 0]}>
            <torusGeometry args={[1.5, 0.02, 16, 100]} />
            <meshStandardMaterial color="#f8b4c8" emissive="#f8b4c8" emissiveIntensity={1} />
          </mesh>
          <mesh rotation={[Math.PI / 2.3, 0.1, 0]}>
            <torusGeometry args={[2.2, 0.015, 16, 100]} />
            <meshStandardMaterial color="#c8a2c8" emissive="#c8a2c8" emissiveIntensity={0.8} />
          </mesh>
          <mesh rotation={[Math.PI / 2.6, -0.1, 0]}>
            <torusGeometry args={[2.8, 0.01, 16, 100]} />
            <meshStandardMaterial color="#f5e6a3" emissive="#f5e6a3" emissiveIntensity={0.5} />
          </mesh>

          <OrbitingBody radius={1.5} speed={0.4} size={0.1} color="#f8b4c8" />
          <OrbitingBody radius={2.2} speed={0.25} size={0.08} color="#c8a2c8" yOffset={0.2} />
          <OrbitingBody radius={2.8} speed={0.15} size={0.06} color="#f5e6a3" yOffset={-0.2} />
        </group>
      </Float>
      
      <Sparkles count={60} size={2} scale={8} color="#ffb347" speed={0.3} opacity={0.4} />
    </group>
  )
}

function CosmicVinylScene3D() {
  const group = useRef()
  const [hovered, setHovered] = useState(false)
  const targetScale = hovered ? 1.05 : 1

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.z -= 0.01
      group.current.rotation.x = Math.PI / 3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group position={[-4.5, 0.8, 1.5]}>
      <pointLight position={[0, 0, 3]} color="#c44dff" intensity={2} distance={10} />
      
      <Float speed={1.2} floatIntensity={0.1} rotationIntensity={0}>
        <group ref={group} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          <mesh>
            <cylinderGeometry args={[2, 2, 0.05, 64]} />
            <meshStandardMaterial color="#0d1b3e" metalness={0.8} roughness={0.2} />
          </mesh>
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={i} position={[0, 0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.5 + i * 0.18, 0.005, 8, 64]} />
              <meshBasicMaterial color="#c44dff" transparent opacity={0.3 + (i % 3) * 0.1} />
            </mesh>
          ))}
          <mesh position={[0, 0.026, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
            <meshStandardMaterial color="#f8b4c8" />
          </mesh>
          <mesh position={[0, 0.027, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.06, 16]} />
            <meshBasicMaterial color="#050010" />
          </mesh>
        </group>
      </Float>
      <Sparkles count={40} size={2.5} scale={6} color="#c44dff" speed={0.4} opacity={0.6} />
    </group>
  )
}

function SupernovaScene3D() {
  const phase = useBigBang()
  const group = useRef()
  const outerGroup = useRef()
  
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * (phase === 3 ? 0.1 : 0.02)
      group.current.rotation.z = state.clock.elapsedTime * (phase === 3 ? 0.05 : 0.01)
      
      let targetScale = 0
      if (phase === 0) targetScale = 0.5
      else if (phase === 1) targetScale = 0.7
      else if (phase === 2) targetScale = 0.9
      else if (phase === 3) targetScale = 1
      
      if (phase === 1 || phase === 2) {
         const speed = phase === 1 ? 5 : 12
         const pulse = Math.sin(state.clock.elapsedTime * speed) * 0.15
         targetScale += pulse
      }
      
      group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * (phase === 3 ? 1.5 : 5))
    }

    if (outerGroup.current) {
      const targetPos = new THREE.Vector3(2.5, -2.0, 2.0)
      outerGroup.current.position.lerp(targetPos, delta * 2)
    }
  })

  const heartColor = phase === 0 ? "#552233" : phase === 1 ? "#ff6b9d" : phase === 2 ? "#ff3366" : "#ffb347"

  return (
    <group ref={outerGroup} position={[2.5, -2.0, 2.0]}>
      <pointLight position={[0, 0, 2]} color={phase === 3 ? "#ff6b9d" : "#ffffff"} intensity={phase === 3 ? 3 : 0.5} distance={15} />
      <pointLight position={[0, 0, -2]} color={heartColor} intensity={phase < 3 ? 1 : 0} distance={10} />
      
      <group ref={group}>
        {phase < 3 ? (
           <Heart3D position={[0, 0, 0]} scale={0.8} color={heartColor} />
        ) : (
          <mesh>
            <sphereGeometry args={[1, 64, 64]} />
            <MeshDistortMaterial color="#fdf6e3" emissive="#ffb347" emissiveIntensity={2} distort={0.6} speed={3} roughness={0.1} />
          </mesh>
        )}
        
        {phase === 3 && (
          <mesh scale={1.5}>
            <sphereGeometry args={[1, 64, 64]} />
            <MeshDistortMaterial color="#ff6b9d" emissive="#c44dff" emissiveIntensity={1} transparent opacity={0.4} distort={0.8} speed={1.5} wireframe />
          </mesh>
        )}
      </group>
      
      {/* Particles speed up and get more chaotic based on phase */}
      <Sparkles 
        count={phase === 3 ? 250 : 100} 
        size={phase === 3 ? 4 : 2} 
        scale={12} 
        color="#ff6b9d" 
        speed={phase === 0 ? 0.2 : phase === 1 ? 1 : phase === 2 ? 3 : 1.2} 
        opacity={0.8} 
      />
    </group>
  )
}

function FinaleScene3D() {
  const heartRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state, delta) => {
    if (heartRef.current) {
      const targetScale = hovered ? 1.2 : 1.0
      heartRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5)
    }
  })

  return (
    <group position={[0, -2.0, 1.5]}>
      {/* Environment map for the glass heart to reflect/refract */}
      <Environment preset="sunset" />
      
      <pointLight position={[0, 3, 4]} color="#f5e6a3" intensity={3} distance={15} />
      <pointLight position={[-3, 0, 2]} color="#f8b4c8" intensity={2} distance={10} />
      
      <Float speed={2} floatIntensity={1} rotationIntensity={0.2}>
        <group ref={heartRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          <Heart3D position={[0, 0, 0]} scale={0.8} color="#ff6b9d" />
          <mesh>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshBasicMaterial color="#ff6b9d" transparent opacity={0.05} />
          </mesh>
        </group>
      </Float>

      {Array.from({ length: 8 }).map((_, i) => (
        <Float key={i} speed={2 + i * 0.3} floatIntensity={1} rotationIntensity={0.5}>
          <Heart3D
            position={[(Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4, -1 - Math.random() * 3]}
            scale={0.08 + Math.random() * 0.05}
            color={['#ff6b9d', '#f8b4c8', '#c8a2c8', '#f5e6a3', '#ffb347', '#e8a0b4'][i % 6]}
          />
        </Float>
      ))}

      <Sparkles count={100} size={4} scale={12} color="#f5e6a3" speed={0.5} opacity={0.8} />
      <Sparkles count={60} size={3} scale={10} color="#f8b4c8" speed={0.3} opacity={0.6} />
    </group>
  )
}

function Heart3D({ position, scale = 1, color = '#ff6b9d' }) {
  const mesh = useRef()
  const shape = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0, 0.3)
    s.bezierCurveTo(0, 0.7, -0.5, 0.9, -0.5, 0.5)
    s.bezierCurveTo(-0.5, 0.1, 0, -0.2, 0, -0.5)
    s.bezierCurveTo(0, -0.2, 0.5, 0.1, 0.5, 0.5)
    s.bezierCurveTo(0.5, 0.9, 0, 0.7, 0, 0.3)
    return s
  }, [])

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.5
    }
  })

  return (
    <mesh ref={mesh} position={position} scale={scale} rotation={[0, 0, 0]}>
      <extrudeGeometry args={[shape, { depth: 0.15, bevelEnabled: true, bevelSegments: 32, steps: 2, bevelSize: 0.25, bevelThickness: 0.25 }]} />
      <MeshTransmissionMaterial 
        backside
        samples={4}
        thickness={0.8}
        chromaticAberration={0.6}
        anisotropy={0.3}
        distortion={0.2}
        distortionScale={0.5}
        temporalDistortion={0.1}
        iridescence={1}
        iridescenceIOR={1.5}
        iridescenceThicknessRange={[100, 400]}
        color={color}
        roughness={0.05}
        metalness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  )
}

function OrbitingBody({ radius, speed, size, color, yOffset = 0 }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed
      ref.current.position.set(Math.cos(t) * radius, yOffset + Math.sin(t * 0.5) * 0.5, Math.sin(t) * radius)
    }
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 20, 20]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.4} />
    </mesh>
  )
}

function ShootingStar3D({ startPos = null }) {
  const ref = useRef()
  const startX = useRef(startPos ? startPos[0] : Math.random() * 10 + 5)
  const startY = useRef(startPos ? startPos[1] : (Math.random() - 0.5) * 6)
  const startZ = useRef(startPos ? startPos[2] : -6)

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x -= 0.1
      ref.current.position.y -= 0.04
      if (ref.current.position.x < -10) {
        ref.current.position.set(startX.current, startY.current, startZ.current - Math.random() * 4)
      }
    }
  })

  return (
    <Trail width={0.04} length={6} color="#f5e6a3" attenuation={(t) => t * t}>
      <mesh ref={ref} position={[startX.current, startY.current, startZ.current]}>
        <sphereGeometry args={[0.02, 6, 6]} />
        <meshBasicMaterial color="#f5e6a3" />
      </mesh>
    </Trail>
  )
}

function CakeScene3D({ position = [0, 0, 0], interactive = false }) {
  return (
    <group position={position}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[0, 10, 5]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[5, 2, 5]} intensity={1.5} color="#ffb347" />
      <pointLight position={[0, 3, 4]} color="#ffb347" intensity={2} distance={15} />
      <pointLight position={[0, 2, -3]} color="#f5e6a3" intensity={1} distance={10} />
      <Float speed={2.5} floatIntensity={1.5} rotationIntensity={0.5}>
        <Cake3D position={[0, 1.2, 0]} scale={0.3} interactive={interactive} />
      </Float>
    </group>
  )
}

function Cake3D(props) {
  const { scene } = useGLTF('/models/heart-shaped_cake_draco.glb')
  
  // Clone scene so we don't mutate the cached object directly
  const clonedScene = useMemo(() => scene.clone(), [scene])
  
  const ref = useRef()
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.4 // Slow constant spin
      if (props.interactive) {
        ref.current.rotation.y += swipeState.rotationY * 0.5
      }
    }
  })

  return (
    <group {...props}>
      <group rotation={[0.6, 0, 0]}>
        <group ref={ref}>
          <primitive object={clonedScene} />
        </group>
      </group>
    </group>
  )
}
useGLTF.preload('/models/heart-shaped_cake_draco.glb')
