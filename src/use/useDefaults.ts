import { defaults } from '@/services/DefaultsGenerator'
import { database } from '@/services/LocalDatabase'
import { logger } from '@/services/Logger'

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
      logger.error(err)
      database.addAppLog(err, new Error('loadAllDefaults'))
    }
  }

  async function loadMeasurements() {
    try {
      const measurements = await defaults.generateMeasurements()
      await database.bulkAddMeasurements(measurements)
    } catch (err) {
      logger.error(err)
      database.addAppLog(err, new Error('loadMeasurements'))
    }
  }

  async function loadExercises() {
    try {
      const exercises = await defaults.generateExercises()
      await database.bulkAddExercises(exercises)
    } catch (err) {
      logger.error(err)
      database.addAppLog(err, new Error('loadExercises'))
    }
  }

  async function loadWorkouts() {
    try {
      const workouts = await defaults.generateWorkouts()
      await database.bulkAddWorkouts(workouts)
    } catch (err) {
      logger.error(err)
      database.addAppLog(err, new Error('loadWorkouts'))
    }
  }

  return {
    loadAllDefaults,
    loadMeasurements,
    loadExercises,
    loadWorkouts,
  }
}
