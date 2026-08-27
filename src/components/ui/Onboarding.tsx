import { Footprints, MousePointer2, MapPinned, Gauge } from 'lucide-react'
import { useSimulationStore } from '../../store/useSimulationStore'

function enterPark() {
  const canvas = document.querySelector('#fenachim-canvas canvas, canvas') as HTMLCanvasElement | null
  if (canvas?.requestPointerLock && window.matchMedia('(pointer: fine)').matches) canvas.requestPointerLock()
  useSimulationStore.getState().dismissOnboarding()
}

export function Onboarding() {
  const visible = useSimulationStore((s) => s.onboardingVisible)
  if (!visible) return null
  return (
    <div className="glass absolute left-1/2 top-1/2 z-40 w-[min(94vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl p-5 text-left md:p-6">
      <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300"><MapPinned size={15}/> Fenachim • experiência em escala humana</div>
      <h2 className="text-xl font-semibold text-white">Caminhe pelo local e entre no Mini Parque Interativo</h2>
      <p className="mt-2 text-sm leading-6 text-white/58">O complexo foi reconstruído em 3D a partir da foto enviada, mantendo a disposição visual dos grandes pavilhões, via lateral, estacionamento e área de feira. O parque do projeto ocupa uma área demonstrativa de <strong className="text-white/80">20 × 30 m</strong>, com núcleo técnico real de <strong className="text-white/80">3 × 2 m</strong>.</p>
      <div className="mt-4 grid gap-2 text-sm text-white/70 sm:grid-cols-2">
        <p><strong className="text-white">WASD / setas</strong><br/>andar pelo complexo</p>
        <p><strong className="text-white">Mouse</strong><br/>olhar ao redor</p>
        <p><strong className="text-white">Shift</strong><br/>andar mais rápido</p>
        <p><strong className="text-white">E</strong><br/>inspecionar equipamentos</p>
        <p><strong className="text-white">Espaço</strong><br/>pedalar quando estiver na zona</p>
        <p><strong className="text-white">Esc</strong><br/>liberar o cursor</p>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.035] p-3 text-xs leading-5 text-white/50"><Gauge size={16} className="mt-0.5 shrink-0 text-emerald-300"/> O painel compara 100% rede elétrica com biometano + pedaladas + rede local em tempo real.</div>
        <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.035] p-3 text-xs leading-5 text-white/50"><MousePointer2 size={16} className="mt-0.5 shrink-0"/> No celular, use o direcional e arraste a área de visão.</div>
      </div>
      <p className="mt-3 text-[10px] leading-4 text-white/30">Observação: sem planta topográfica oficial, as dimensões do entorno são estimadas para criar uma experiência proporcional. O espaço 20 × 30 m e o núcleo 3 × 2 m são explícitos no modelo.</p>
      <button onClick={enterPark} className="mt-5 w-full rounded-xl bg-emerald-300 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-emerald-200">Entrar no complexo</button>
    </div>
  )
}
