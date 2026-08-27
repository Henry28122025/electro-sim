import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group, Mesh } from 'three'
import { Hotspot } from './Hotspot'
import { useSimulationStore } from '../../store/useSimulationStore'

type Vec3 = [number, number, number]

function Wheel({ x, wheelRef }: { x: number; wheelRef?: React.MutableRefObject<Mesh | null> }) {
  return (
    <group position={[x, 0.62, 0]}>
      <mesh ref={wheelRef} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.39, 0.035, 12, 40]} />
        <meshStandardMaterial color="#111416" roughness={0.72} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.31, 0.008, 8, 32]} />
        <meshStandardMaterial color="#aeb9bd" metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.08, 16]} />
        <meshStandardMaterial color="#bcc5c8" metalness={0.9} />
      </mesh>
    </group>
  )
}

export function BikeSystem({ position = [0, 0, 0], rotationY = -0.26, scale = 1, hotspot = true }: { position?: Vec3; rotationY?: number; scale?: number; hotspot?: boolean }) {
  const group = useRef<Group>(null)
  const rear = useRef<Mesh>(null)
  const front = useRef<Mesh>(null)
  const crank = useRef<Group>(null)
  const roller = useRef<Mesh>(null)
  const generator = useRef<Mesh>(null)
  const intensity = useSimulationStore((s) => s.pedalIntensity)

  useFrame((_, delta) => {
    const speed = intensity * delta * 10
    if (rear.current) rear.current.rotation.z -= speed
    if (front.current) front.current.rotation.z -= speed
    if (crank.current) crank.current.rotation.y -= speed * 1.25
    if (roller.current) roller.current.rotation.z += speed * 1.8
    if (generator.current) generator.current.rotation.z += speed * 2.2
  })

  return (
    <group ref={group} position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Wheel x={-0.43} wheelRef={rear} />
      <Wheel x={0.43} wheelRef={front} />

      <mesh position={[0, 0.86, 0]} rotation={[0, 0, -0.1]} castShadow>
        <cylinderGeometry args={[0.028, 0.028, 0.82, 12]} />
        <meshStandardMaterial color="#3b454a" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[-0.2, 0.85, 0]} rotation={[0, 0, 0.72]}>
        <cylinderGeometry args={[0.03, 0.03, 0.62, 12]} />
        <meshStandardMaterial color="#57636a" metalness={0.82} roughness={0.22} />
      </mesh>
      <mesh position={[0.17, 1.02, 0]} rotation={[0, 0, -0.72]}>
        <cylinderGeometry args={[0.028, 0.028, 0.58, 12]} />
        <meshStandardMaterial color="#57636a" metalness={0.82} roughness={0.22} />
      </mesh>
      <mesh position={[-0.08, 1.16, 0]}>
        <boxGeometry args={[0.36, 0.055, 0.12]} />
        <meshStandardMaterial color="#15191c" roughness={0.7} />
      </mesh>
      <mesh position={[0.38, 1.27, 0]} rotation={[0, 0, -0.22]}>
        <cylinderGeometry args={[0.018, 0.018, 0.46, 10]} />
        <meshStandardMaterial color="#59666b" metalness={0.8} />
      </mesh>
      <mesh position={[0.44, 1.49, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.018, 0.018, 0.46, 10]} />
        <meshStandardMaterial color="#1e2427" metalness={0.6} />
      </mesh>

      <group ref={crank} position={[-0.08, 0.72, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.095, 0.012, 8, 24]} />
          <meshStandardMaterial color="#c6cdd0" metalness={0.95} roughness={0.2} />
        </mesh>
        <mesh position={[0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.28, 0.025, 0.025]} />
          <meshStandardMaterial color="#9aa4a8" metalness={0.9} />
        </mesh>
      </group>

      <mesh position={[-0.42, 0.17, 0]} rotation={[Math.PI / 2, 0, 0]} ref={roller}>
        <cylinderGeometry args={[0.085, 0.085, 0.22, 20]} />
        <meshStandardMaterial color="#3f494d" metalness={0.75} roughness={0.3} />
      </mesh>
      <mesh position={[-0.42, 0.19, -0.2]} rotation={[0, 0, Math.PI / 2]} ref={generator}>
        <cylinderGeometry args={[0.11, 0.11, 0.26, 20]} />
        <meshStandardMaterial color="#768389" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[-0.42, 0.08, -0.2]}>
        <boxGeometry args={[0.38, 0.05, 0.32]} />
        <meshStandardMaterial color="#20272a" metalness={0.55} roughness={0.45} />
      </mesh>
      {hotspot && <Hotspot id="generator" position={[-0.42, 0.34, -0.2]} />}
    </group>
  )
}
