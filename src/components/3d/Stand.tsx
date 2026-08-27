import { Html } from '@react-three/drei'
import { BikeSystem } from './BikeSystem'
import { Boiler } from './Boiler'
import { ElectricalPanel } from './ElectricalPanel'
import { GasRack } from './GasRack'
import { EnergyFlow } from './EnergyFlow'
import { Hotspot } from './Hotspot'
import { useSimulationStore } from '../../store/useSimulationStore'

function Counter({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.45, 0]} castShadow><boxGeometry args={[1.05, 0.82, 0.48]} /><meshStandardMaterial color="#687479" metalness={0.88} roughness={0.27} /></mesh>
      <mesh position={[0, 0.88, 0]}><boxGeometry args={[1.12, 0.06, 0.54]} /><meshStandardMaterial color="#9ca7aa" metalness={0.92} roughness={0.22} /></mesh>
      <mesh position={[-0.15, 0.91, 0]}><boxGeometry args={[0.44, 0.04, 0.32]} /><meshStandardMaterial color="#434d50" metalness={0.8} /></mesh>
      <mesh position={[0.25, 1.12, -0.08]} rotation={[0, 0, -0.18]}><cylinderGeometry args={[0.025, 0.025, 0.44, 12]} /><meshStandardMaterial color="#b5bfc2" metalness={0.9} /></mesh>
      <mesh position={[0.22, 1.32, 0.02]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.025, 0.025, 0.25, 12]} /><meshStandardMaterial color="#b5bfc2" metalness={0.9} /></mesh>
      <mesh position={[0.38, 1.08, 0.25]}><boxGeometry args={[0.33, 0.21, 0.03]} /><meshStandardMaterial color="#10191a" emissive="#3ce7b0" emissiveIntensity={0.8} /></mesh>
    </group>
  )
}

function ZoneSign({ position, title, subtitle }: { position: [number, number, number]; title: string; subtitle: string }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.15, 0]}><boxGeometry args={[2.7, 0.86, 0.12]} /><meshStandardMaterial color="#0d221c" metalness={0.25} roughness={0.45} /></mesh>
      <mesh position={[0, 1.15, 0.068]}><boxGeometry args={[2.55, 0.055, 0.025]} /><meshStandardMaterial color="#78f2bd" emissive="#29d894" emissiveIntensity={1.5} /></mesh>
      <Html position={[0, 1.22, 0.09]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
        <div className="park-zone-label"><strong>{title}</strong><span>{subtitle}</span></div>
      </Html>
    </group>
  )
}

function GridKiosk() {
  return (
    <group position={[16.2, 0.02, 24]}>
      <mesh position={[0, 0.8, 0]} castShadow><boxGeometry args={[0.9, 1.5, 0.65]} /><meshStandardMaterial color="#47555c" metalness={0.6} roughness={0.38} /></mesh>
      <mesh position={[0, 1.06, 0.34]}><boxGeometry args={[0.58, 0.42, 0.035]} /><meshStandardMaterial color="#102136" emissive="#317cff" emissiveIntensity={0.75} /></mesh>
      <mesh position={[0, 0.55, 0.34]}><boxGeometry args={[0.5, 0.24, 0.04]} /><meshStandardMaterial color="#d6dde0" metalness={0.25} roughness={0.35} /></mesh>
      <mesh position={[0, 0.04, 0]}><boxGeometry args={[1.15, 0.08, 0.9]} /><meshStandardMaterial color="#252d31" metalness={0.55} /></mesh>
      <Hotspot id="grid" position={[0, 1.32, 0.42]} />
    </group>
  )
}

function EnergyMeterStation() {
  const people = useSimulationStore((s) => s.eventPeople)
  const demand = useSimulationStore((s) => s.demandPowerKw)
  const bio = useSimulationStore((s) => s.biomethaneContribution)
  const bike = useSimulationStore((s) => s.bikeContribution)
  const grid = useSimulationStore((s) => s.gridContribution)
  return (
    <group position={[10, 0.03, 31]}>
      <mesh position={[0, 0.06, 0]}><boxGeometry args={[2.5, 0.1, 0.85]} /><meshStandardMaterial color="#202a2d" metalness={0.35} /></mesh>
      <mesh position={[0, 1.1, 0]} castShadow><boxGeometry args={[2.2, 1.9, 0.32]} /><meshStandardMaterial color="#172225" metalness={0.45} roughness={0.42} /></mesh>
      <mesh position={[0, 1.18, 0.17]}><boxGeometry args={[1.78, 1.25, 0.035]} /><meshStandardMaterial color="#0d1819" emissive="#28d99a" emissiveIntensity={0.35} /></mesh>
      <mesh position={[0, 1.57, 0.195]}><boxGeometry args={[1.42, 0.065, 0.02]} /><meshStandardMaterial color="#baffdf" emissive="#57ffc0" emissiveIntensity={2} /></mesh>
      <Hotspot id="meter" position={[0.78, 1.72, 0.32]} />
      <Html position={[0, 1.1, 0.21]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
        <div className="energy-meter-3d"><strong>EVENTO • {Math.round(people).toLocaleString('pt-BR')} PESSOAS</strong><span>{demand.toFixed(1)} kW térm. médios</span><small>Biometano {bio.toFixed(1)}% • Pedal {bike.toFixed(1)}% • Rede {grid.toFixed(1)}%</small></div>
      </Html>
    </group>
  )
}

function ParkBoundary() {
  const postsX = [-10,-6,-2,2,6,10]
  const postsZ = [-15,-10,-5,0,5,10,15]
  return (
    <group position={[10, 0, 18]}>
      <mesh position={[0, -0.04, 0]} receiveShadow><boxGeometry args={[20, 0.08, 30]} /><meshStandardMaterial color="#58615a" roughness={0.88} /></mesh>
      <mesh position={[0, 0.015, 0]} receiveShadow><boxGeometry args={[17.5, 0.025, 27.5]} /><meshStandardMaterial color="#777a70" roughness={0.92} /></mesh>
      <mesh position={[0, 0.03, 0]}><boxGeometry args={[2.8, 0.02, 28]} /><meshStandardMaterial color="#87877b" roughness={0.9} /></mesh>
      <mesh position={[0, 0.035, 0]}><boxGeometry args={[0.055, 0.025, 27]} /><meshStandardMaterial color="#81edbc" emissive="#2bdc97" emissiveIntensity={0.7} /></mesh>

      {postsX.map((x) => <mesh key={`front-${x}`} position={[x,0.42,15]}><boxGeometry args={[1.6,0.82,0.28]} /><meshStandardMaterial color="#314c38" roughness={0.9} /></mesh>)}
      {postsX.filter((x) => Math.abs(x) > 3).map((x) => <mesh key={`back-${x}`} position={[x,0.42,-15]}><boxGeometry args={[1.6,0.82,0.28]} /><meshStandardMaterial color="#314c38" roughness={0.9} /></mesh>)}
      {postsZ.map((z) => <mesh key={`left-${z}`} position={[-10,0.42,z]}><boxGeometry args={[0.28,0.82,1.7]} /><meshStandardMaterial color="#314c38" roughness={0.9} /></mesh>)}
      {postsZ.map((z) => <mesh key={`right-${z}`} position={[10,0.42,z]}><boxGeometry args={[0.28,0.82,1.7]} /><meshStandardMaterial color="#314c38" roughness={0.9} /></mesh>)}

      <mesh position={[0, 2.65, 14.65]}><boxGeometry args={[7.5, 0.55, 0.3]} /><meshStandardMaterial color="#10241d" metalness={0.3} /></mesh>
      <mesh position={[-3.6,1.35,14.65]}><boxGeometry args={[0.22,2.7,0.22]} /><meshStandardMaterial color="#46534e" metalness={0.7} /></mesh>
      <mesh position={[3.6,1.35,14.65]}><boxGeometry args={[0.22,2.7,0.22]} /><meshStandardMaterial color="#46534e" metalness={0.7} /></mesh>
      <Html position={[0,2.66,14.84]} center distanceFactor={11} style={{ pointerEvents: 'none' }}><div className="entrance-3d"><strong>MINI PARQUE INTERATIVO FENACHIM</strong><span>AQUECEDOR HÍBRIDO • BIOMETANO + PEDALADAS + REDE</span></div></Html>

      <Html position={[-9.6,0.3,0]} center distanceFactor={15} style={{ pointerEvents: 'none' }}><div className="dimension-tag">30,0 m</div></Html>
      <Html position={[0,0.3,14.7]} center distanceFactor={15} style={{ pointerEvents: 'none' }}><div className="dimension-tag">20,0 m</div></Html>
    </group>
  )
}

function TechnicalCore() {
  return (
    <group>
      <mesh position={[10, 0.03, 18]} receiveShadow><boxGeometry args={[3, 0.08, 2]} /><meshStandardMaterial color="#1b2426" roughness={0.65} metalness={0.2} /></mesh>
      <mesh position={[10, 2.5, 18]}><boxGeometry args={[3.15, 0.12, 2.15]} /><meshStandardMaterial color="#3c4b4e" metalness={0.72} roughness={0.35} /></mesh>
      {[8.55,11.45].flatMap((x) => [17.05,18.95].map((z) => <mesh key={`${x}-${z}`} position={[x,1.25,z]}><boxGeometry args={[0.09,2.5,0.09]} /><meshStandardMaterial color="#48575a" metalness={0.75} /></mesh>))}
      <Boiler position={[9.75,0.08,18]} />
      <ElectricalPanel position={[10.7,0.13,18.3]} />
      <Counter position={[9.15,0.08,17.5]} />
      <Html position={[10,2.52,19.1]} center distanceFactor={8} style={{ pointerEvents: 'none' }}><div className="core-label"><strong>NÚCLEO TÉCNICO</strong><span>3,0 m × 2,0 m</span></div></Html>
    </group>
  )
}

export function Stand() {
  return (
    <group>
      <ParkBoundary />
      <TechnicalCore />

      <group>
        <BikeSystem position={[3.3, 0.05, 24.3]} rotationY={-0.2} scale={1.05} />
        <BikeSystem position={[1.1, 0.05, 22.8]} rotationY={-0.1} scale={0.9} hotspot={false} />
        <BikeSystem position={[5.5, 0.05, 22.7]} rotationY={-0.32} scale={0.9} hotspot={false} />
        <ZoneSign position={[3.3,0,27.1]} title="01 • ZONA DE PEDALADAS" subtitle="Geração humana 24 V DC" />
      </group>

      <group>
        <mesh position={[16.1,0.05,8.2]}><boxGeometry args={[4.5,0.08,3.4]} /><meshStandardMaterial color="#27312e" roughness={0.76} /></mesh>
        <GasRack position={[16,0.07,8.2]} />
        <mesh position={[16.1,1.3,6.65]}><boxGeometry args={[4.5,2.6,0.12]} /><meshStandardMaterial color="#35423e" transparent opacity={0.6} /></mesh>
        <ZoneSign position={[16,0,10.5]} title="03 • BIOMETANO" subtitle="Rack, regulação e ESD" />
      </group>

      <GridKiosk />
      <ZoneSign position={[16.2,0,26.3]} title="04 • REDE DO LOCAL" subtitle="Complementação elétrica" />
      <EnergyMeterStation />
      <ZoneSign position={[10,0,33.2]} title="COMPARAÇÃO DE ENERGIA" subtitle="Veja a economia em tempo real" />
      <ZoneSign position={[10,0,20.8]} title="02 • AQUECIMENTO HÍBRIDO" subtitle="Biometano + 24 V DC + rede" />

      <EnergyFlow />
    </group>
  )
}
