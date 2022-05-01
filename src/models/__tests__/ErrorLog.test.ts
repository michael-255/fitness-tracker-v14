import { describe, test, expect } from 'vitest'
import { ErrorLog } from '@/models/ErrorLog'

describe('ErrorLog', () => {
  const caughtMsg = 'caught-error-test'
  const localMsg = 'local-error-test'
  const caughtError = new Error(caughtMsg)
  const localError = new Error(localMsg)

  test('creates log with invalid caughtError parameter', () => {
    const errorLog = new ErrorLog(null)
    expect(errorLog.id).toEqual(expect.any(String))
    expect(errorLog.createdAt).toEqual(expect.any(String))
    expect(errorLog.name).toEqual('undefined:undefined')
    expect(errorLog.failures).toBeUndefined()
    expect(errorLog.failuresByPos).toBeUndefined()
    expect(errorLog.inner).toBeUndefined()
    expect(errorLog.message).toEqual([])
    expect(errorLog.stack).toEqual([])
  })

  test('creates log with valid caughtError parameter', () => {
    const errorLog = new ErrorLog(caughtError)
    expect(errorLog.id).toEqual(expect.any(String))
    expect(errorLog.createdAt).toEqual(expect.any(String))
    expect(errorLog.name).toEqual('undefined:Error')
    expect(errorLog.failures).toBeUndefined()
    expect(errorLog.failuresByPos).toBeUndefined()
    expect(errorLog.inner).toBeUndefined()
    expect(errorLog.message).toEqual([caughtMsg])
    expect(errorLog.stack).toEqual(expect.any(Array))
  })

  test('creates log with two valid error parameters', () => {
    const errorLog = new ErrorLog(caughtError, localError)
    expect(errorLog.id).toEqual(expect.any(String))
    expect(errorLog.createdAt).toEqual(expect.any(String))
    expect(errorLog.name).toEqual(`${localMsg}:Error`)
    expect(errorLog.failures).toBeUndefined()
    expect(errorLog.failuresByPos).toBeUndefined()
    expect(errorLog.inner).toBeUndefined()
    expect(errorLog.message).toEqual([localMsg, caughtMsg])
    expect(errorLog.stack).toEqual(expect.any(Array))
  })

  test('creates log with invalid caughtError and valid localError parameters', () => {
    const errorLog = new ErrorLog(null, localError)
    expect(errorLog.id).toEqual(expect.any(String))
    expect(errorLog.createdAt).toEqual(expect.any(String))
    expect(errorLog.name).toEqual(`${localMsg}:undefined`)
    expect(errorLog.failures).toBeUndefined()
    expect(errorLog.failuresByPos).toBeUndefined()
    expect(errorLog.inner).toBeUndefined()
    expect(errorLog.message).toEqual([localMsg])
    expect(errorLog.stack).toEqual(expect.any(Array))
  })
})
