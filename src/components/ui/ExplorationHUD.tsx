import { Eye, Footprints, Move, Search } from 'lucide-react'
import { useRef } from 'react'
import { technicalData } from '../../data/technicalData'
import { useSimulationStore, type MoveKey } from '../../store/useSimulationStore'

function requestExplore() {
  const canvas = document.querySelector('#fenachim-canvas canvas, canvas') as HTMLCanvasElement | null
  canvas?.requestPointerLock?.()
}

function MoveButton({ moveKey, label, children }: { moveKey: MoveKey; label: string; children: React.ReactNode }) {
  const setMovement = useSimulationStore((s) => s.setMovement)
  const stop = () => setMovement(moveKey, false)
  return (
    <button
      aria-label={label}
      onPointerDown={(e) => { e.preventDefault(); e.currentTarget.setPointerCapture(e.pointerId); setMovement(moveKey, true) }}
      onPointerUp={stop}
      onPointerCancel={stop}
      onPointerLeave={stop}
      className="glass grid h-12 w-12 select-none place-items-center rounded-xl text-sm font-bold text-white/80 active:bg-emerald-300 active:text-black"
    >{children}</button>
  )
}

export function ExplorationHUD() {
  const exploring = useSimulationStore((s) => s.isExploring)
  const aimed = useSimulationStore((s) => s.aimedComponent)
  const selected = useSimulationStore((s) => s.selectedComponent)
  const lastPointer = useRef<{ x: number; y: number } | null>(null)
  const aimedData = aimed ? technicalData[aimed] : null

  const lookStart = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    lastPointer.current = { x: e.clientX, y: e.clientY }
  }
  const lookMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!lastPointer.current || !e.currentTarget.hasPointerCapture(e.pointerId)) return
    const dx = e.clientX - lastPointer.current.x
    const dy = e.clientY - lastPointer.current.y
    lastPointer.current = { x: e.clientX, y: e.clientY }
    window.dispatchEvent(new CustomEvent('fenachim-mobile-look', { detail: { dx, dy } }))
  }
  const lookEnd = () => { lastPointer.current = null }

  return (
    <>
      {!selected && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <div className={`h-2.5 w-2.5 rounded-full border ${aimed ? 'border-emerald-200 bg-emerald-300/40 shadow-[0_0_16px_rgba(110,255,198,.8)]' : 'border-white/55 bg-black/25'}`} />
          {aimedData && <div className="glass absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white"><span className="text-emerald-300">E</span> inspecionar • {aimedData.shortName}</div>}
        </div>
      )}

      {!exploring && !selected && (
        <button onClick={requestExplore} className="glass desktop-explore absolute bottom-24 right-5 z-20 hidden items-center gap-2 rounded-xl px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75 transition hover:text-white md:flex">
          <Footprints size={15}/> Continuar exploração
        </button>
      )}

      <div className="mobile-game-controls absolute inset-x-0 bottom-4 z-20 hidden items-end justify-between px-4">
        <div className="grid grid-cols-3 grid-rows-2 gap-1.5">
          <div />
          <MoveButton moveKey="forward" label="Andar para frente">▲</MoveButton>
          <div />
          <MoveButton moveKey="left" label="Andar para esquerda">◀</MoveButton>
          <MoveButton moveKey="backward" label="Andar para trás">▼</MoveButton>
          <MoveButton moveKey="right" label="Andar para direita">▶</MoveButton>
        </div>

        <div className="flex items-end gap-2">
          <button onClick={() => window.dispatchEvent(new Event('fenachim-inspect'))} aria-label="Inspecionar componente" className="glass grid h-12 w-12 place-items-center rounded-xl text-white/80 active:bg-emerald-300 active:text-black"><Search size={18}/></button>
          <div
            aria-label="Área para olhar ao redor"
            onPointerDown={lookStart}
            onPointerMove={lookMove}
            onPointerUp={lookEnd}
            onPointerCancel={lookEnd}
            className="glass relative h-28 w-28 touch-none select-none rounded-full border-white/15"
          >
            <Eye size={18} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/45" />
            <Move size={12} className="absolute right-4 top-4 text-white/25" />
          </div>
        </div>
      </div>
    </>
  )
}
