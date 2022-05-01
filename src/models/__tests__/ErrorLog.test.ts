import { describe, test, expect } from 'vitest'
import { ErrorLog } from '@/models/ErrorLog'

describe('ErrorLog', () => {
  test('handles a single Error as a parameter for the constructor', () => {
    const msg = 'test-error-1'
    const newError = new Error(msg)
    const errorLog = new ErrorLog(newError)
    expect(errorLog.id).toEqual(expect.any(String))
    expect(errorLog.createdAt).toEqual(expect.any(String))
    expect(errorLog.name).toEqual('Error:undefined')
    expect(errorLog.failures).toBeUndefined()
    expect(errorLog.failuresByPos).toBeUndefined()
    expect(errorLog.inner).toBeUndefined()
    expect(errorLog.message).toEqual([msg])
    expect(errorLog.stack).toEqual(expect.any(Array))
  })

  test('handles two Errors as parameters for the constructor', () => {
    const msg = 'test-error-1'
    const newError = new Error(msg)
    const msg2 = 'test-error-2'
    const newError2 = new Error(msg2)
    const errorLog = new ErrorLog(newError, newError2)
    expect(errorLog.id).toEqual(expect.any(String))
    expect(errorLog.createdAt).toEqual(expect.any(String))
    expect(errorLog.name).toEqual('Error:Error')
    expect(errorLog.failures).toBeUndefined()
    expect(errorLog.failuresByPos).toBeUndefined()
    expect(errorLog.inner).toBeUndefined()
    expect(errorLog.message).toEqual([msg, msg2])
    expect(errorLog.stack).toEqual(expect.any(Array))
  })
})
