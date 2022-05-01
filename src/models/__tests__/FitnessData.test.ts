import { describe, test, expect } from 'vitest'
import { FitnessData } from '../FitnessData'

describe('FitnessData', () => {
  test('should create FitnessData object', () => {
    const fitnessData = new FitnessData()
    expect(fitnessData.measurements).toEqual([])
    expect(fitnessData.exercises).toEqual([])
    expect(fitnessData.workouts).toEqual([])
    expect(fitnessData.measurementRecords).toEqual([])
    expect(fitnessData.exerciseRecords).toEqual([])
    expect(fitnessData.workoutRecords).toEqual([])
    expect(fitnessData.activeExercises).toEqual([])
    expect(fitnessData.activeWorkouts).toEqual([])
    expect(fitnessData.appLogs).toEqual([])
  })
})
