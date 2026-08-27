import { useSimulationStore } from '../../store/useSimulationStore'
import { Hotspot } from './Hotspot'

type Vec3 = [number, number, number]

export function ElectricalPanel({ position = [0, 0, 0] }: { position?: Vec3 }) {
  const xray = useSimulationStore((s) => s.xrayMode)
  return (
    <group position={position}>
      <mesh position={[0, 0.85, 0]} castShadow>
        <boxGeometry args={[0.62, 1.18, 0.32]} />
        <meshPhysicalMaterial color="#768387" metalness={0.15} roughness={0.25} transparent opacity={xray ? 0.13 : 0.56} transmission={xray ? 0.32 : 0.06} depthWrite={!xray} />
      </mesh>
      <group visible={xray}>
        <mesh position={[-0.14, 1.02, 0]}><boxGeometry args={[0.18, 0.28, 0.11]} /><meshStandardMaterial color="#252d31" roughness={0.5} /></mesh>
        <mesh position={[0.11, 0.72, 0]}><boxGeometry args={[0.34, 0.08, 0.08]} /><meshStandardMaterial color="#b66e3f" metalness={0.82} roughness={0.3} /></mesh>
        <mesh position={[0.08, 1.18, 0]}><boxGeometry args={[0.25, 0.12, 0.08]} /><meshStandardMaterial color="#d6dedf" metalness={0.4} roughness={0.4} /></mesh>
        {[-0.17, -0.05, 0.07, 0.19].map((x, i) => <mesh key={i} position={[x, 0.47, 0]}><cylinderGeometry args={[0.012, 0.012, 0.38, 8]} /><meshStandardMaterial color={i % 2 ? '#182d6f' : '#7b2828'} /></mesh>)}
      </group>
      <Hotspot id="breaker" position={[-0.14, 1.13, 0.19]} />
      <Hotspot id="bep" position={[0.13, 0.74, 0.19]} />
    </group>
  )
}
