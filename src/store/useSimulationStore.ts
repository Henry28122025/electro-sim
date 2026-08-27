import { create } from 'zustand'

export type Zone = 'overview' | 'bike' | 'boiler' | 'gas' | 'grid'
export type MoveKey = 'forward' | 'backward' | 'left' | 'right' | 'sprint'

interface MovementState {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  sprint: boolean
}

export interface PlayerPosition {
  x: number
  z: number
}

interface SimulationState {
  isPedaling: boolean
  pedalIntensity: number
  pedalPower: number
  voltage: number
  inputTemperature: number
  outputTemperature: number

  // Dimensionamento do evento
  eventPeople: number
  litersPerPerson: number
  targetTemperature: number
  serviceHours: number
  thermalLossPercent: number
  biomethaneCapacityKw: number
  bikeStations: number
  bikeAveragePowerW: number
  bikeUtilizationPercent: number

  totalWaterLiters: number
  waterHeatingEnergyKwh: number
  eventThermalEnergyKwh: number
  oneHourPeakPowerKw: number
  demandPowerKw: number

  biomethanePowerKw: number
  bikePowerKw: number
  gridPowerKw: number
  biomethaneContribution: number
  bikeContribution: number
  gridContribution: number
  gridSavingsPercent: number

  baselineGridEnergyKwh: number
  hybridGridEnergyKwh: number
  savedGridEnergyKwh: number
  biomethaneEnergyKwh: number
  bikeEnergyKwh: number
  simulationSeconds: number

  xrayMode: boolean
  activeZone: Zone
  selectedComponent: string | null
  aimedComponent: string | null
  onboardingVisible: boolean
  isExploring: boolean
  movement: MovementState
  playerPosition: PlayerPosition

  setPedaling: (value: boolean) => void
  setTelemetry: (values: Partial<SimulationState>) => void
  setEventAssumptions: (values: Partial<Pick<SimulationState,
    | 'eventPeople'
    | 'litersPerPerson'
    | 'targetTemperature'
    | 'serviceHours'
    | 'thermalLossPercent'
    | 'biomethaneCapacityKw'
    | 'bikeStations'
    | 'bikeAveragePowerW'
    | 'bikeUtilizationPercent'
  >>) => void
  setXrayMode: (value: boolean) => void
  setActiveZone: (zone: Zone) => void
  selectComponent: (id: string | null) => void
  setAimedComponent: (id: string | null) => void
  dismissOnboarding: () => void
  setExploring: (value: boolean) => void
  setMovement: (key: MoveKey, value: boolean) => void
  resetMovement: () => void
  setPlayerPosition: (position: PlayerPosition) => void
}

const initialMovement: MovementState = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  sprint: false
}

export const useSimulationStore = create<SimulationState>((set) => ({
  isPedaling: false,
  pedalIntensity: 0,
  pedalPower: 0,
  voltage: 0,
  inputTemperature: 20,
  outputTemperature: 46.0,

  // Cenário base: lotação simultânea informada + atendimento distribuído em 4 h.
  eventPeople: 1363,
  litersPerPerson: 1.0,
  targetTemperature: 80,
  serviceHours: 4,
  thermalLossPercent: 10,
  biomethaneCapacityKw: 20,
  bikeStations: 3,
  bikeAveragePowerW: 120,
  bikeUtilizationPercent: 65,

  totalWaterLiters: 1363,
  waterHeatingEnergyKwh: 95.09,
  eventThermalEnergyKwh: 104.60,
  oneHourPeakPowerKw: 104.60,
  demandPowerKw: 26.15,

  biomethanePowerKw: 20,
  bikePowerKw: 0.22,
  gridPowerKw: 5.93,
  biomethaneContribution: 76.5,
  bikeContribution: 0.85,
  gridContribution: 22.65,
  gridSavingsPercent: 77.3,

  baselineGridEnergyKwh: 106.74,
  hybridGridEnergyKwh: 24.20,
  savedGridEnergyKwh: 82.54,
  biomethaneEnergyKwh: 94.12,
  bikeEnergyKwh: 0.94,
  simulationSeconds: 0,

  xrayMode: false,
  activeZone: 'overview',
  selectedComponent: null,
  aimedComponent: null,
  onboardingVisible: true,
  isExploring: false,
  movement: initialMovement,
  playerPosition: { x: 10, z: 46 },

  setPedaling: (isPedaling) => set({ isPedaling, onboardingVisible: false }),
  setTelemetry: (values) => set(values),
  setEventAssumptions: (values) => set(values),
  setXrayMode: (xrayMode) => set({ xrayMode, onboardingVisible: false }),
  setActiveZone: (activeZone) => set({ activeZone, onboardingVisible: false }),
  selectComponent: (selectedComponent) => set({ selectedComponent, onboardingVisible: false }),
  setAimedComponent: (aimedComponent) => set({ aimedComponent }),
  dismissOnboarding: () => set({ onboardingVisible: false }),
  setExploring: (isExploring) => set({ isExploring, onboardingVisible: false }),
  setMovement: (key, value) => set((state) => ({ movement: { ...state.movement, [key]: value } })),
  resetMovement: () => set({ movement: initialMovement }),
  setPlayerPosition: (playerPosition) => set({ playerPosition })
}))
