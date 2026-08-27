import { BatteryCharging, Bike, Droplets, Thermometer, Users, Zap } from 'lucide-react'
import { useSimulationStore } from '../../store/useSimulationStore'

function Metric({ icon, label, value, unit }: { icon: React.ReactNode; label: string; value: string; unit: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-2.5">
      <div className="mb-1.5 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.14em] text-white/45">{icon}{label}</div>
      <div className="metric-value text-xl font-semibold text-white">{value}<span className="ml-1 text-[10px] font-medium text-white/40">{unit}</span></div>
    </div>
  )
}

export function Dashboard() {
  const s = useSimulationStore()
  return (
    <aside className="glass telemetry-panel pointer-events-none absolute right-4 top-4 w-[300px] rounded-2xl p-3.5 md:right-6 md:top-6 md:w-[326px]">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-emerald-300/80">Evento + telemetria ao vivo</div>
          <div className="mt-1 text-sm font-semibold text-white">Dimensionamento para 1.363 pessoas</div>
        </div>
        <div className={`h-2.5 w-2.5 rounded-full ${s.isPedaling ? 'bg-emerald-300 shadow-[0_0_18px_rgba(110,255,198,.9)]' : 'bg-white/25'}`} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Metric icon={<Users size={12}/>} label="Público" value={Math.round(s.eventPeople).toLocaleString('pt-BR')} unit="pessoas" />
        <Metric icon={<Droplets size={12}/>} label="Água" value={(s.totalWaterLiters / 1000).toFixed(2)} unit="mil L" />
        <Metric icon={<Thermometer size={12}/>} label="Saída" value={s.outputTemperature.toFixed(1)} unit="°C" />
        <Metric icon={<Zap size={12}/>} label={`Demanda/${s.serviceHours}h`} value={s.demandPowerKw.toFixed(1)} unit="kW térm." />
        <Metric icon={<BatteryCharging size={12}/>} label="Gerador" value={s.voltage.toFixed(1)} unit="V DC" />
        <Metric icon={<Bike size={12}/>} label="Pedalada atual" value={Math.round(s.pedalPower).toString()} unit="W" />
      </div>
      <div className="mt-2 text-[9px] leading-4 text-white/35">O painel abaixo calcula quanto da demanda pode vir do biometano e das pedaladas e quanto ainda precisa ser fornecido pela rede elétrica do evento.</div>
    </aside>
  )
}
