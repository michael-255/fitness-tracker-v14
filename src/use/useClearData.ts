import { database } from '@/services/LocalDatabase'
import { DBTable } from '@/constants/enums'
import { useAppLogger } from './useAppLogger'
import { LogLevel } from '@/constants/enums'

const { silentLog } = useAppLogger()

export function useClearData() {
  async function clearAllAppData() {
    try {
      if (confirm('Clear all app data?')) {
        await Promise.all(Object.values(DBTable).map((table) => database.clear(table as DBTable)))
      }
    } catch (error) {
      silentLog({ error, level: LogLevel.ERROR, name: 'clearAllAppData' })
    }
  }

  /**
   * @todo - may end up removing this
   */
  async function clearTableData(table: DBTable) {
    try {
      if (confirm(`Clear "${table}" table data?`)) {
        database.clear(table)
      }
    } catch (error) {
      silentLog({ error, level: LogLevel.ERROR, name: 'clearTableData' })
    }
  }

  return {
    clearAllAppData,
    clearTableData,
  }
}
