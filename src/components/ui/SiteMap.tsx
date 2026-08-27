import { Map } from 'lucide-react'
import { useSimulationStore } from '../../store/useSimulationStore'

const WORLD_W = 168
const WORLD_D = 122

function mapX(x: number) { return ((x + WORLD_W / 2) / WORLD_W) * 100 }
function mapY(z: number) { return ((WORLD_D / 2 - z) / WORLD_D) * 100 }

export function SiteMap() {
  const p = useSimulationStore((s) => s.playerPosition)
  return (
    <aside className="glass site-map absolute bottom-24 left-4 z-10 w-[230px] rounded-2xl p-3 md:bottom-24 md:left-6">
      <div className="mb-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45"><Map size={13}/> Mapa do complexo</div>
      <div className="relative aspect-[1.55] overflow-hidden rounded-xl border border-white/10 bg-[#24302a]">
        <div className="absolute right-[5%] top-0 h-full w-[9%] bg-[#30383b]" />
        <div className="absolute left-[10%] top-[28%] h-[28%] w-[38%] rounded-sm bg-white/35" title="Pavilhão principal" />
        <div className="absolute left-[55%] top-[8%] h-[22%] w-[28%] rounded-t-[45%] bg-white/25" title="Pavilhão coberto" />
        <div className="absolute left-[25%] top-[8%] h-[11%] w-[25%] bg-[#8c8178]/80" title="Galpão" />
        <div className="absolute left-[52%] top-[43%] h-[37%] w-[12%] bg-white/10" title="Estacionamento" />
        <div className="absolute border border-emerald-300/75 bg-emerald-300/20" style={{ left: `${mapX(0)}%`, top: `${mapY(33)}%`, width: `${20 / WORLD_W * 100}%`, height: `${30 / WORLD_D * 100}%` }} title="Mini Parque Interativo" />
        <div className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-emerald-300 shadow-[0_0_12px_rgba(110,255,198,.9)]" style={{ left: `${mapX(p.x)}%`, top: `${mapY(p.z)}%` }} />
        <div className="absolute bottom-1.5 left-2 rounded bg-black/45 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.12em] text-emerald-200">Parque 20 × 30 m</div>
      </div>
      <div className="mt-2 text-[8px] leading-3.5 text-white/30">Reconstrução proporcional baseada na foto de referência; o entorno geral usa medidas estimadas para navegação.</div>
    </aside>
  )
}
