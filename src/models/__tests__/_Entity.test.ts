import { describe, test, expect } from 'vitest'
import { _Entity } from '../_Entity'

describe('_Entity', () => {
  test('id and createdAt are generated if not provided', () => {
    const result = new _Entity()
    expect(result.id).toBeDefined()
    expect(result.createdAt).toBeDefined()
  })
})
