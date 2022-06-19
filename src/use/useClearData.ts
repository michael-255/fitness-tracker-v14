import { database } from '@/services/LocalDatabase'
import { Store } from '@/constants/enums'
import { useAppLogger } from './useAppLogger'
import { LogLevel } from '@/constants/enums'

const { silentLog } = useAppLogger()

export function useClearData() {
  async function clearAllAppData() {
    try {
      if (confirm('Clear all app data?')) {
        await Promise.all(Object.values(Store).map((store) => database.clear(store as Store)))
      }
    } catch (error) {
      silentLog({ error, level: LogLevel.ERROR, name: 'clearAllAppData' })
    }
  }

  /**
   * @todo - may end up removing this
   */
  async function clearStoreData(store: Store) {
    try {
      if (confirm(`Clear "${store}" table data?`)) {
        database.clear(store)
      }
    } catch (error) {
      silentLog({ error, level: LogLevel.ERROR, name: 'clearStoreData' })
    }
  }

  return {
    clearAllAppData,
    clearStoreData,
  }
}
