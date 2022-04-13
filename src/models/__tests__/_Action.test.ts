import { describe, test, expect } from 'vitest'
import { _Action } from '../_Action'

describe('_Action', () => {
  test('requires name parameter for constructor', () => {
    const name = 'Test Action Name'
    const result = new _Action({ name })
    expect(result.name).toBeDefined()
  })
})
