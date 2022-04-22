import { describe, test, expect, beforeEach, vi } from 'vitest'
import { LocalDatabase } from '../LocalDatabase'
import { ActionStatus } from '../../models/_Action'

describe('LocalDatabase', () => {
  let db: any
  const testId = 'test-id-123'
  const testIds = [testId, testId, testId]
  const testName = 'Test Name'
  const testStatus = ActionStatus.ARCHIVED
  const toArrayMock = vi.fn()
  const firstMock = vi.fn()
  const lastMock = vi.fn()
  const filterMock = vi.fn()
  const sortByMock = vi.fn().mockResolvedValue([])
  const bulkGetMock = vi.fn(() => ({ filter: filterMock }))
  const equalsIgnoreCaseMock = vi.fn(() => ({
    toArray: toArrayMock,
    first: firstMock,
    sortBy: sortByMock,
  }))
  const whereMock = vi.fn(() => ({ equalsIgnoreCase: equalsIgnoreCaseMock }))
  const orderByMock = vi.fn(() => ({ first: firstMock, last: lastMock }))

  const tableMockSetup = () => ({
    toArray: toArrayMock,
    where: whereMock,
    bulkGet: bulkGetMock,
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
    db.getActiveWorkoutById(testId)
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

  test('getWorkoutExercises calls correct Dexie methods with parameter', () => {
    db.getWorkoutExercises(testIds)
    expect(bulkGetMock).toHaveBeenCalledWith(testIds)
  })

  test('getWorkoutActiveExercises calls correct Dexie methods with parameter', () => {
    db.getWorkoutActiveExercises(testIds)
    expect(bulkGetMock).toHaveBeenCalledWith(testIds)
  })

  test('getMeasurementRecordsByParentId calls correct Dexie methods with parameter', () => {
    db.getMeasurementRecordsByParentId(testId)
    expect(whereMock).toHaveBeenCalledWith('parentId')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(sortByMock).toHaveBeenCalledWith('createdAt')
  })

  test('getExerciseRecordsByParentId calls correct Dexie methods with parameter', () => {
    db.getExerciseRecordsByParentId(testId)
    expect(whereMock).toHaveBeenCalledWith('parentId')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(sortByMock).toHaveBeenCalledWith('createdAt')
  })

  test('getWorkoutRecordsByParentId calls correct Dexie methods with parameter', () => {
    db.getWorkoutRecordsByParentId(testId)
    expect(whereMock).toHaveBeenCalledWith('parentId')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(sortByMock).toHaveBeenCalledWith('createdAt')
  })

  test('getNewestMeasurementRecordByParentId calls correct Dexie methods with parameter', () => {
    db.getNewestMeasurementRecordByParentId(testId)
    expect(whereMock).toHaveBeenCalledWith('parentId')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(sortByMock).toHaveBeenCalledWith('createdAt')
  })

  test('getNewestExerciseRecordByParentId calls correct Dexie methods with parameter', () => {
    db.getNewestExerciseRecordByParentId(testId)
    expect(whereMock).toHaveBeenCalledWith('parentId')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(sortByMock).toHaveBeenCalledWith('createdAt')
  })

  test('getNewestWorkoutRecordByParentId calls correct Dexie methods with parameter', () => {
    db.getNewestWorkoutRecordByParentId(testId)
    expect(whereMock).toHaveBeenCalledWith('parentId')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(sortByMock).toHaveBeenCalledWith('createdAt')
  })

  test('getMeasurementsByStatus calls correct Dexie methods with parameter', () => {
    db.getMeasurementsByStatus(testStatus)
    expect(whereMock).toHaveBeenCalledWith('status')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testStatus)
    expect(toArrayMock).toHaveBeenCalled()
  })

  test('getExercisesByStatus calls correct Dexie methods with parameter', () => {
    db.getExercisesByStatus(testStatus)
    expect(whereMock).toHaveBeenCalledWith('status')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testStatus)
    expect(toArrayMock).toHaveBeenCalled()
  })

  test('getWorkoutsByStatus calls correct Dexie methods with parameter', () => {
    db.getWorkoutsByStatus(testStatus)
    expect(whereMock).toHaveBeenCalledWith('status')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testStatus)
    expect(toArrayMock).toHaveBeenCalled()
  })
})
