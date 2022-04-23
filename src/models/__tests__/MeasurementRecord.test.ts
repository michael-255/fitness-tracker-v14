import { describe, test, expect } from 'vitest'
import { MeasurementRecord } from '../MeasurementRecord'

describe('MeasurementRecord', () => {
  const parentId = 'TEST-1234'

  test('requires parentId parameter for constructor', () => {
    const parentId = 'TEST-1234'
    const result = new MeasurementRecord({ parentId })
    expect(result.parentId).toBe(parentId)
  })

  test('getFeetAndInches should return a measurement string or a dash', () => {
    const record1 = new MeasurementRecord({
      parentId,
      inches: 83,
    })
    const record2 = new MeasurementRecord({
      parentId,
      inches: 60,
    })
    const record3 = new MeasurementRecord({ parentId })

    expect(record1.getFeetAndInches()).toBe(`6'11"`)
    expect(record2.getFeetAndInches()).toBe(`5'0"`)
    expect(record3.getFeetAndInches()).toBe('-')
  })
})
