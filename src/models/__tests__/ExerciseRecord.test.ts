import { describe, test, expect } from 'vitest'
import { ExerciseRecord } from '@/models/ExerciseRecord'

describe('ExerciseRecord', () => {
  test('requires parentId parameter for constructor', () => {
    const parentId = 'TEST-1234'
    const result = new ExerciseRecord({ parentId })
    expect(result.parentId).toBe(parentId)
  })
})
