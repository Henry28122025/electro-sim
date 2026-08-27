import { Html } from '@react-three/drei'
import { useState } from 'react'
import { technicalData } from '../../data/technicalData'
import { useSimulationStore } from '../../store/useSimulationStore'

export function Hotspot({ id, position }: { id: string; position: [number, number, number] }) {
  const [hovered, setHovered] = useState(false)
  const selectComponent = useSimulationStore((s) => s.selectComponent)
  const item = technicalData[id]
  if (!item) return null

  return (
    <group position={position} userData={{ hotspotId: id }}>
      <mesh
        userData={{ hotspotId: id }}
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default' }}
        onClick={(e) => { e.stopPropagation(); selectComponent(id) }}
      >
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color="#e9fff6" emissive="#24e7a1" emissiveIntensity={3} />
      </mesh>
      <mesh userData={{ hotspotId: id }}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh scale={hovered ? 1.6 : 1.2} userData={{ hotspotId: id }}>
        <ringGeometry args={[0.07, 0.085, 28]} />
        <meshBasicMaterial color="#6fffc5" transparent opacity={0.8} depthWrite={false} />
      </mesh>
      {hovered && (
        <Html center distanceFactor={7} style={{ pointerEvents: 'none' }}>
          <div className="glass whitespace-nowrap rounded-md px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-white uppercase">
            {item.shortName}
          </div>
        </Html>
      )}
    </group>
  )
}
