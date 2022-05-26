import { describe, test, expect } from 'vitest'
import { AppLog } from '@/models/AppLog'

describe('AppLog', () => {
  const caughtMsg = 'caught-error-test'
  const localMsg = 'local-error-test'
  const caughtError = new Error(caughtMsg)
  const localError = new Error(localMsg)

  test('creates log with invalid caughtError parameter', () => {
    const errorLog = new AppLog(null)
    expect(errorLog.id).toEqual(expect.any(String))
    expect(errorLog.createdAt).toEqual(expect.any(String))
    expect(errorLog.name).toEqual('undefined:undefined')
    expect(errorLog.data).toBeUndefined()
    expect(errorLog.message).toEqual([])
    expect(errorLog.stack).toEqual([])
  })

  test('creates log with valid caughtError parameter', () => {
    const errorLog = new AppLog(caughtError)
    expect(errorLog.id).toEqual(expect.any(String))
    expect(errorLog.createdAt).toEqual(expect.any(String))
    expect(errorLog.name).toEqual('undefined:Error')
    expect(errorLog.data).toBeUndefined()
    expect(errorLog.message).toEqual([caughtMsg])
    expect(errorLog.stack).toEqual(expect.any(Array))
  })

  test('creates log with two valid error parameters', () => {
    const errorLog = new AppLog(caughtError, localError)
    expect(errorLog.id).toEqual(expect.any(String))
    expect(errorLog.createdAt).toEqual(expect.any(String))
    expect(errorLog.name).toEqual(`${localMsg}:Error`)
    expect(errorLog.data).toBeUndefined()
    expect(errorLog.message).toEqual([localMsg, caughtMsg])
    expect(errorLog.stack).toEqual(expect.any(Array))
  })

  test('creates log with invalid caughtError and valid localError parameters', () => {
    const errorLog = new AppLog(null, localError)
    expect(errorLog.id).toEqual(expect.any(String))
    expect(errorLog.createdAt).toEqual(expect.any(String))
    expect(errorLog.name).toEqual(`${localMsg}:undefined`)
    expect(errorLog.data).toBeUndefined()
    expect(errorLog.message).toEqual([localMsg])
    expect(errorLog.stack).toEqual(expect.any(Array))
  })
})
