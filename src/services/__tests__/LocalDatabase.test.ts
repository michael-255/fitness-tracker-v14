import { describe, test, expect, beforeEach, vi } from 'vitest'
import { LocalDatabase } from '@/services/LocalDatabase'

const mockTableBuilder = ({
  toArrayMockFunc = vi.fn(),
  whereMockFunc = vi.fn(),
  bulkGetMockFunc = vi.fn(),
  addMockFunc = vi.fn(),
  updateMockFunc = vi.fn(),
  deleteMockFunc = vi.fn(),
  clearMockFunc = vi.fn(),
}) => {
  return {
    toArray: toArrayMockFunc,
    where: whereMockFunc,
    bulkGet: bulkGetMockFunc,
    add: addMockFunc,
    update: updateMockFunc,
    delete: deleteMockFunc,
    clear: clearMockFunc,
  }
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
  const sortByMockReturnEmpty = vi.fn().mockResolvedValue([])
  const sortByMockReturnFull = vi.fn().mockResolvedValue(testIds)

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
  })

  beforeEach(() => {
    db = new LocalDatabase('TestDatabase')

    db.measurements = tableMock
    db.exercises = tableMock
    db.workouts = tableMock
    db.measurementRecords = tableMock
    db.exerciseRecords = tableMock
    db.workoutRecords = tableMock
    db.activeExercises = tableMock
    db.activeWorkouts = tableMock

    vi.clearAllMocks()
  })

  //
  // Get All
  //

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

  //
  // Get
  //

  test('getMeasurementById calls correct Dexie methods with parameter', () => {
    db.getMeasurementById(testId)
    expect(whereMock).toHaveBeenCalledWith('id')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(firstMock).toHaveBeenCalled()
  })

  test('getExerciseById calls correct Dexie methods with parameter', () => {
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
    // Empty return
    let tempEqualsIgnoreCaseMock = mockEqualsIgnoreCaseBuilder({
      toArrayMockFunc: toArrayMock,
      firstMockFunc: firstMock,
      sortByMockFunc: sortByMockReturnEmpty,
    })
    let tempWhereMock = mockWhereBuilder(tempEqualsIgnoreCaseMock)
    let tempTableMock = mockTableBuilder({
      whereMockFunc: tempWhereMock,
    })
    db.measurementRecords = tempTableMock
    db.getNewestMeasurementRecordByParentId(testId)
    expect(tempWhereMock).toHaveBeenCalledWith('parentId')
    expect(tempEqualsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(sortByMockReturnEmpty).toHaveBeenCalledWith('createdAt')
    // Full return
    tempEqualsIgnoreCaseMock = mockEqualsIgnoreCaseBuilder({
      toArrayMockFunc: toArrayMock,
      firstMockFunc: firstMock,
      sortByMockFunc: sortByMockReturnFull,
    })
    tempWhereMock = mockWhereBuilder(tempEqualsIgnoreCaseMock)
    tempTableMock = mockTableBuilder({
      whereMockFunc: tempWhereMock,
    })
    db.measurementRecords = tempTableMock
    db.getNewestMeasurementRecordByParentId(testId)
    expect(tempWhereMock).toHaveBeenCalledWith('parentId')
    expect(tempEqualsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(sortByMockReturnFull).toHaveBeenCalledWith('createdAt')
  })

  test('getNewestExerciseRecordByParentId calls correct Dexie methods with parameter', () => {
    // Empty return
    let tempEqualsIgnoreCaseMock = mockEqualsIgnoreCaseBuilder({
      toArrayMockFunc: toArrayMock,
      firstMockFunc: firstMock,
      sortByMockFunc: sortByMockReturnEmpty,
    })
    let tempWhereMock = mockWhereBuilder(tempEqualsIgnoreCaseMock)
    let tempTableMock = mockTableBuilder({
      whereMockFunc: tempWhereMock,
    })
    db.exerciseRecords = tempTableMock
    db.getNewestExerciseRecordByParentId(testId)
    expect(tempWhereMock).toHaveBeenCalledWith('parentId')
    expect(tempEqualsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(sortByMockReturnEmpty).toHaveBeenCalledWith('createdAt')
    // Full return
    tempEqualsIgnoreCaseMock = mockEqualsIgnoreCaseBuilder({
      toArrayMockFunc: toArrayMock,
      firstMockFunc: firstMock,
      sortByMockFunc: sortByMockReturnFull,
    })
    tempWhereMock = mockWhereBuilder(tempEqualsIgnoreCaseMock)
    tempTableMock = mockTableBuilder({
      whereMockFunc: tempWhereMock,
    })
    db.exerciseRecords = tempTableMock
    db.getNewestExerciseRecordByParentId(testId)
    expect(tempWhereMock).toHaveBeenCalledWith('parentId')
    expect(tempEqualsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(sortByMockReturnFull).toHaveBeenCalledWith('createdAt')
  })

  test('getNewestWorkoutRecordByParentId calls correct Dexie methods with parameter', () => {
    // Empty return
    let tempEqualsIgnoreCaseMock = mockEqualsIgnoreCaseBuilder({
      toArrayMockFunc: toArrayMock,
      firstMockFunc: firstMock,
      sortByMockFunc: sortByMockReturnEmpty,
    })
    let tempWhereMock = mockWhereBuilder(tempEqualsIgnoreCaseMock)
    let tempTableMock = mockTableBuilder({
      whereMockFunc: tempWhereMock,
    })
    db.workoutRecords = tempTableMock
    db.getNewestWorkoutRecordByParentId(testId)
    expect(tempWhereMock).toHaveBeenCalledWith('parentId')
    expect(tempEqualsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(sortByMockReturnEmpty).toHaveBeenCalledWith('createdAt')
    // Full return
    tempEqualsIgnoreCaseMock = mockEqualsIgnoreCaseBuilder({
      toArrayMockFunc: toArrayMock,
      firstMockFunc: firstMock,
      sortByMockFunc: sortByMockReturnFull,
    })
    tempWhereMock = mockWhereBuilder(tempEqualsIgnoreCaseMock)
    tempTableMock = mockTableBuilder({
      whereMockFunc: tempWhereMock,
    })
    db.workoutRecords = tempTableMock
    db.getNewestWorkoutRecordByParentId(testId)
    expect(tempWhereMock).toHaveBeenCalledWith('parentId')
    expect(tempEqualsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(sortByMockReturnFull).toHaveBeenCalledWith('createdAt')
  })

  test('getMeasurementsByStatus calls correct Dexie methods with parameter', () => {
    db.getMeasurementsByStatus('ARCHIVED')
    expect(whereMock).toHaveBeenCalledWith('status')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith('ARCHIVED')
    expect(toArrayMock).toHaveBeenCalled()
  })

  test('getExercisesByStatus calls correct Dexie methods with parameter', () => {
    db.getExercisesByStatus('ARCHIVED')
    expect(whereMock).toHaveBeenCalledWith('status')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith('ARCHIVED')
    expect(toArrayMock).toHaveBeenCalled()
  })

  test('getWorkoutsByStatus calls correct Dexie methods with parameter', () => {
    db.getWorkoutsByStatus('ARCHIVED')
    expect(whereMock).toHaveBeenCalledWith('status')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith('ARCHIVED')
    expect(toArrayMock).toHaveBeenCalled()
  })

  //
  // Add
  //

  test('addMeasurement calls correct Dexie methods with parameter', () => {
    db.addMeasurement({})
    expect(addMock).toHaveBeenCalledWith({})
  })

  test('addExercise calls correct Dexie methods with parameter', () => {
    db.addExercise({})
    expect(addMock).toHaveBeenCalledWith({})
  })

  test('addWorkout calls correct Dexie methods with parameter', () => {
    db.addWorkout({})
    expect(addMock).toHaveBeenCalledWith({})
  })

  test('addMeasurementRecord calls correct Dexie methods with parameter', () => {
    db.addMeasurementRecord({})
    expect(addMock).toHaveBeenCalledWith({})
  })

  test('addExerciseRecord calls correct Dexie methods with parameter', () => {
    db.addExerciseRecord({})
    expect(addMock).toHaveBeenCalledWith({})
  })

  test('addWorkoutRecord calls correct Dexie methods with parameter', () => {
    db.addWorkoutRecord({})
    expect(addMock).toHaveBeenCalledWith({})
  })

  test('addActiveExercise calls correct Dexie methods with parameter', () => {
    db.addActiveExercise({})
    expect(addMock).toHaveBeenCalledWith({})
  })

  test('addActiveWorkout calls correct Dexie methods with parameter', () => {
    db.addActiveWorkout({})
    expect(addMock).toHaveBeenCalledWith({})
  })

  //
  // Update
  //

  test('updateMeasurement calls correct Dexie methods with parameter', () => {
    const id = testId
    const properties = { name: testName }
    db.updateMeasurement(id, properties)
    expect(updateMock).toHaveBeenCalledWith(id, properties)
  })

  test('updateExercise calls correct Dexie methods with parameter', () => {
    const id = testId
    const properties = { name: testName }
    db.updateExercise(id, properties)
    expect(updateMock).toHaveBeenCalledWith(id, properties)
  })

  test('updateWorkout calls correct Dexie methods with parameter', () => {
    const id = testId
    const properties = { name: testName }
    db.updateWorkout(id, properties)
    expect(updateMock).toHaveBeenCalledWith(id, properties)
  })

  test('updateMeasurementRecord calls correct Dexie methods with parameter', () => {
    const id = testId
    const properties = { name: testName }
    db.updateMeasurementRecord(id, properties)
    expect(updateMock).toHaveBeenCalledWith(id, properties)
  })

  test('updateExerciseRecord calls correct Dexie methods with parameter', () => {
    const id = testId
    const properties = { name: testName }
    db.updateExerciseRecord(id, properties)
    expect(updateMock).toHaveBeenCalledWith(id, properties)
  })

  test('updateWorkoutRecord calls correct Dexie methods with parameter', () => {
    const id = testId
    const properties = { name: testName }
    db.updateWorkoutRecord(id, properties)
    expect(updateMock).toHaveBeenCalledWith(id, properties)
  })

  test('updateActiveExercise calls correct Dexie methods with parameter', () => {
    const id = testId
    const properties = { name: testName }
    db.updateActiveExercise(id, properties)
    expect(updateMock).toHaveBeenCalledWith(id, properties)
  })

  test('updateActiveWorkout calls correct Dexie methods with parameter', () => {
    const id = testId
    const properties = { name: testName }
    db.updateActiveWorkout(id, properties)
    expect(updateMock).toHaveBeenCalledWith(id, properties)
  })

  //
  // Delete
  //

  test('deleteMeasurement calls correct Dexie methods with parameter', () => {
    db.deleteMeasurement(testId)
    expect(deleteMock).toHaveBeenCalledWith(testId)
  })

  test('deleteExercise calls correct Dexie methods with parameter', () => {
    db.deleteExercise(testId)
    expect(deleteMock).toHaveBeenCalledWith(testId)
  })

  test('deleteWorkout calls correct Dexie methods with parameter', () => {
    db.deleteWorkout(testId)
    expect(deleteMock).toHaveBeenCalledWith(testId)
  })

  test('deleteMeasurementRecord calls correct Dexie methods with parameter', () => {
    db.deleteMeasurementRecord(testId)
    expect(deleteMock).toHaveBeenCalledWith(testId)
  })

  test('deleteExerciseRecord calls correct Dexie methods with parameter', () => {
    db.deleteExerciseRecord(testId)
    expect(deleteMock).toHaveBeenCalledWith(testId)
  })

  test('deleteWorkoutRecord calls correct Dexie methods with parameter', () => {
    db.deleteWorkoutRecord(testId)
    expect(deleteMock).toHaveBeenCalledWith(testId)
  })

  test('deleteActiveExercise calls correct Dexie methods with parameter', () => {
    db.deleteActiveExercise(testId)
    expect(deleteMock).toHaveBeenCalledWith(testId)
  })

  test('deleteActiveWorkout calls correct Dexie methods with parameter', () => {
    db.deleteActiveWorkout(testId)
    expect(deleteMock).toHaveBeenCalledWith(testId)
  })

  //
  // Clear (Delete All)
  //

  test('clearMeasurements calls correct Dexie methods', () => {
    db.clearMeasurements()
    expect(clearMock).toHaveBeenCalled()
  })

  test('clearExercises calls correct Dexie methods', () => {
    db.clearExercises()
    expect(clearMock).toHaveBeenCalled()
  })

  test('clearWorkouts calls correct Dexie methods', () => {
    db.clearWorkouts()
    expect(clearMock).toHaveBeenCalled()
  })

  test('clearMeasurementRecords calls correct Dexie methods', () => {
    db.clearMeasurementRecords()
    expect(clearMock).toHaveBeenCalled()
  })

  test('clearExerciseRecords calls correct Dexie methods', () => {
    db.clearExerciseRecords()
    expect(clearMock).toHaveBeenCalled()
  })

  test('clearWorkoutRecords calls correct Dexie methods', () => {
    db.clearWorkoutRecords()
    expect(clearMock).toHaveBeenCalled()
  })

  test('clearActiveExercises calls correct Dexie methods', () => {
    db.clearActiveExercises()
    expect(clearMock).toHaveBeenCalled()
  })

  test('clearActiveWorkouts calls correct Dexie methods', () => {
    db.clearActiveWorkouts()
    expect(clearMock).toHaveBeenCalled()
  })
})
