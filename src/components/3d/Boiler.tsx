import { useMemo } from 'react'
import * as THREE from 'three'
import { useSimulationStore } from '../../store/useSimulationStore'
import { Hotspot } from './Hotspot'

type Vec3 = [number, number, number]

function Coil() {
  const curve = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const turns = 5
    for (let i = 0; i <= 80; i++) {
      const t = i / 80
      const a = t * Math.PI * 2 * turns
      pts.push(new THREE.Vector3(Math.cos(a) * 0.26, -0.4 + t * 0.58, Math.sin(a) * 0.26))
    }
    return new THREE.CatmullRomCurve3(pts)
  }, [])
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 90, 0.018, 8, false), [curve])
  return <mesh geometry={geometry}><meshStandardMaterial color="#b9673e" metalness={0.75} roughness={0.28} /></mesh>
}

export function Boiler({ position = [0, 0, 0] }: { position?: Vec3 }) {
  const xray = useSimulationStore((s) => s.xrayMode)
  const temperature = useSimulationStore((s) => s.outputTemperature)
  const heat = Math.min(1, Math.max(0, (temperature - 40) / 45))

  return (
    <group position={position}>
      <mesh position={[0, 0.93, 0]} castShadow>
        <cylinderGeometry args={[0.43, 0.43, 1.65, 40]} />
        <meshPhysicalMaterial color="#9aa4a7" metalness={0.82} roughness={0.28} transparent={xray} opacity={xray ? 0.18 : 1} transmission={xray ? 0.12 : 0} depthWrite={!xray} />
      </mesh>
      <mesh position={[0, 1.78, 0]}>
        <cylinderGeometry args={[0.36, 0.42, 0.08, 36]} />
        <meshStandardMaterial color="#7f8a8e" metalness={0.86} roughness={0.25} transparent={xray} opacity={xray ? 0.22 : 1} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.37, 0.42, 0.08, 36]} />
        <meshStandardMaterial color="#697579" metalness={0.85} roughness={0.3} />
      </mesh>

      <group visible={xray}>
        <mesh position={[0, 1.35, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.19, 0.024, 10, 36]} />
          <meshStandardMaterial color="#e8ded2" emissive="#ff8c42" emissiveIntensity={0.3 + heat * 2.2} metalness={0.25} roughness={0.32} />
        </mesh>
        <mesh position={[0, 1.08, 0]}>
          <sphereGeometry args={[0.27, 24, 16]} />
          <meshBasicMaterial color="#ff7a33" transparent opacity={0.05 + heat * 0.12} depthWrite={false} />
        </mesh>
        <group position={[0, 0.62, 0]}><Coil /></group>
      </group>

      <mesh position={[-0.52, 0.44, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 0.36, 14]} />
        <meshStandardMaterial color="#858f92" metalness={0.85} />
      </mesh>
      <mesh position={[0.52, 1.48, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 0.36, 14]} />
        <meshStandardMaterial color="#858f92" metalness={0.85} />
      </mesh>

      <Hotspot id="heater" position={[0.25, 1.48, 0.18]} />
      <Hotspot id="coil" position={[-0.26, 0.56, 0.2]} />
    </group>
  )
}
