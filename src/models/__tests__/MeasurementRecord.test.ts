import { describe, test, expect } from 'vitest'
import { MeasurementRecord } from '../MeasurementRecord'

describe('MeasurementRecord', () => {
  test('requires parentId parameter for constructor', () => {
    const parentId = 'TEST-1234'
    const result = new MeasurementRecord({ parentId })
    expect(result.parentId).toBe(parentId)
  })
})
