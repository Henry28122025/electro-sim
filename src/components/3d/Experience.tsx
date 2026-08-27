import { Sky } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Suspense, useRef } from 'react'
import { FirstPersonController } from './FirstPersonController'
import { MiniParkWorld } from './MiniParkWorld'
import { Stand } from './Stand'
import { calculateEventEnergy } from '../../lib/energyModel'
import { useSimulationStore } from '../../store/useSimulationStore'

function SimulationLoop() {
  const isPedaling = useSimulationStore((s) => s.isPedaling)
  const inputTemperature = useSimulationStore((s) => s.inputTemperature)
  const eventPeople = useSimulationStore((s) => s.eventPeople)
  const litersPerPerson = useSimulationStore((s) => s.litersPerPerson)
  const targetTemperature = useSimulationStore((s) => s.targetTemperature)
  const serviceHours = useSimulationStore((s) => s.serviceHours)
  const thermalLossPercent = useSimulationStore((s) => s.thermalLossPercent)
  const biomethaneCapacityKw = useSimulationStore((s) => s.biomethaneCapacityKw)
  const bikeStations = useSimulationStore((s) => s.bikeStations)
  const bikeAveragePowerW = useSimulationStore((s) => s.bikeAveragePowerW)
  const bikeUtilizationPercent = useSimulationStore((s) => s.bikeUtilizationPercent)
  const setTelemetry = useSimulationStore((s) => s.setTelemetry)

  const intensityRef = useRef(0)
  const tempRef = useRef(46)
  const accumulator = useRef(0)
  const elapsed = useRef(0)

  useFrame((_, delta) => {
    const target = isPedaling ? 1 : 0
    intensityRef.current += (target - intensityRef.current) * Math.min(1, delta * (isPedaling ? 2.4 : 1.6))
    const intensity = intensityRef.current

    // Telemetria instantânea da bicicleta que o visitante está usando.
    const pedalPower = Math.max(0, bikeAveragePowerW * 1.65 * intensity)
    const voltage = Math.min(24, 24 * Math.pow(intensity, 0.72))

    const event = calculateEventEnergy({
      people: eventPeople,
      litersPerPerson,
      inletTemperature: inputTemperature,
      targetTemperature,
      serviceHours,
      thermalLossPercent,
      biomethaneCapacityKw,
      bikeStations,
      bikeAveragePowerW,
      bikeUtilizationPercent
    })

    // O visor térmico continua com inércia para parecer um equipamento real.
    const heatTarget = targetTemperature
    tempRef.current += (heatTarget - tempRef.current) * delta * 0.075
    tempRef.current = Math.max(inputTemperature + 8, Math.min(targetTemperature + 2, tempRef.current))

    elapsed.current += delta
    accumulator.current += delta
    if (accumulator.current >= 0.08) {
      accumulator.current = 0
      setTelemetry({
        pedalIntensity: intensity,
        pedalPower,
        voltage,
        outputTemperature: tempRef.current,
        totalWaterLiters: event.totalWaterLiters,
        waterHeatingEnergyKwh: event.waterHeatingEnergyKwh,
        eventThermalEnergyKwh: event.eventThermalEnergyKwh,
        oneHourPeakPowerKw: event.oneHourPeakPowerKw,
        demandPowerKw: event.averageUsefulPowerKw,
        biomethanePowerKw: event.biomethaneUsefulPowerKw,
        bikePowerKw: event.bikeUsefulPowerKw,
        gridPowerKw: event.gridUsefulPowerKw,
        biomethaneContribution: event.biomethaneContribution,
        bikeContribution: event.bikeContribution,
        gridContribution: event.gridContribution,
        gridSavingsPercent: event.gridSavingsPercent,
        baselineGridEnergyKwh: event.baselineGridEnergyKwh,
        hybridGridEnergyKwh: event.hybridGridEnergyKwh,
        savedGridEnergyKwh: event.savedGridEnergyKwh,
        biomethaneEnergyKwh: event.biomethaneFuelEnergyKwh,
        bikeEnergyKwh: event.bikeGeneratedEnergyKwh,
        simulationSeconds: elapsed.current
      })
    }
  })
  return null
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#9bb0b8']} />
      <fog attach="fog" args={['#aeb9b5', 72, 170]} />
      <Sky distance={450000} sunPosition={[-8, 7, 18]} turbidity={7} rayleigh={1.4} mieCoefficient={0.008} mieDirectionalG={0.83} />
      <ambientLight intensity={0.72} />
      <hemisphereLight args={['#dceaff', '#6b705f', 1.0]} />
      <directionalLight position={[-42, 55, 38]} intensity={2.35} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-65} shadow-camera-right={65} shadow-camera-top={65} shadow-camera-bottom={-65} />
      <Suspense fallback={null}>
        <MiniParkWorld />
        <Stand />
      </Suspense>
      <FirstPersonController />
      <SimulationLoop />
      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={1.15} mipmapBlur intensity={0.3} />
      </EffectComposer>
    </>
  )
}

export function Experience() {
  return (
    <Canvas
      id="fenachim-canvas"
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [10, 1.64, 46], fov: 67, near: 0.05, far: 230 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <Scene />
    </Canvas>
  )
}
