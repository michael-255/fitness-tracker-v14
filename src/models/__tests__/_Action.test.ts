import { describe, test, expect } from 'vitest'
import { _Action } from '../_Action'

describe('_Action', () => {
  test('should test _Action', () => {
    expect(new _Action()).toBe(false)
  })
})
