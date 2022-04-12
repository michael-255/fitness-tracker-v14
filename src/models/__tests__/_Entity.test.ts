import { describe, test, expect } from 'vitest'
import { _Entity } from '../_Entity'

describe('_Entity', () => {
  test('should test _Entity', () => {
    expect(new _Entity()).toBe(false)
  })
})
