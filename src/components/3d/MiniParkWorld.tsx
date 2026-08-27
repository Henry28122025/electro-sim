import { Html } from '@react-three/drei'

function ExpoPavilion({ position, size, roofColor = '#d9dde0', wallColor = '#b9c0c3' }: { position: [number, number, number]; size: [number, number, number]; roofColor?: string; wallColor?: string }) {
  const [w, h, d] = size
  return (
    <group position={position}>
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={wallColor} roughness={0.72} metalness={0.08} />
      </mesh>
      <mesh position={[0, h + 1.45, -d * 0.24]} rotation={[-0.17, 0, 0]} castShadow>
        <boxGeometry args={[w + 0.7, 0.32, d * 0.54]} />
        <meshStandardMaterial color={roofColor} roughness={0.55} metalness={0.22} />
      </mesh>
      <mesh position={[0, h + 1.45, d * 0.24]} rotation={[0.17, 0, 0]} castShadow>
        <boxGeometry args={[w + 0.7, 0.32, d * 0.54]} />
        <meshStandardMaterial color={roofColor} roughness={0.55} metalness={0.22} />
      </mesh>
      {[-w / 2 + 4, 0, w / 2 - 4].map((x) => <mesh key={x} position={[x, 1.25, d / 2 + 0.03]}><boxGeometry args={[2.2, 2.5, 0.1]} /><meshStandardMaterial color="#313b3f" roughness={0.45} /></mesh>)}
    </group>
  )
}

function BarrelPavilion({ position, width = 48, depth = 28, height = 7 }: { position: [number, number, number]; width?: number; depth?: number; height?: number }) {
  const panels = Array.from({ length: 11 }, (_, i) => {
    const t = i / 10
    const angle = -1.15 + t * 2.3
    const z = Math.sin(angle) * depth * 0.42
    const y = height + Math.cos(angle) * 4.1
    return { z, y, angle }
  })
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[width, height, depth * 0.82]} />
        <meshStandardMaterial color="#8f989b" roughness={0.68} metalness={0.16} />
      </mesh>
      {panels.map((p, i) => (
        <mesh key={i} position={[0, p.y, p.z]} rotation={[p.angle, 0, 0]} castShadow>
          <boxGeometry args={[width + 0.6, 0.26, depth / 10 + 0.4]} />
          <meshStandardMaterial color={i % 2 ? '#b9bfc1' : '#aab1b4'} roughness={0.62} metalness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

function Tree({ x, z, scale = 1 }: { x: number; z: number; scale?: number }) {
  return (
    <group position={[x, 0, z]} scale={scale}>
      <mesh position={[0, 1.4, 0]} castShadow><cylinderGeometry args={[0.18, 0.28, 2.8, 8]} /><meshStandardMaterial color="#5a4330" roughness={1} /></mesh>
      <mesh position={[0, 3.15, 0]} castShadow><sphereGeometry args={[1.35, 10, 8]} /><meshStandardMaterial color="#355d3f" roughness={0.95} /></mesh>
      <mesh position={[0.7, 3.0, 0.25]} castShadow><sphereGeometry args={[0.85, 10, 8]} /><meshStandardMaterial color="#426b49" roughness={0.95} /></mesh>
      <mesh position={[-0.65, 2.9, -0.15]} castShadow><sphereGeometry args={[0.78, 10, 8]} /><meshStandardMaterial color="#31583b" roughness={0.95} /></mesh>
    </group>
  )
}

function Tent({ x, z, color = '#f2f3ef', scale = 1 }: { x: number; z: number; color?: string; scale?: number }) {
  return (
    <group position={[x, 0, z]} scale={scale}>
      <mesh position={[0, 2.35, 0]} rotation={[0, Math.PI / 4, 0]} castShadow><coneGeometry args={[2.45, 1.35, 4]} /><meshStandardMaterial color={color} roughness={0.62} /></mesh>
      {[-1.55, 1.55].flatMap((px) => [-1.55, 1.55].map((pz) => <mesh key={`${px}-${pz}`} position={[px, 1.1, pz]}><cylinderGeometry args={[0.045, 0.045, 2.2, 6]} /><meshStandardMaterial color="#5f696c" metalness={0.65} /></mesh>))}
    </group>
  )
}

function Car({ x, z, rotation = 0, color = '#5d6970' }: { x: number; z: number; rotation?: number; color?: string }) {
  return (
    <group position={[x, 0.18, z]} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.25, 0]} castShadow><boxGeometry args={[1.8, 0.42, 0.88]} /><meshStandardMaterial color={color} metalness={0.5} roughness={0.38} /></mesh>
      <mesh position={[0.1, 0.55, 0]}><boxGeometry args={[0.95, 0.35, 0.78]} /><meshStandardMaterial color="#aab9bf" metalness={0.2} roughness={0.2} /></mesh>
      {[-0.62, 0.62].flatMap((wx) => [-0.45, 0.45].map((wz) => <mesh key={`${wx}-${wz}`} position={[wx, 0.12, wz]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.16, 0.16, 0.12, 12]} /><meshStandardMaterial color="#171a1b" /></mesh>))}
    </group>
  )
}

function Person({ x, z, shirt = '#607b8b' }: { x: number; z: number; shirt?: string }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 1.6, 0]} castShadow><sphereGeometry args={[0.13, 10, 8]} /><meshStandardMaterial color="#c9a681" roughness={0.8} /></mesh>
      <mesh position={[0, 1.12, 0]} castShadow><capsuleGeometry args={[0.16, 0.55, 4, 8]} /><meshStandardMaterial color={shirt} roughness={0.8} /></mesh>
      <mesh position={[-0.08, 0.45, 0]}><boxGeometry args={[0.11, 0.68, 0.12]} /><meshStandardMaterial color="#2e363c" /></mesh>
      <mesh position={[0.08, 0.45, 0]}><boxGeometry args={[0.11, 0.68, 0.12]} /><meshStandardMaterial color="#2e363c" /></mesh>
    </group>
  )
}

function StreetLamp({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 2.5, 0]}><cylinderGeometry args={[0.055, 0.075, 5, 8]} /><meshStandardMaterial color="#4c565a" metalness={0.72} /></mesh>
      <mesh position={[0, 5.0, 0]}><sphereGeometry args={[0.16, 10, 8]} /><meshStandardMaterial color="#fff0bd" emissive="#ffdb77" emissiveIntensity={1.4} /></mesh>
      <pointLight position={[0, 4.8, 0]} intensity={4} distance={11} color="#ffe6ad" />
    </group>
  )
}

function SiteLabel({ position, title, subtitle }: { position: [number, number, number]; title: string; subtitle?: string }) {
  return (
    <Html position={position} center distanceFactor={20} style={{ pointerEvents: 'none' }}>
      <div className="site-label">
        <strong>{title}</strong>
        {subtitle && <span>{subtitle}</span>}
      </div>
    </Html>
  )
}

const treePositions: Array<[number, number, number]> = [
  [-76,-50,1.3],[-74,-38,1.1],[-75,-25,1.2],[-75,-10,1.3],[-74,5,1.1],[-75,21,1.25],[-74,38,1.2],[-75,51,1.15],
  [62,-55,1.1],[61,-43,1.2],[61,-29,1.15],[61,-15,1.3],[61,-1,1.2],[61,13,1.25],[61,28,1.15],[61,43,1.25],[61,55,1.2],
  [-7,-55,1.15],[8,-55,1.25],[24,-55,1.1],[42,-55,1.2],[-57,45,1.0],[-44,46,1.15],[-30,48,1.0],[-17,50,1.15]
]

const people: Array<[number, number, string]> = [
  [8,35,'#8f6f5a'],[12,33,'#486c88'],[4,28,'#71844f'],[17,27,'#8c5c61'],[8,24,'#4b7b73'],[13,21,'#8d754e'],[4,18,'#5d6f91'],[16,15,'#7b5d88'],[7,10,'#58785e'],[14,7,'#886151'],[20,20,'#6a7d8b'],[-2,25,'#7b6c52'],[26,31,'#5f758d'],[-9,34,'#786071']
]

export function MiniParkWorld() {
  const parkingCars = Array.from({ length: 14 }, (_, i) => ({ x: 45 + (i % 2) * 4.3, z: -4 + Math.floor(i / 2) * 5.2, color: i % 3 === 0 ? '#7b8589' : i % 3 === 1 ? '#4d6575' : '#77635d' }))

  return (
    <group>
      <mesh position={[0, -0.18, 0]} receiveShadow><boxGeometry args={[180, 0.32, 130]} /><meshStandardMaterial color="#55604f" roughness={0.95} /></mesh>

      <mesh position={[72, -0.005, 0]} receiveShadow><boxGeometry args={[14, 0.08, 130]} /><meshStandardMaterial color="#252a2d" roughness={0.9} /></mesh>
      <mesh position={[72, 0.04, 0]}><boxGeometry args={[0.12, 0.02, 126]} /><meshStandardMaterial color="#d4c36c" emissive="#9b812f" emissiveIntensity={0.12} /></mesh>
      {[-58,-38,-18,2,22,42].map((z) => <mesh key={z} position={[68.5,0.045,z]}><boxGeometry args={[0.12,0.018,8]} /><meshStandardMaterial color="#e8e8db" /></mesh>)}

      <mesh position={[48, -0.06, 16]} receiveShadow><boxGeometry args={[28, 0.12, 46]} /><meshStandardMaterial color="#454b4d" roughness={0.88} /></mesh>
      {Array.from({ length: 7 }, (_, i) => <mesh key={i} position={[48, 0.015, -1 + i * 6]}><boxGeometry args={[27, 0.015, 0.08]} /><meshStandardMaterial color="#bfc2bc" /></mesh>)}
      {parkingCars.map((c, i) => <Car key={i} {...c} rotation={Math.PI / 2} />)}

      <ExpoPavilion position={[-34, 0, -7]} size={[64, 8.5, 34]} roofColor="#ecefe9" wallColor="#c9cfcc" />
      <BarrelPavilion position={[28, 0, -42]} width={48} depth={28} height={7} />
      <ExpoPavilion position={[-28, 0, -46]} size={[42, 5.2, 13]} roofColor="#8b7666" wallColor="#77746d" />
      <ExpoPavilion position={[24, 0, -10]} size={[20, 4.8, 12]} roofColor="#b9c2c3" wallColor="#90999b" />

      <mesh position={[-12, -0.04, 34]} receiveShadow><boxGeometry args={[72, 0.06, 18]} /><meshStandardMaterial color="#7a756c" roughness={0.96} /></mesh>
      <mesh position={[11, -0.025, 19]} receiveShadow><boxGeometry args={[48, 0.055, 39]} /><meshStandardMaterial color="#74756b" roughness={0.96} /></mesh>

      <Tent x={-18} z={31} /><Tent x={-10} z={33} color="#dfe7e9" /><Tent x={28} z={30} color="#d8e0e9" /><Tent x={34} z={24} color="#e6e1d2" /><Tent x={28} z={12} color="#d9e4d6" scale={0.85} />

      {treePositions.map(([x,z,s]) => <Tree key={`${x}-${z}`} x={x} z={z} scale={s} />)}
      {[-62,-44,-26,-8,10,28,46].map((z) => <Tree key={`road-${z}`} x={63.5} z={z} scale={0.9} />)}

      {people.map(([x,z,shirt], i) => <Person key={i} x={x} z={z} shirt={shirt} />)}
      {[[-8,38], [28,38], [32,4], [-12,25], [35,15], [57,12]].map(([x,z]) => <StreetLamp key={`${x}-${z}`} x={x} z={z} />)}

      <Car x={70} z={35} rotation={0} color="#d6d7d2" /><Car x={74} z={12} rotation={Math.PI} color="#526c78" /><Car x={70} z={-22} rotation={0} color="#7f6256" />

      <SiteLabel position={[-34, 11, -7]} title="Pavilhão principal" subtitle="reconstrução proporcional" />
      <SiteLabel position={[28, 12, -42]} title="Pavilhão coberto" subtitle="referência visual do local" />
      <SiteLabel position={[11, 5.4, 19]} title="Mini Parque Interativo" subtitle="20 m × 30 m • 600 m²" />
    </group>
  )
}
