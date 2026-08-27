import { Line } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useSimulationStore } from '../../store/useSimulationStore'

type Source = 'bike' | 'gas' | 'grid'

const colors: Record<Source, { line: string; glow: string }> = {
  bike: { line: '#70f6c3', glow: '#1ee6a0' },
  gas: { line: '#f2a65a', glow: '#ff7b22' },
  grid: { line: '#6aa8ff', glow: '#2b76ff' }
}

function MovingParticle({ curve, index, count, source }: { curve: THREE.CatmullRomCurve3; index: number; count: number; source: Source }) {
  const ref = useRef<THREE.Mesh>(null)
  const phase = useRef(index / count)
  const pedalIntensity = useSimulationStore((s) => s.pedalIntensity)
  const intensity = source === 'bike' ? pedalIntensity : source === 'gas' ? 0.85 : 0.5

  useFrame((_, delta) => {
    phase.current = (phase.current + delta * (0.08 + intensity * 0.36)) % 1
    const p = curve.getPointAt(phase.current)
    ref.current?.position.copy(p)
  })

  return (
    <mesh ref={ref} visible={source !== 'bike' || intensity > 0.03}>
      <sphereGeometry args={[0.035, 10, 10]} />
      <meshStandardMaterial color={colors[source].line} emissive={colors[source].glow} emissiveIntensity={2.2 + intensity * 3.6} />
    </mesh>
  )
}

function Flow({ points, source, particles }: { points: THREE.Vector3[]; source: Source; particles: number }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points])
  const linePoints = useMemo(() => curve.getPoints(100).map((p) => [p.x, p.y, p.z] as [number, number, number]), [curve])
  const pedalIntensity = useSimulationStore((s) => s.pedalIntensity)
  const opacity = source === 'bike' ? 0.12 + pedalIntensity * 0.68 : source === 'gas' ? 0.5 : 0.42

  return (
    <group>
      <Line points={linePoints} color={colors[source].line} lineWidth={source === 'bike' ? 1.2 + pedalIntensity * 1.7 : 1.6} transparent opacity={opacity} />
      {Array.from({ length: particles }, (_, i) => <MovingParticle key={`${source}-${i}`} curve={curve} index={i} count={particles} source={source} />)}
    </group>
  )
}

export function EnergyFlow() {
  const bikePath = useMemo(() => [
    new THREE.Vector3(2.8, 0.38, 24.1),
    new THREE.Vector3(4.7, 0.28, 22.8),
    new THREE.Vector3(7.5, 0.32, 20.2),
    new THREE.Vector3(10.7, 0.8, 18.3),
    new THREE.Vector3(9.8, 1.35, 18.0)
  ], [])

  const gasPath = useMemo(() => [
    new THREE.Vector3(17.0, 1.6, 8.2),
    new THREE.Vector3(15.3, 1.35, 10.8),
    new THREE.Vector3(13.5, 1.05, 14.2),
    new THREE.Vector3(11.5, 0.8, 16.8),
    new THREE.Vector3(9.7, 0.68, 18.0)
  ], [])

  const gridPath = useMemo(() => [
    new THREE.Vector3(16.2, 1.0, 24.0),
    new THREE.Vector3(14.7, 0.8, 22.4),
    new THREE.Vector3(12.8, 0.75, 20.5),
    new THREE.Vector3(10.7, 0.86, 18.3)
  ], [])

  return (
    <group>
      <Flow points={bikePath} source="bike" particles={10} />
      <Flow points={gasPath} source="gas" particles={9} />
      <Flow points={gridPath} source="grid" particles={7} />
    </group>
  )
}
