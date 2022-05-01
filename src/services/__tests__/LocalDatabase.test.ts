import { describe, test, expect, beforeEach, vi } from 'vitest'
import { LocalDatabase } from '@/services/LocalDatabase'
import { Store } from '@/constants'

const mockTableBuilder = ({
  toArrayMockFunc = vi.fn(),
  whereMockFunc = vi.fn(),
  bulkGetMockFunc = vi.fn(),
  addMockFunc = vi.fn(),
  updateMockFunc = vi.fn(),
  deleteMockFunc = vi.fn(),
  clearMockFunc = vi.fn(),
  bulkAddMockFunc = vi.fn(),
}) => {
  return vi.fn(() => ({
    toArray: toArrayMockFunc,
    where: whereMockFunc,
    bulkGet: bulkGetMockFunc,
    add: addMockFunc,
    update: updateMockFunc,
    delete: deleteMockFunc,
    clear: clearMockFunc,
    bulkAdd: bulkAddMockFunc,
  }))
}

const mockBulkGetBuilder = (filterMockFunc = vi.fn()) => {
  return vi.fn(() => ({
    filter: filterMockFunc,
  }))
}

const mockWhereBuilder = (equalsIgnoreCaseMockFunc = vi.fn()) => {
  return vi.fn(() => ({
    equalsIgnoreCase: equalsIgnoreCaseMockFunc,
  }))
}

const mockEqualsIgnoreCaseBuilder = ({
  toArrayMockFunc = vi.fn(),
  firstMockFunc = vi.fn(),
  sortByMockFunc = vi.fn(),
}) => {
  return vi.fn(() => ({
    toArray: toArrayMockFunc,
    first: firstMockFunc,
    sortBy: sortByMockFunc,
  }))
}

describe('LocalDatabase', () => {
  let db: any
  const testStore = 'testing'
  const testId = 'test-id-123'
  const testIds = [testId, testId, testId]
  const testName = 'Test Name'

  const toArrayMock = vi.fn()
  const firstMock = vi.fn()
  const filterMock = vi.fn()
  const addMock = vi.fn()
  const updateMock = vi.fn()
  const deleteMock = vi.fn()
  const clearMock = vi.fn()
  const sortByMock = vi.fn().mockResolvedValue([])
  const bulkAddMock = vi.fn()

  const equalsIgnoreCaseMock = mockEqualsIgnoreCaseBuilder({
    toArrayMockFunc: toArrayMock,
    firstMockFunc: firstMock,
    sortByMockFunc: sortByMock,
  })
  const whereMock = mockWhereBuilder(equalsIgnoreCaseMock)
  const bulkGetMock = mockBulkGetBuilder(filterMock)

  const tableMock = mockTableBuilder({
    toArrayMockFunc: toArrayMock,
    whereMockFunc: whereMock,
    bulkGetMockFunc: bulkGetMock,
    addMockFunc: addMock,
    updateMockFunc: updateMock,
    deleteMockFunc: deleteMock,
    clearMockFunc: clearMock,
    bulkAddMockFunc: bulkAddMock,
  })

  beforeEach(() => {
    db = new LocalDatabase('TestDatabase')
    db.table = tableMock
    vi.clearAllMocks()
  })

  //
  // Shared Methods
  //

  test('getAll calls correct Dexie methods', () => {
    db.getAll(testStore)
    expect(tableMock).toHaveBeenCalledWith(testStore)
    expect(toArrayMock).toHaveBeenCalled()
  })

  test('getById calls correct Dexie methods', () => {
    db.getById(testStore, testId)
    expect(tableMock).toHaveBeenCalledWith(testStore)
    expect(whereMock).toHaveBeenCalledWith('id')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(firstMock).toHaveBeenCalled()
  })

  test('getByStatus calls correct Dexie methods', () => {
    db.getByStatus(testStore, 'ARCHIVED')
    expect(tableMock).toHaveBeenCalledWith(testStore)
    expect(whereMock).toHaveBeenCalledWith('status')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith('ARCHIVED')
    expect(toArrayMock).toHaveBeenCalled()
  })

  test('getByName calls correct Dexie methods', () => {
    db.getByName(testStore, testName)
    expect(tableMock).toHaveBeenCalledWith(testStore)
    expect(whereMock).toHaveBeenCalledWith('name')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testName)
    expect(toArrayMock).toHaveBeenCalled()
  })

  test('getByParentId calls correct Dexie methods', () => {
    db.getByParentId(testStore, testId)
    expect(tableMock).toHaveBeenCalledWith(testStore)
    expect(whereMock).toHaveBeenCalledWith('parentId')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(sortByMock).toHaveBeenCalledWith('createdAt')
  })

  test('getNewestByParentId calls correct Dexie methods', () => {
    db.getNewestByParentId(testStore, testId)
    expect(tableMock).toHaveBeenCalledWith(testStore)
    expect(whereMock).toHaveBeenCalledWith('parentId')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(sortByMock).toHaveBeenCalledWith('createdAt')
  })

  test('bulkGetByIds calls correct Dexie methods', () => {
    db.bulkGetByIds(testStore, testIds)
    expect(tableMock).toHaveBeenCalledWith(testStore)
    expect(bulkGetMock).toHaveBeenCalledWith(testIds)
  })

  test('deleteById calls correct Dexie methods', () => {
    db.deleteById(testStore, testId)
    expect(tableMock).toHaveBeenCalledWith(testStore)
    expect(deleteMock).toHaveBeenCalledWith(testId)
  })

  test('clear calls correct Dexie methods', () => {
    db.clear(testStore)
    expect(tableMock).toHaveBeenCalledWith(testStore)
    expect(clearMock).toHaveBeenCalled()
  })

  //
  // Measurement
  //

  test('addMeasurement calls correct Dexie methods', () => {
    db.addMeasurement({})
    expect(tableMock).toHaveBeenCalledWith(Store.MEASUREMENTS)
    expect(addMock).toHaveBeenCalledWith({})
  })

  test('bulkAddMeasurements calls correct Dexie methods', () => {
    db.bulkAddMeasurements(testIds)
    expect(tableMock).toHaveBeenCalledWith(Store.MEASUREMENTS)
    expect(bulkAddMock).toHaveBeenCalledWith(testIds)
  })

  test('updateMeasurementById calls correct Dexie methods', () => {
    const id = testId
    const properties = { name: testName }
    db.updateMeasurementById(id, properties)
    expect(tableMock).toHaveBeenCalledWith(Store.MEASUREMENTS)
    expect(updateMock).toHaveBeenCalledWith(id, properties)
  })

  //
  // MeasurementRecord
  //

  test('addMeasurementRecord calls correct Dexie methods', () => {
    db.addMeasurementRecord({})
    expect(tableMock).toHaveBeenCalledWith(Store.MEASUREMENT_RECORDS)
    expect(addMock).toHaveBeenCalledWith({})
  })

  test('bulkAddMeasurementRecords calls correct Dexie methods', () => {
    db.bulkAddMeasurementRecords(testIds)
    expect(tableMock).toHaveBeenCalledWith(Store.MEASUREMENT_RECORDS)
    expect(bulkAddMock).toHaveBeenCalledWith(testIds)
  })

  test('updateMeasurementRecordById calls correct Dexie methods', () => {
    const id = testId
    const properties = { name: testName }
    db.updateMeasurementRecordById(id, properties)
    expect(tableMock).toHaveBeenCalledWith(Store.MEASUREMENT_RECORDS)
    expect(updateMock).toHaveBeenCalledWith(id, properties)
  })

  //
  // Exercise
  //

  test('addExercise calls correct Dexie methods', () => {
    db.addExercise({})
    expect(tableMock).toHaveBeenCalledWith(Store.EXERCISES)
    expect(addMock).toHaveBeenCalledWith({})
  })

  test('bulkAddExercises calls correct Dexie methods', () => {
    db.bulkAddExercises(testIds)
    expect(tableMock).toHaveBeenCalledWith(Store.EXERCISES)
    expect(bulkAddMock).toHaveBeenCalledWith(testIds)
  })

  test('updateExerciseById calls correct Dexie methods', () => {
    const id = testId
    const properties = { name: testName }
    db.updateExerciseById(id, properties)
    expect(tableMock).toHaveBeenCalledWith(Store.EXERCISES)
    expect(updateMock).toHaveBeenCalledWith(id, properties)
  })

  //
  // ExerciseRecord
  //

  test('addExerciseRecord calls correct Dexie methods', () => {
    db.addExerciseRecord({})
    expect(tableMock).toHaveBeenCalledWith(Store.EXERCISE_RECORDS)
    expect(addMock).toHaveBeenCalledWith({})
  })

  test('bulkAddExerciseRecords calls correct Dexie methods', () => {
    db.bulkAddExerciseRecords(testIds)
    expect(tableMock).toHaveBeenCalledWith(Store.EXERCISE_RECORDS)
    expect(bulkAddMock).toHaveBeenCalledWith(testIds)
  })

  test('updateExerciseRecordById calls correct Dexie methods', () => {
    const id = testId
    const properties = { name: testName }
    db.updateExerciseRecordById(id, properties)
    expect(tableMock).toHaveBeenCalledWith(Store.EXERCISE_RECORDS)
    expect(updateMock).toHaveBeenCalledWith(id, properties)
  })

  //
  // Workouts
  //

  test('addWorkout calls correct Dexie methods', () => {
    db.addWorkout({})
    expect(tableMock).toHaveBeenCalledWith(Store.WORKOUTS)
    expect(addMock).toHaveBeenCalledWith({})
  })

  test('bulkAddWorkouts calls correct Dexie methods', () => {
    db.bulkAddWorkouts(testIds)
    expect(tableMock).toHaveBeenCalledWith(Store.WORKOUTS)
    expect(bulkAddMock).toHaveBeenCalledWith(testIds)
  })

  test('updateWorkoutById calls correct Dexie methods', () => {
    const id = testId
    const properties = { name: testName }
    db.updateWorkoutById(id, properties)
    expect(tableMock).toHaveBeenCalledWith(Store.WORKOUTS)
    expect(updateMock).toHaveBeenCalledWith(id, properties)
  })

  //
  // WorkoutRecord
  //

  test('addWorkoutRecord calls correct Dexie methods', () => {
    db.addWorkoutRecord({})
    expect(tableMock).toHaveBeenCalledWith(Store.WORKOUT_RECORDS)
    expect(addMock).toHaveBeenCalledWith({})
  })

  test('bulkAddWorkoutRecords calls correct Dexie methods', () => {
    db.bulkAddWorkoutRecords(testIds)
    expect(tableMock).toHaveBeenCalledWith(Store.WORKOUT_RECORDS)
    expect(bulkAddMock).toHaveBeenCalledWith(testIds)
  })

  test('updateWorkoutRecordById calls correct Dexie methods', () => {
    const id = testId
    const properties = { name: testName }
    db.updateWorkoutRecordById(id, properties)
    expect(tableMock).toHaveBeenCalledWith(Store.WORKOUT_RECORDS)
    expect(updateMock).toHaveBeenCalledWith(id, properties)
  })

  //
  // ActiveExercises (ExerciseRecord)
  //

  test('addActiveExercise calls correct Dexie methods', () => {
    db.addActiveExercise({})
    expect(tableMock).toHaveBeenCalledWith(Store.ACTIVE_EXERCISES)
    expect(addMock).toHaveBeenCalledWith({})
  })

  test('bulkAddActiveExercises calls correct Dexie methods', () => {
    db.bulkAddActiveExercises(testIds)
    expect(tableMock).toHaveBeenCalledWith(Store.ACTIVE_EXERCISES)
    expect(bulkAddMock).toHaveBeenCalledWith(testIds)
  })

  test('updateActiveExerciseById calls correct Dexie methods', () => {
    const id = testId
    const properties = { name: testName }
    db.updateActiveExerciseById(id, properties)
    expect(tableMock).toHaveBeenCalledWith(Store.ACTIVE_EXERCISES)
    expect(updateMock).toHaveBeenCalledWith(id, properties)
  })

  //
  // ActiveWorkouts (WorkoutRecord)
  //

  test('addActiveWorkout calls correct Dexie methods', () => {
    db.addActiveWorkout({})
    expect(tableMock).toHaveBeenCalledWith(Store.ACTIVE_WORKOUTS)
    expect(addMock).toHaveBeenCalledWith({})
  })

  test('bulkAddActiveWorkouts calls correct Dexie methods', () => {
    db.bulkAddActiveWorkouts(testIds)
    expect(tableMock).toHaveBeenCalledWith(Store.ACTIVE_WORKOUTS)
    expect(bulkAddMock).toHaveBeenCalledWith(testIds)
  })

  test('updateActiveWorkoutById calls correct Dexie methods', () => {
    const id = testId
    const properties = { name: testName }
    db.updateActiveWorkoutById(id, properties)
    expect(tableMock).toHaveBeenCalledWith(Store.ACTIVE_WORKOUTS)
    expect(updateMock).toHaveBeenCalledWith(id, properties)
  })

  //
  // AppLog
  //

  test('addAppLog calls correct Dexie methods', () => {
    db.addAppLog({}, {})
    expect(tableMock).toHaveBeenCalledWith(Store.APP_LOGS)
    expect(addMock).toHaveBeenCalledWith({
      id: expect.any(String),
      createdAt: expect.any(String),
      name: 'undefined:undefined',
      failures: undefined,
      failuresByPos: undefined,
      inner: undefined,
      message: expect.any(Array),
      stack: expect.any(Array),
    })
  })
})
