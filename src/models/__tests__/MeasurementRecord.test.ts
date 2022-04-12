import { describe, test, expect } from 'vitest'
import { MeasurementRecord } from '../MeasurementRecord'

describe('MeasurementRecord', () => {
  test('should test MeasurementRecord', () => {
    expect(new MeasurementRecord()).toBe(false)
  })
})
