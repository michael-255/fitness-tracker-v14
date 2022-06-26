import { describe, test, expect, beforeEach, vi } from 'vitest'
import { LocalDatabase } from '@/services/LocalDatabase'
import { DBTable } from '@/constants/enums'
import { LogLevel } from '@/constants/enums'

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
  const testTable = 'testing'
  const testId = 'test-id-123'
  const testIds = [testId, testId, testId]
  const testName = 'Test Name'
  const testData = { id: 'test1' }
  const testDatas = [{ id: 'test1' }, { id: 'test2' }]

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
  // Get
  //

  test('getAll calls correct Dexie methods', () => {
    db.getAll(testTable)
    expect(tableMock).toHaveBeenCalledWith(testTable)
    expect(toArrayMock).toHaveBeenCalled()
  })

  test('getById calls correct Dexie methods', () => {
    db.getById(testTable, testId)
    expect(tableMock).toHaveBeenCalledWith(testTable)
    expect(whereMock).toHaveBeenCalledWith('id')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(firstMock).toHaveBeenCalled()
  })

  test('getByName calls correct Dexie methods', () => {
    db.getByName(testTable, testName)
    expect(tableMock).toHaveBeenCalledWith(testTable)
    expect(whereMock).toHaveBeenCalledWith('name')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testName)
    expect(toArrayMock).toHaveBeenCalled()
  })

  test('getByParentId calls correct Dexie methods', () => {
    db.getByParentId(testTable, testId)
    expect(tableMock).toHaveBeenCalledWith(testTable)
    expect(whereMock).toHaveBeenCalledWith('parentId')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(sortByMock).toHaveBeenCalledWith('createdAt')
  })

  test('getNewestByParentId calls correct Dexie methods', () => {
    db.getNewestByParentId(testTable, testId)
    expect(tableMock).toHaveBeenCalledWith(testTable)
    expect(whereMock).toHaveBeenCalledWith('parentId')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith(testId)
    expect(sortByMock).toHaveBeenCalledWith('createdAt')
  })

  test('bulkGetByIds calls correct Dexie methods', () => {
    db.bulkGetByIds(testTable, testIds)
    expect(tableMock).toHaveBeenCalledWith(testTable)
    expect(bulkGetMock).toHaveBeenCalledWith(testIds)
  })

  //
  // Delete
  //

  test('deleteById calls correct Dexie methods', () => {
    db.deleteById(testTable, testId)
    expect(tableMock).toHaveBeenCalledWith(testTable)
    expect(deleteMock).toHaveBeenCalledWith(testId)
  })

  test('clear calls correct Dexie methods', () => {
    db.clear(testTable)
    expect(tableMock).toHaveBeenCalledWith(testTable)
    expect(clearMock).toHaveBeenCalled()
  })

  //
  // Add
  //

  test('add calls correct Dexie methods', () => {
    db.add(testTable, testData)
    expect(tableMock).toHaveBeenCalledWith(testTable)
    expect(addMock).toHaveBeenCalledWith(testData)
  })

  test('bulkAdd calls correct Dexie methods', () => {
    db.bulkAdd(testTable, testDatas)
    expect(tableMock).toHaveBeenCalledWith(testTable)
    expect(bulkAddMock).toHaveBeenCalledWith(testDatas)
  })

  //
  // Update
  //

  test('updateById calls correct Dexie methods', () => {
    const properties = { name: testName }
    db.updateById(testTable, testId, properties)
    expect(tableMock).toHaveBeenCalledWith(testTable)
    expect(updateMock).toHaveBeenCalledWith(testId, properties)
  })

  //
  // AppLog
  //

  test('addAppLog calls correct Dexie methods', () => {
    const testErrorName = 'test-error'
    const testError = new Error(testErrorName)
    const testLevel = LogLevel.DEBUG
    const testName = 'test-caller'
    const testDetails = 'test-details'

    const testFullParams = {
      error: testError,
      level: testLevel,
      name: testName,
      details: testDetails,
    }

    db.addAppLog(testFullParams)
    expect(tableMock).toHaveBeenCalledWith(DBTable.APP_LOGS)
    expect(addMock).toHaveBeenCalledWith({
      id: expect.any(String),
      createdAt: expect.any(String),
      level: 'Debug',
      callerName: testName,
      details: testDetails,
      errorName: 'Error',
      message: expect.any(String),
      stack: expect.any(String),
    })
  })
})
