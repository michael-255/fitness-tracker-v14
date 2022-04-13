import { describe, test, expect } from 'vitest'
import { Exercise } from '../Exercise'

describe('Exercise', () => {
  test('requires name parameter for constructor', () => {
    const name = 'Test Exercise Name'
    const result = new Exercise({ name })
    expect(result.name).toBeDefined()
  })
})
