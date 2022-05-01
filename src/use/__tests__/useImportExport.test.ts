import { describe, test, expect } from 'vitest'
import { useImportExport } from '@/use/useImportExport'

describe('useImportExport', () => {
  const { file, onRejectedFile, importData, exportData } = useImportExport()

  test('returned properties are defined', () => {
    expect(file).toBeDefined()
    expect(onRejectedFile).toBeDefined()
    expect(importData).toBeDefined()
    expect(exportData).toBeDefined()
  })
})
