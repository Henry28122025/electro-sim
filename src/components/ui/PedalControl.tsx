import { Bike, MapPin } from 'lucide-react'
import { useEffect } from 'react'
import { useSimulationStore } from '../../store/useSimulationStore'

const BIKE_X = 3.3
const BIKE_Z = 24.3
const MAX_DISTANCE = 4.3

export function PedalControl() {
  const isPedaling = useSimulationStore((s) => s.isPedaling)
  const setPedaling = useSimulationStore((s) => s.setPedaling)
  const player = useSimulationStore((s) => s.playerPosition)
  const distance = Math.hypot(player.x - BIKE_X, player.z - BIKE_Z)
  const nearby = distance <= MAX_DISTANCE

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === 'Space' && nearby) { e.preventDefault(); setPedaling(true) }
    }
    const up = (e: KeyboardEvent) => {
      if (e.code === 'Space') { e.preventDefault(); setPedaling(false) }
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [nearby, setPedaling])

  useEffect(() => {
    if (!nearby && isPedaling) setPedaling(false)
  }, [nearby, isPedaling, setPedaling])

  const stop = () => setPedaling(false)
  return (
    <button
      aria-label={nearby ? 'Segure para pedalar' : 'Aproxime-se da zona de pedaladas'}
      disabled={!nearby}
      onPointerDown={(e) => { if (!nearby) return; e.currentTarget.setPointerCapture(e.pointerId); setPedaling(true) }}
      onPointerUp={stop}
      onPointerCancel={stop}
      onPointerLeave={() => { if (isPedaling) stop() }}
      className={`glass pedal-control absolute bottom-5 left-4 z-20 flex select-none items-center gap-3 rounded-2xl px-4 py-3 text-left transition md:bottom-6 md:left-[274px] ${nearby ? (isPedaling ? 'border-emerald-300/60 bg-emerald-300/15' : 'hover:bg-white/10') : 'cursor-not-allowed opacity-50'}`}
    >
      <span className={`grid h-10 w-10 place-items-center rounded-xl ${isPedaling ? 'bg-emerald-300 text-black' : 'bg-white/10 text-white'}`}>{nearby ? <Bike size={20}/> : <MapPin size={18}/>}</span>
      <span><span className="block text-xs font-bold tracking-[0.12em] text-white">{nearby ? 'PEDALAR' : 'VÁ ATÉ AS BICICLETAS'}</span><span className="text-[10px] text-white/45">{nearby ? 'Segure ou pressione Espaço' : `${distance.toFixed(0)} m de distância`}</span></span>
    </button>
  )
}
