import { LogLevel } from '@/constants/enums'
import { defaults } from '@/services/DefaultsGenerator'
import { database } from '@/services/LocalDatabase'
import { useAppLogger } from './useAppLogger'

const { silentLog } = useAppLogger()

export function useDefaults() {
  async function loadAllDefaults() {
    try {
      const measurements = await defaults.generateMeasurements()
      const exercises = await defaults.generateExercises()
      const workouts = await defaults.generateWorkouts()
      await database.bulkAddMeasurements(measurements)
      await database.bulkAddExercises(exercises)
      await database.bulkAddWorkouts(workouts)
    } catch (error) {
      silentLog({ error, level: LogLevel.ERROR, name: 'loadAllDefaults' })
    }
  }

  async function loadMeasurements() {
    try {
      const measurements = await defaults.generateMeasurements()
      await database.bulkAddMeasurements(measurements)
    } catch (error) {
      silentLog({ error, level: LogLevel.ERROR, name: 'loadMeasurements' })
    }
  }

  async function loadExercises() {
    try {
      const exercises = await defaults.generateExercises()
      await database.bulkAddExercises(exercises)
    } catch (error) {
      silentLog({ error, level: LogLevel.ERROR, name: 'loadExercises' })
    }
  }

  async function loadWorkouts() {
    try {
      const workouts = await defaults.generateWorkouts()
      await database.bulkAddWorkouts(workouts)
    } catch (error) {
      silentLog({ error, level: LogLevel.ERROR, name: 'loadWorkouts' })
    }
  }

  return {
    loadAllDefaults,
    loadMeasurements,
    loadExercises,
    loadWorkouts,
  }
}
