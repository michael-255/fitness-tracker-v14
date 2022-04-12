import { describe, test, expect } from 'vitest'
import { Exercise } from '../Exercise'

describe('Exercise', () => {
  test('should test Exercise', () => {
    expect(new Exercise()).toBe(false)
  })
})
