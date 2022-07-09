import { DBTable, LogLevel } from '@/constants/enums'
import { defaults } from '@/services/DefaultsGenerator'
import { database } from '@/services/LocalDatabase'
import { useLogger } from './useLogger'

const { log } = useLogger()

export function useDefaults() {
  async function loadAllDefaults() {
    try {
      const measurements = await defaults.generateMeasurements()
      const exercises = await defaults.generateExercises()
      const workouts = await defaults.generateWorkouts()
      await database.bulkAdd(DBTable.MEASUREMENTS, measurements)
      await database.bulkAdd(DBTable.EXERCISES, exercises)
      await database.bulkAdd(DBTable.WORKOUTS, workouts)
    } catch (error) {
      log({ error, level: LogLevel.ERROR, name: 'loadAllDefaults' })
    }
  }

  async function loadMeasurements() {
    try {
      const measurements = await defaults.generateMeasurements()
      await database.bulkAdd(DBTable.MEASUREMENTS, measurements)
    } catch (error) {
      log({ error, level: LogLevel.ERROR, name: 'loadMeasurements' })
    }
  }

  async function loadExercises() {
    try {
      const exercises = await defaults.generateExercises()
      await database.bulkAdd(DBTable.EXERCISES, exercises)
    } catch (error) {
      log({ error, level: LogLevel.ERROR, name: 'loadExercises' })
    }
  }

  async function loadWorkouts() {
    try {
      const workouts = await defaults.generateWorkouts()
      await database.bulkAdd(DBTable.WORKOUTS, workouts)
    } catch (error) {
      log({ error, level: LogLevel.ERROR, name: 'loadWorkouts' })
    }
  }

  return {
    loadAllDefaults,
    loadMeasurements,
    loadExercises,
    loadWorkouts,
  }
}
