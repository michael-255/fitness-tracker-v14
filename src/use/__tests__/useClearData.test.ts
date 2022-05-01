import { describe, test, expect } from 'vitest'
import { useClearData } from '@/use/useClearData'

describe('useClearData', () => {
  const { clearAllAppData, clearStoreData } = useClearData()

  test('returned properties are defined', () => {
    expect(clearAllAppData).toBeDefined()
    expect(clearStoreData).toBeDefined()
  })
})
