export interface EventEnergyInputs {
  people: number
  litersPerPerson: number
  inletTemperature: number
  targetTemperature: number
  serviceHours: number
  thermalLossPercent: number
  biomethaneCapacityKw: number
  bikeStations: number
  bikeAveragePowerW: number
  bikeUtilizationPercent: number
}

export interface EventEnergyResult {
  totalWaterLiters: number
  waterHeatingEnergyKwh: number
  eventThermalEnergyKwh: number
  oneHourPeakPowerKw: number
  averageUsefulPowerKw: number
  biomethaneUsefulPowerKw: number
  bikeUsefulPowerKw: number
  gridUsefulPowerKw: number
  gridElectricPowerKw: number
  biomethaneContribution: number
  bikeContribution: number
  gridContribution: number
  baselineGridEnergyKwh: number
  hybridGridEnergyKwh: number
  savedGridEnergyKwh: number
  gridSavingsPercent: number
  biomethaneFuelEnergyKwh: number
  bikeGeneratedEnergyKwh: number
}

const WATER_SPECIFIC_HEAT_KJ_KG_K = 4.186
const GRID_TO_HEAT_EFFICIENCY = 0.98
const BIOMETHANE_TO_USEFUL_HEAT_EFFICIENCY = 0.85
const BIKE_TO_HEAT_EFFICIENCY = 0.95

export function calculateEventEnergy(input: EventEnergyInputs): EventEnergyResult {
  const people = Math.max(1, input.people)
  const litersPerPerson = Math.max(0.1, input.litersPerPerson)
  const serviceHours = Math.max(0.25, input.serviceHours)
  const deltaT = Math.max(1, input.targetTemperature - input.inletTemperature)
  const losses = 1 + Math.max(0, input.thermalLossPercent) / 100

  const totalWaterLiters = people * litersPerPerson
  const waterHeatingEnergyKwh = totalWaterLiters * WATER_SPECIFIC_HEAT_KJ_KG_K * deltaT / 3600
  const eventThermalEnergyKwh = waterHeatingEnergyKwh * losses
  const oneHourPeakPowerKw = eventThermalEnergyKwh
  const averageUsefulPowerKw = eventThermalEnergyKwh / serviceHours

  // Pedaladas entram primeiro porque são geração elétrica local realmente disponível.
  const bikeGeneratedEnergyKwh = Math.max(0, input.bikeStations)
    * Math.max(0, input.bikeAveragePowerW) / 1000
    * serviceHours
    * Math.max(0, Math.min(100, input.bikeUtilizationPercent)) / 100
  const bikeUsefulEnergyKwh = Math.min(eventThermalEnergyKwh, bikeGeneratedEnergyKwh * BIKE_TO_HEAT_EFFICIENCY)

  // O biometano é limitado pela potência térmica útil do queimador/trocador considerada no cenário.
  const biomethaneUsefulEnergyCapacityKwh = Math.max(0, input.biomethaneCapacityKw) * serviceHours
  const biomethaneUsefulEnergyKwh = Math.min(
    Math.max(0, eventThermalEnergyKwh - bikeUsefulEnergyKwh),
    biomethaneUsefulEnergyCapacityKwh
  )

  const gridUsefulEnergyKwh = Math.max(0, eventThermalEnergyKwh - bikeUsefulEnergyKwh - biomethaneUsefulEnergyKwh)
  const baselineGridEnergyKwh = eventThermalEnergyKwh / GRID_TO_HEAT_EFFICIENCY
  const hybridGridEnergyKwh = gridUsefulEnergyKwh / GRID_TO_HEAT_EFFICIENCY
  const savedGridEnergyKwh = Math.max(0, baselineGridEnergyKwh - hybridGridEnergyKwh)
  const gridSavingsPercent = baselineGridEnergyKwh > 0 ? savedGridEnergyKwh / baselineGridEnergyKwh * 100 : 0

  const biomethaneFuelEnergyKwh = biomethaneUsefulEnergyKwh / BIOMETHANE_TO_USEFUL_HEAT_EFFICIENCY

  const biomethaneContribution = eventThermalEnergyKwh > 0 ? biomethaneUsefulEnergyKwh / eventThermalEnergyKwh * 100 : 0
  const bikeContribution = eventThermalEnergyKwh > 0 ? bikeUsefulEnergyKwh / eventThermalEnergyKwh * 100 : 0
  const gridContribution = Math.max(0, 100 - biomethaneContribution - bikeContribution)

  return {
    totalWaterLiters,
    waterHeatingEnergyKwh,
    eventThermalEnergyKwh,
    oneHourPeakPowerKw,
    averageUsefulPowerKw,
    biomethaneUsefulPowerKw: biomethaneUsefulEnergyKwh / serviceHours,
    bikeUsefulPowerKw: bikeUsefulEnergyKwh / serviceHours,
    gridUsefulPowerKw: gridUsefulEnergyKwh / serviceHours,
    gridElectricPowerKw: hybridGridEnergyKwh / serviceHours,
    biomethaneContribution,
    bikeContribution,
    gridContribution,
    baselineGridEnergyKwh,
    hybridGridEnergyKwh,
    savedGridEnergyKwh,
    gridSavingsPercent,
    biomethaneFuelEnergyKwh,
    bikeGeneratedEnergyKwh
  }
}
