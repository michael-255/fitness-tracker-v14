import { describe, test, expect } from 'vitest'
import { DefaultsGenerator } from '@/services/DefaultsGenerator'

describe('DefaultsGenerator', () => {
  const defaultsGenerator = new DefaultsGenerator()

  test('default measurement id count should match measurement count', async () => {
    const measurementIdCount = Object.keys(defaultsGenerator.defaultIds.measurements).length
    const measurementCount = (await defaultsGenerator.generateMeasurements()).length
    expect(measurementIdCount).toBe(measurementCount)
  })

  test('default exercise id count should match exercise count', async () => {
    const exerciseIdCount = Object.keys(defaultsGenerator.defaultIds.exercises).length
    const exerciseCount = (await defaultsGenerator.generateExercises()).length
    expect(exerciseIdCount).toBe(exerciseCount)
  })

  test('default workout id count should match workout count', async () => {
    const workoutIdCount = Object.keys(defaultsGenerator.defaultIds.workouts).length
    const workoutCount = (await defaultsGenerator.generateWorkouts()).length
    expect(workoutIdCount).toBe(workoutCount)
  })
})
