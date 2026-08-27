import { Hotspot } from './Hotspot'

type Vec3 = [number, number, number]

function Cylinder({ x }: { x: number }) {
  return (
    <group position={[x, 0, 0]}>
      <mesh position={[0, 0.72, 0]} castShadow><cylinderGeometry args={[0.13, 0.13, 1.18, 24]} /><meshStandardMaterial color="#4b5559" metalness={0.82} roughness={0.32} /></mesh>
      <mesh position={[0, 1.33, 0]}><sphereGeometry args={[0.13, 20, 12]} /><meshStandardMaterial color="#596469" metalness={0.82} roughness={0.3} /></mesh>
      <mesh position={[0, 1.47, 0]}><cylinderGeometry args={[0.035, 0.045, 0.16, 12]} /><meshStandardMaterial color="#8b9497" metalness={0.85} /></mesh>
    </group>
  )
}

export function GasRack({ position = [0, 0, 0] }: { position?: Vec3 }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.08, 0]}><boxGeometry args={[1.2, 0.08, 0.5]} /><meshStandardMaterial color="#242c2f" metalness={0.65} /></mesh>
      {[-0.42, -0.14, 0.14, 0.42].map((x) => <Cylinder x={x} key={x} />)}
      {[-0.58, 0.58].map((x) => <mesh key={x} position={[x, 0.83, 0]}><boxGeometry args={[0.06, 1.65, 0.56]} /><meshStandardMaterial color="#2f393d" metalness={0.72} /></mesh>)}
      <mesh position={[0, 1.58, 0]}><boxGeometry args={[1.22, 0.06, 0.56]} /><meshStandardMaterial color="#2f393d" metalness={0.72} /></mesh>
      <mesh position={[0, 1.53, 0.18]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.025, 0.025, 0.95, 14]} /><meshStandardMaterial color="#a9673e" metalness={0.8} /></mesh>
      <mesh position={[0.57, 1.53, 0.18]}><boxGeometry args={[0.18, 0.16, 0.14]} /><meshStandardMaterial color="#606d72" metalness={0.72} /></mesh>
      <mesh position={[0.82, 1.53, 0.18]}><boxGeometry args={[0.18, 0.16, 0.14]} /><meshStandardMaterial color="#315f50" metalness={0.42} /></mesh>
      <mesh position={[1.02, 1.53, 0.18]}><boxGeometry args={[0.16, 0.16, 0.14]} /><meshStandardMaterial color="#a63f35" metalness={0.35} /></mesh>
      <Hotspot id="regulator" position={[0.57, 1.72, 0.18]} />
      <Hotspot id="solenoid" position={[0.82, 1.72, 0.18]} />
      <Hotspot id="esd" position={[1.02, 1.72, 0.18]} />
    </group>
  )
}
