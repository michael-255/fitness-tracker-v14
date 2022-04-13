import { describe, test, expect } from 'vitest'
import { _Record } from '../_Record'

describe('_Record', () => {
  test('requires parentId parameter for constructor', () => {
    const parentId = 'TEST-1234'
    const result = new _Record({ parentId })
    expect(result.parentId).toBe(parentId)
  })
})
