import { describe, test, expect, beforeEach, vi } from 'vitest'
import { LocalDatabase } from '../LocalDatabase'

describe('LocalDatabase', () => {
  let db: any
  const toArrayMock = vi.fn()
  const firstMock = vi.fn()
  const lastMock = vi.fn()
  const tableMock = vi.fn(() => ({ toArray: toArrayMock }))
  const equalsIgnoreCaseMock = vi.fn(() => ({ first: firstMock }))
  const whereMock = vi.fn(() => ({ equalsIgnoreCase: equalsIgnoreCaseMock }))
  const orderByMock = vi.fn(() => ({ first: firstMock, last: lastMock }))

  beforeEach(() => {
    db = new LocalDatabase('TestDatabase')
    db.users = {
      add: vi.fn(),
      where: whereMock,
    }
    db.examples = {
      add: vi.fn(),
      orderBy: orderByMock,
    }
    db.table = tableMock
    vi.clearAllMocks()
  })

  test('testing...', () => {
    expect(true).toBe(false)
  })
})
