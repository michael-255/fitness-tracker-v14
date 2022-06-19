import { describe, test, expect } from 'vitest'
import { AppLog } from '@/models/AppLog'
import { LogLevel } from '@/constants/enums'

describe('AppLog', () => {
  const testErrorName = 'test-error'
  const testError = new Error(testErrorName)
  const testLevel = LogLevel.DEBUG
  const testName = 'test-caller'
  const testDetails = 'test-details'

  test('creates valid app log with all parameters', () => {
    const testFullParams = {
      error: testError,
      level: testLevel,
      name: testName,
      details: testDetails,
    }
    const errorLog = new AppLog(testFullParams)
    expect(errorLog.id).toEqual(expect.any(String))
    expect(errorLog.createdAt).toEqual(expect.any(String))
    expect(errorLog.level).toBe('Debug')
    expect(errorLog.callerName).toBe(testName)
    expect(errorLog.details).toBe(testDetails)
    expect(errorLog.errorName).toBe('Error')
    expect(errorLog.message).toEqual(expect.any(String))
    expect(errorLog.stack).toEqual(expect.any(String))
  })

  test('creates valid app log without any details', () => {
    const testPartialParams = {
      error: testError,
      level: testLevel,
      name: testName,
    }
    const errorLog = new AppLog(testPartialParams)
    expect(errorLog.id).toEqual(expect.any(String))
    expect(errorLog.createdAt).toEqual(expect.any(String))
    expect(errorLog.level).toBe('Debug')
    expect(errorLog.callerName).toBe(testName)
    expect(errorLog.details).toBeUndefined()
    expect(errorLog.errorName).toBe('Error')
    expect(errorLog.message).toEqual(expect.any(String))
    expect(errorLog.stack).toEqual(expect.any(String))
  })

  test('creates valid app log with an empty error', () => {
    const testNoErrorParams = {
      error: {},
      level: testLevel,
      name: testName,
    }
    const errorLog = new AppLog(testNoErrorParams)
    expect(errorLog.id).toEqual(expect.any(String))
    expect(errorLog.createdAt).toEqual(expect.any(String))
    expect(errorLog.level).toBe('Debug')
    expect(errorLog.callerName).toBe(testName)
    expect(errorLog.details).toBeUndefined()
    expect(errorLog.errorName).toBeUndefined()
    expect(errorLog.message).toBeUndefined()
    expect(errorLog.stack).toBeUndefined()
  })

  test('creates valid app log with custom error data', () => {
    const customName = 'custom-name'
    const customMessage = 'custom-message'
    const customStack = 'custom-stack'
    const testCustomErrorParams = {
      error: {
        name: customName,
        message: customMessage,
        stack: customStack,
      },
      level: testLevel,
      name: testName,
      details: testDetails,
    }
    const errorLog = new AppLog(testCustomErrorParams)
    expect(errorLog.id).toEqual(expect.any(String))
    expect(errorLog.createdAt).toEqual(expect.any(String))
    expect(errorLog.level).toBe('Debug')
    expect(errorLog.callerName).toBe(testName)
    expect(errorLog.details).toBe(testDetails)
    expect(errorLog.errorName).toBe(customName)
    expect(errorLog.message).toBe(customMessage)
    expect(errorLog.stack).toBe(customStack)
  })
})
