import { describe, test, expect } from 'vitest'
import { Measurement } from '@/models/Measurement'

describe('Measurement', () => {
  test('requires name parameter for constructor', () => {
    const name = 'Test Measurement Name'
    const result = new Measurement({ name })
    expect(result.name).toBeDefined()
  })
})
