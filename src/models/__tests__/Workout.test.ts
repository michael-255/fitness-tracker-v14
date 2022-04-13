import { describe, test, expect } from 'vitest'
import { Workout } from '../Workout'

describe('Workout', () => {
  test('requires name parameter for constructor', () => {
    const name = 'Test Workout Name'
    const result = new Workout({ name })
    expect(result.name).toBeDefined()
  })
})
