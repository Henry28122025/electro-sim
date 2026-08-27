import { MapPin } from 'lucide-react'
import { useSimulationStore, type Zone } from '../../store/useSimulationStore'

const items: Array<{ zone: Zone; label: string }> = [
  { zone: 'overview', label: 'ENTRADA' },
  { zone: 'bike', label: 'PEDALADAS' },
  { zone: 'boiler', label: 'AQUECIMENTO' },
  { zone: 'gas', label: 'BIOMETANO' },
  { zone: 'grid', label: 'REDE LOCAL' }
]

export function Navigation() {
  const active = useSimulationStore((s) => s.activeZone)
  const setActive = useSimulationStore((s) => s.setActiveZone)
  return (
    <nav className="glass park-nav absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-2xl p-1.5 md:bottom-6">
      <span className="hidden items-center gap-1.5 px-2 text-[9px] uppercase tracking-[0.16em] text-white/35 xl:flex"><MapPin size={12}/> Viagem rápida</span>
      {items.map((item) => (
        <button key={item.zone} aria-label={`Ir para ${item.label}`} onClick={() => setActive(item.zone)} className={`rounded-xl px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.13em] transition ${active === item.zone ? 'bg-emerald-300 text-black' : 'text-white/55 hover:bg-white/10 hover:text-white'}`}>
          {item.label}
        </button>
      ))}
    </nav>
  )
}
