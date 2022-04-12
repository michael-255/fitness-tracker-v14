import { describe, test, expect } from 'vitest'
import { ExerciseRecord } from '../ExerciseRecord'

describe('ExerciseRecord', () => {
  test('should test ExerciseRecord', () => {
    expect(new ExerciseRecord()).toBe(false)
  })
})
