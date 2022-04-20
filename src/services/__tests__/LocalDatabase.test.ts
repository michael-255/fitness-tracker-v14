import { describe, test, expect, beforeEach, vi } from 'vitest'
import { LocalDatabase } from '../LocalDatabase'

describe('LocalDatabase', () => {
  let db: any
  const testId = 'test-id-123'
  const testName = 'Test Name'
  const toArrayMock = vi.fn()
  const firstMock = vi.fn()
  const lastMock = vi.fn()
  const equalsIgnoreCaseMock = vi.fn(() => ({ toArray: toArrayMock, first: firstMock }))
  const whereMock = vi.fn(() => ({ equalsIgnoreCase: equalsIgnoreCaseMock }))
  const orderByMock = vi.fn(() => ({ first: firstMock, last: lastMock }))

  const tableMockSetup = () => ({
    toArray: toArrayMock,
    where: whereMock,
  })

  beforeEach(() => {
    db = new LocalDatabase('TestDatabase')

    db.measurements = tableMockSetup()
    db.exercises = tableMockSetup()
    db.workouts = tableMockSetup()
    db.measurementRecords = tableMockSetup()
    db.exerciseRecords = tableMockSetup()
    db.workoutRecords = tableMockSetup()
    db.activeExercises = tableMockSetup()
    db.activeWorkouts = tableMockSetup()

    vi.clearAllMocks()
  })

  test('getAllMeasurements calls correct Dexie methods', () => {
    db.getAllMeasurements()
    expect(toArrayMock).toHaveBeenCalled()
  })

  test('getAllExercises calls correct Dexie methods', () => {
    db.getAllExercises()
    expect(toArrayMock).toHaveBeenCalled()
  })

  test('getAllWorkouts calls correct Dexie methods', () => {
    db.getAllWorkouts()
    expect(toArrayMock).toHaveBeenCalled()
  })

  test('getAllMeasurementRecords calls correct Dexie methods', () => {
    db.getAllMeasurementRecords()
    expect(toArrayMock).toHaveBeenCalled()
  })

  test('getAllExerciseRecords calls correct Dexie methods', () => {
    db.getAllExerciseRecords()
    expect(toArrayMock).toHaveBeenCalled()
  })

  test('getAllWorkoutRecords calls correct Dexie methods', () => {
    db.getAllWorkoutRecords()
    expect(toArrayMock).toHaveBeenCalled()
  })

  test('getAllActiveExercises calls correct Dexie methods', () => {
    db.getAllActiveExercises()
    expect(toArrayMock).toHaveBeenCalled()
  })

  test('getAllActiveWorkouts calls correct Dexie methods', () => {
    db.getAllActiveWorkouts()
    expect(toArrayMock).toHaveBeenCalled()
  })

  test('getMeasurementById calls correct Dexie methods with parameter', () => {
    db.getMeasurementById(testId)
    expect(whereMock).toHaveBeenCalledWith('id')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(firstMock).toHaveBeenCalled()
  })

  test('getExercise calls correct Dexie methods with parameter', () => {
    db.getExerciseById(testId)
    expect(whereMock).toHaveBeenCalledWith('id')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(firstMock).toHaveBeenCalled()
  })

  test('getWorkoutById calls correct Dexie methods with parameter', () => {
    db.getWorkoutById(testId)
    expect(whereMock).toHaveBeenCalledWith('id')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(firstMock).toHaveBeenCalled()
  })

  test('getMeasurementRecordById calls correct Dexie methods with parameter', () => {
    db.getMeasurementRecordById(testId)
    expect(whereMock).toHaveBeenCalledWith('id')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(firstMock).toHaveBeenCalled()
  })

  test('getExerciseRecordById calls correct Dexie methods with parameter', () => {
    db.getExerciseRecordById(testId)
    expect(whereMock).toHaveBeenCalledWith('id')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(firstMock).toHaveBeenCalled()
  })

  test('getWorkoutRecordById calls correct Dexie methods with parameter', () => {
    db.getWorkoutRecordById(testId)
    expect(whereMock).toHaveBeenCalledWith('id')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(firstMock).toHaveBeenCalled()
  })

  test('getActiveExercise calls correct Dexie methods with parameter', () => {
    db.getActiveExerciseById(testId)
    expect(whereMock).toHaveBeenCalledWith('id')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(firstMock).toHaveBeenCalled()
  })

  test('getActiveWorkoutById calls correct Dexie methods with parameter', () => {
    db.getWorkoutRecordById(testId)
    expect(whereMock).toHaveBeenCalledWith('id')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(firstMock).toHaveBeenCalled()
  })

  test('getExercisesByName calls correct Dexie methods with parameter', () => {
    db.getExercisesByName(testName)
    expect(whereMock).toHaveBeenCalledWith('name')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testName)
    expect(toArrayMock).toHaveBeenCalled()
  })
})
