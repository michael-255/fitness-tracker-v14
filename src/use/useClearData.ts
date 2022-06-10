import { database } from '@/services/LocalDatabase'
import { Store } from '@/constants'
import { logger } from '@/services/Logger'
import { useAppLogger } from './useAppLogger'
import { LogLevel } from '@/models/AppLog'

const { silentLog } = useAppLogger()

export function useClearData() {
  async function clearAllAppData() {
    try {
      if (confirm('Clear all app data?')) {
        await Promise.all(Object.values(Store).map((store) => database.clear(store as Store)))
      }
    } catch (err) {
      silentLog(err, LogLevel.ERROR, 'clearAllAppData')
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
    } catch (err) {
      silentLog(err, LogLevel.ERROR, 'clearStoreData')
    }
  }

  return {
    clearAllAppData,
    clearStoreData,
  }
}
