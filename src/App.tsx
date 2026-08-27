import { Experience } from './components/3d/Experience'
import { Dashboard } from './components/ui/Dashboard'
import { EnergyComparison } from './components/ui/EnergyComparison'
import { ExplorationHUD } from './components/ui/ExplorationHUD'
import { Header } from './components/ui/Header'
import { Navigation } from './components/ui/Navigation'
import { Onboarding } from './components/ui/Onboarding'
import { PedalControl } from './components/ui/PedalControl'
import { SiteMap } from './components/ui/SiteMap'
import { TechnicalDrawer } from './components/ui/TechnicalDrawer'
import { XRayButton } from './components/ui/XRayButton'

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch { return false }
}

export default function App() {
  if (!supportsWebGL()) {
    return <main className="grid h-full place-items-center bg-[#070b0d] p-6 text-center"><div className="max-w-md"><div className="text-xs uppercase tracking-[0.2em] text-emerald-300">Fenachim Web3D</div><h1 className="mt-3 text-2xl font-semibold">WebGL indisponível</h1><p className="mt-3 text-sm leading-6 text-white/55">Seu navegador ou dispositivo não disponibilizou aceleração WebGL. Atualize o navegador ou habilite aceleração de hardware para visualizar a experiência 3D.</p></div></main>
  }

  return (
    <main className="relative h-full w-full overflow-hidden bg-[#7f989e]">
      <div className="absolute inset-0"><Experience /></div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.16),transparent_28%,transparent_72%,rgba(0,0,0,.16))]" />
      <Header />
      <Dashboard />
      <EnergyComparison />
      <XRayButton />
      <PedalControl />
      <Navigation />
      <SiteMap />
      <ExplorationHUD />
      <Onboarding />
      <TechnicalDrawer />
      <div className="pointer-events-none absolute bottom-2 right-3 hidden text-[8px] uppercase tracking-[0.14em] text-white/25 2xl:block">Entorno reconstruído proporcionalmente a partir da referência visual • medidas gerais estimadas</div>
    </main>
  )
}
