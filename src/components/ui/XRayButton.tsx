import { ScanLine } from 'lucide-react'
import { useSimulationStore } from '../../store/useSimulationStore'

export function XRayButton() {
  const xray = useSimulationStore((s) => s.xrayMode)
  const setXray = useSimulationStore((s) => s.setXrayMode)
  return (
    <button onClick={() => setXray(!xray)} aria-pressed={xray} className={`glass absolute left-4 top-28 flex items-center gap-2 rounded-xl px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition md:left-6 md:top-32 ${xray ? 'border-cyan-300/60 text-cyan-200' : 'text-white/65 hover:text-white'}`}>
      <ScanLine size={15}/>{xray ? 'Raio-X ativo' : 'Visualizar interior'}
    </button>
  )
}
