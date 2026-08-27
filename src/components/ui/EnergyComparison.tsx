import { Bike, ChevronDown, ChevronUp, Droplets, Flame, Gauge, Leaf, PlugZap, Users, Waves } from 'lucide-react'
import { useState } from 'react'
import { useSimulationStore } from '../../store/useSimulationStore'

function energyLabel(kwh: number) {
  if (kwh < 1) return `${(kwh * 1000).toFixed(kwh < 0.01 ? 1 : 0)} Wh`
  return `${kwh.toFixed(1)} kWh`
}

function numberPt(value: number, digits = 0) {
  return value.toLocaleString('pt-BR', { maximumFractionDigits: digits, minimumFractionDigits: digits })
}

function SourceRow({ icon, label, power, share, className }: { icon: React.ReactNode; label: string; power: number; share: number; className: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-2">
      <div>
        <div className="flex items-center justify-between gap-3 text-[10px]">
          <span className="flex items-center gap-1.5 text-white/68">{icon}{label}</span>
          <span className="metric-value font-semibold text-white">{share.toFixed(1)}%</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
          <div className={`h-full rounded-full transition-[width] duration-300 ${className}`} style={{ width: `${Math.max(0, Math.min(100, share))}%` }} />
        </div>
      </div>
      <div className="metric-value self-center text-right text-[10px] text-white/45">{power.toFixed(2)} kW</div>
    </div>
  )
}

function SmallStat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/[0.03] p-2.5">
      <span className="flex items-center gap-1 text-[9px] text-white/38">{icon}{label}</span>
      <strong className="metric-value mt-1 block text-[13px] text-white/86">{value}</strong>
    </div>
  )
}

export function EnergyComparison() {
  const [open, setOpen] = useState(() => !window.matchMedia('(max-width: 767px)').matches)
  const s = useSimulationStore()
  const setEventAssumptions = useSimulationStore((state) => state.setEventAssumptions)

  const gridAverageElectricKw = s.serviceHours > 0 ? s.hybridGridEnergyKwh / s.serviceHours : 0

  return (
    <aside className={`glass energy-panel absolute right-4 top-[265px] z-10 w-[334px] rounded-2xl p-3.5 md:right-6 md:top-[286px] md:w-[374px] ${open ? '' : 'energy-panel-collapsed'}`}>
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between text-left" aria-expanded={open}>
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-emerald-300/80">Dimensionamento energético realista</div>
          <div className="mt-1 text-sm font-semibold text-white">Evento com {numberPt(s.eventPeople)} pessoas</div>
        </div>
        {open ? <ChevronUp size={16} className="text-white/45"/> : <ChevronDown size={16} className="text-white/45"/>}
      </button>

      {open && (
        <div className="mt-3">
          <div className="rounded-xl border border-emerald-300/15 bg-emerald-300/[0.05] p-3">
            <div className="grid grid-cols-2 gap-2">
              <SmallStat icon={<Users size={11}/>} label="Pico de público" value={`${numberPt(s.eventPeople)} pessoas`} />
              <SmallStat icon={<Droplets size={11}/>} label="Água considerada" value={`${numberPt(s.totalWaterLiters)} L`} />
              <SmallStat icon={<Waves size={11}/>} label="Energia só na água" value={energyLabel(s.waterHeatingEnergyKwh)} />
              <SmallStat icon={<Gauge size={11}/>} label={`Demanda em ${s.serviceHours} h`} value={`${s.demandPowerKw.toFixed(1)} kW térm.`} />
            </div>
            <div className="mt-2 rounded-lg border border-white/8 bg-black/15 px-2.5 py-2 text-[9px] leading-4 text-white/45">
              Cenário base: {s.litersPerPerson.toFixed(2)} L/pessoa, água de {s.inputTemperature.toFixed(0)} °C até {s.targetTemperature.toFixed(0)} °C e {s.thermalLossPercent.toFixed(0)}% de perdas. Se todo o volume precisasse ficar pronto em apenas 1 hora, seriam cerca de <strong className="text-white/75">{s.oneHourPeakPowerKw.toFixed(1)} kW térmicos</strong>.
            </div>
          </div>

          <details className="mt-2.5 rounded-xl border border-white/10 bg-black/20 p-3">
            <summary className="cursor-pointer select-none text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">Ajustar premissas do evento</summary>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[9px]">
              <label className="text-white/45">Pessoas
                <input className="energy-input mt-1" type="number" min={1} max={10000} step={1} value={s.eventPeople} onChange={(e) => setEventAssumptions({ eventPeople: Math.max(1, Number(e.target.value) || 1) })}/>
              </label>
              <label className="text-white/45">Litros por pessoa
                <select className="energy-input mt-1" value={s.litersPerPerson} onChange={(e) => setEventAssumptions({ litersPerPerson: Number(e.target.value) })}>
                  <option value={0.5}>0,50 L</option>
                  <option value={0.75}>0,75 L</option>
                  <option value={1}>1,00 L</option>
                  <option value={1.5}>1,50 L</option>
                </select>
              </label>
              <label className="text-white/45">Janela de atendimento
                <select className="energy-input mt-1" value={s.serviceHours} onChange={(e) => setEventAssumptions({ serviceHours: Number(e.target.value) })}>
                  <option value={1}>1 hora — pico severo</option>
                  <option value={2}>2 horas</option>
                  <option value={4}>4 horas — base</option>
                  <option value={6}>6 horas</option>
                  <option value={8}>8 horas</option>
                </select>
              </label>
              <label className="text-white/45">Biometano útil
                <select className="energy-input mt-1" value={s.biomethaneCapacityKw} onChange={(e) => setEventAssumptions({ biomethaneCapacityKw: Number(e.target.value) })}>
                  <option value={10}>10 kW térm.</option>
                  <option value={20}>20 kW térm. — base</option>
                  <option value={30}>30 kW térm.</option>
                  <option value={40}>40 kW térm.</option>
                </select>
              </label>
            </div>
            <p className="mt-2 text-[8px] leading-3.5 text-white/28">As 3 bicicletas são consideradas a 120 W médios cada, ocupadas em 65% da janela. Isso evita superestimar a contribuição humana.</p>
          </details>

          <div className="mt-2.5 rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-white/52">Cenário convencional</span>
              <strong className="text-white">100% REDE</strong>
            </div>
            <div className="mt-1 text-[11px] text-white/40">Para o mesmo serviço: <strong className="text-white/70">{energyLabel(s.baselineGridEnergyKwh)}</strong> de energia elétrica.</div>
          </div>

          <div className="mt-2.5 space-y-2.5 rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">Parcela da demanda térmica</span>
              <span className="text-[8px] text-white/28">kW úteis médios</span>
            </div>
            <SourceRow icon={<Flame size={12}/>} label="Biometano" power={s.biomethanePowerKw} share={s.biomethaneContribution} className="bg-amber-400/90" />
            <SourceRow icon={<Bike size={12}/>} label="Pedaladas" power={s.bikePowerKw} share={s.bikeContribution} className="bg-emerald-300/90" />
            <SourceRow icon={<PlugZap size={12}/>} label="Rede elétrica local" power={s.gridPowerKw} share={s.gridContribution} className="bg-sky-400/90" />
          </div>

          <div className="mt-2.5 flex items-center justify-between rounded-xl border border-emerald-300/20 bg-emerald-300/[0.08] p-3">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-emerald-100/70"><Leaf size={14}/> Economia estimada da rede</span>
            <strong className="metric-value text-xl text-emerald-200">{s.gridSavingsPercent.toFixed(1)}%</strong>
          </div>

          <div className="mt-2.5 grid grid-cols-2 gap-2 text-[10px]">
            <SmallStat label="Rede sem híbrido" value={energyLabel(s.baselineGridEnergyKwh)} />
            <SmallStat label="Rede com híbrido" value={energyLabel(s.hybridGridEnergyKwh)} />
            <SmallStat label="Rede evitada" value={energyLabel(s.savedGridEnergyKwh)} />
            <SmallStat label="Rede média necessária" value={`${gridAverageElectricKw.toFixed(1)} kW el.`} />
            <SmallStat label="Biometano (energia combustível)" value={energyLabel(s.biomethaneEnergyKwh)} />
            <SmallStat label="Pedaladas geradas" value={energyLabel(s.bikeEnergyKwh)} />
          </div>

          <p className="mt-2 text-[8.5px] leading-4 text-white/30">
            Estimativa de engenharia conceitual, não projeto executivo. Usa calor específico da água de 4,186 kJ/kg·°C, 10% de perdas, 98% de eficiência elétrica→calor, 85% biometano→calor útil e 95% pedaladas→calor. A lotação simultânea não significa consumo simultâneo; por isso a janela de atendimento altera muito a potência e a participação da rede.
          </p>
        </div>
      )}
    </aside>
  )
}
