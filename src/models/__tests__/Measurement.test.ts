import { describe, test, expect } from 'vitest'
import { Measurement } from '../Measurement'

describe('Measurement', () => {
  test('should test Measurement', () => {
    expect(new Measurement()).toBe(false)
  })
})
