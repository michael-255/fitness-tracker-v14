import { describe, test, expect } from 'vitest'
import { ErrorRecord } from '@/models/ErrorRecord'

describe('ErrorRecord', () => {
  test('should test ErrorRecord', () => {
    expect(new ErrorRecord('Test')).toBe(false)
  })
})
