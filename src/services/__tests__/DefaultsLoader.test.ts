import { describe, test, expect } from 'vitest'
import { DefaultsLoader } from '@/services/DefaultsLoader'

describe('DefaultsLoader', () => {
  const defaultsLoader = new DefaultsLoader()

  test('default measurement id count should match measurement count', async () => {
    const measurementIdCount = Object.keys(defaultsLoader.defaultIds.measurements).length
    const measurementCount = (await defaultsLoader.generateMeasurements()).length
    expect(measurementIdCount).toBe(measurementCount)
  })

  test('default exercise id count should match exercise count', async () => {
    const exerciseIdCount = Object.keys(defaultsLoader.defaultIds.exercises).length
    const exerciseCount = (await defaultsLoader.generateExercises()).length
    expect(exerciseIdCount).toBe(exerciseCount)
  })

  test('default workout id count should match workout count', async () => {
    const workoutIdCount = Object.keys(defaultsLoader.defaultIds.workouts).length
    const workoutCount = (await defaultsLoader.generateWorkouts()).length
    expect(workoutIdCount).toBe(workoutCount)
  })
})
