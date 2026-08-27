import { X } from 'lucide-react'
import { technicalData } from '../../data/technicalData'
import { useSimulationStore } from '../../store/useSimulationStore'

export function TechnicalDrawer() {
  const selected = useSimulationStore((s) => s.selectedComponent)
  const select = useSimulationStore((s) => s.selectComponent)
  const item = selected ? technicalData[selected] : null
  if (!item) return null
  return (
    <div className="glass absolute inset-y-0 right-0 z-30 w-full max-w-[390px] overflow-y-auto border-y-0 border-r-0 p-6 sm:w-[390px]">
      <button onClick={() => select(null)} aria-label="Fechar painel técnico" className="absolute right-4 top-4 rounded-lg p-2 text-white/50 transition hover:bg-white/10 hover:text-white"><X size={18}/></button>
      <div className="pr-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300/80">Componente técnico</div>
      <h2 className="mt-3 text-2xl font-semibold text-white">{item.name}</h2>
      <div className="mt-2 text-xs uppercase tracking-[0.14em] text-white/40">{item.system}</div>
      <div className="my-6 h-px bg-white/10" />
      <section><div className="text-[10px] uppercase tracking-[0.18em] text-white/35">Função</div><p className="mt-2 text-sm leading-6 text-white/72">{item.function}</p></section>
      <section className="mt-6"><div className="text-[10px] uppercase tracking-[0.18em] text-white/35">Características</div><ul className="mt-3 space-y-2">{item.characteristics.map((c) => <li key={c} className="rounded-lg border border-white/8 bg-white/[0.035] px-3 py-2 text-sm text-white/65">{c}</li>)}</ul></section>
      <section className="mt-6 rounded-xl border border-amber-300/15 bg-amber-200/[0.04] p-4"><div className="text-[10px] uppercase tracking-[0.18em] text-amber-200/65">Segurança e normas</div><p className="mt-2 text-xs leading-5 text-white/60">{item.safety}</p></section>
      <p className="mt-6 text-[10px] leading-4 text-white/30">Projeto conceitual desenvolvido considerando princípios e referências das normas aplicáveis. A visualização não constitui certificação, projeto executivo ou autorização para instalação real.</p>
    </div>
  )
}
