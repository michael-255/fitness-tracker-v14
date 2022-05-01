import { describe, test, expect } from 'vitest'
import { useDefaults } from '@/use/useDefaults'

describe('useDefaults', () => {
  const { loadAllDefaults, loadMeasurements, loadExercises, loadWorkouts } = useDefaults()

  test('returned properties are defined', () => {
    expect(loadAllDefaults).toBeDefined()
    expect(loadMeasurements).toBeDefined()
    expect(loadExercises).toBeDefined()
    expect(loadWorkouts).toBeDefined()
  })
})
