import { describe, test, expect } from 'vitest'
import { ErrorLog } from '@/models/ErrorLog'

describe('ErrorLog', () => {
  test('handles Error as a parameter for constructor', () => {
    const msg = 'test-error-1'
    const newError = new Error(msg)
    const errorLog = new ErrorLog(newError)
    expect(errorLog.id).toBeDefined()
    expect(errorLog.createdAt).toBeDefined()
    expect(errorLog.details).toBe(null)
    expect(errorLog.message).toEqual([msg])
    expect(errorLog.stack).toBeDefined()
  })

  test('handles string as a parameter for constructor', () => {
    const msg = 'test-error-2'
    const errorLog = new ErrorLog(msg)
    expect(errorLog.id).toBeDefined()
    expect(errorLog.createdAt).toBeDefined()
    expect(errorLog.details).toBe(null)
    expect(errorLog.message).toEqual([msg])
    expect(errorLog.stack).toBeDefined()
  })

  test('handles undefined as a parameter for constructor', () => {
    const msg = undefined
    const errorLog = new ErrorLog(msg)
    expect(errorLog.id).toBeDefined()
    expect(errorLog.createdAt).toBeDefined()
    expect(errorLog.details).toBe(null)
    expect(errorLog.message).toEqual(['Undefined App Error.'])
    expect(errorLog.stack).toBeDefined()
  })

  test('handles unknown data as a parameter for constructor', () => {
    const obj = { unknown: 'test-data' }
    const errorLog = new ErrorLog(obj)
    expect(errorLog.id).toBeDefined()
    expect(errorLog.createdAt).toBeDefined()
    expect(errorLog.details).toBe(obj)
    expect(errorLog.message).toEqual(['Unexpected data passed into App Error.'])
    expect(errorLog.stack).toBeDefined()
  })
})
