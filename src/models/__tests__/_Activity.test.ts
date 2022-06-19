import { describe, test, expect } from 'vitest'
import { _Activity } from '@/models/_Activity'

describe('_Activity', () => {
  test('requires name parameter for constructor', () => {
    const name = 'Test Activity Name'
    const result = new _Activity({ name })
    expect(result.name).toBeDefined()
  })
})
