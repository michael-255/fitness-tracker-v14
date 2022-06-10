import { LogLevel } from '@/models/AppLog'
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
    } catch (err) {
      silentLog(err, LogLevel.ERROR, 'loadAllDefaults')
    }
  }

  async function loadMeasurements() {
    try {
      const measurements = await defaults.generateMeasurements()
      await database.bulkAddMeasurements(measurements)
    } catch (err) {
      silentLog(err, LogLevel.ERROR, 'loadMeasurements')
    }
  }

  async function loadExercises() {
    try {
      const exercises = await defaults.generateExercises()
      await database.bulkAddExercises(exercises)
    } catch (err) {
      silentLog(err, LogLevel.ERROR, 'loadExercises')
    }
  }

  async function loadWorkouts() {
    try {
      const workouts = await defaults.generateWorkouts()
      await database.bulkAddWorkouts(workouts)
    } catch (err) {
      silentLog(err, LogLevel.ERROR, 'loadWorkouts')
    }
  }

  return {
    loadAllDefaults,
    loadMeasurements,
    loadExercises,
    loadWorkouts,
  }
}
