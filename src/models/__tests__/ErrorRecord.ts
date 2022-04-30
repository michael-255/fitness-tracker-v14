import { describe, test, expect } from 'vitest'
import { ErrorLog } from '@/models/ErrorLog'

describe('ErrorLog', () => {
  test('should test ErrorLog', () => {
    expect(new ErrorLog('Test')).toBe(false)
  })
})
