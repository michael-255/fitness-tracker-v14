import { describe, test, expect } from 'vitest'
import { WorkoutRecord } from '@/models/WorkoutRecord'

describe('WorkoutRecord', () => {
  const parentId = 'TEST-1234'

  test('requires parentId parameter for constructor', () => {
    const result = new WorkoutRecord({ parentId })
    expect(result.parentId).toBe(parentId)
  })

  test('getDuration should return a duration string or a dash', () => {
    const record1 = new WorkoutRecord({
      parentId,
      createdAt: new Date('01/01/2022').toISOString(),
      finishedAt: new Date('01/02/2022').toISOString(),
    })
    const record2 = new WorkoutRecord({
      parentId,
      createdAt: new Date('01/01/2022').toISOString(),
      finishedAt: new Date('02/01/2022').toISOString(),
    })
    const record3 = new WorkoutRecord({ parentId })

    expect(record1.getDuration()).toBe('1d')
    expect(record2.getDuration()).toBe('31d')
    expect(record3.getDuration()).toBe('-')
  })

  test('getStartDate should return a formatted date string or a dash', () => {
    const record1 = new WorkoutRecord({
      parentId,
      createdAt: new Date('01/01/2022').toISOString(),
    })
    const record2 = new WorkoutRecord({
      parentId,
      createdAt: '',
    })

    expect(record1.getStartDate()).toBe('Sat, Jan 1, 2022')
    expect(record2.getStartDate()).toBe('-')
  })
})
