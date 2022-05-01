import { database } from '@/services/LocalDatabase'

import { Store } from '@/constants'
import { logger } from '@/services/Logger'

export function useClearData() {
  async function clearAllAppData() {
    try {
      if (confirm('Clear all app data?')) {
        await Promise.all(Object.values(Store).map((store) => database.clear(store as Store)))
      }
    } catch (err) {
      logger.error(err)
      database.addAppLog(err, new Error('clearAllAppData'))
    }
  }

  async function clearStoreData(store: Store) {
    try {
      if (confirm(`Clear "${store}" table data?`)) {
        database.clear(store)
      }
    } catch (err) {
      logger.error(err)
      database.addAppLog(err, new Error('clearStoreData'))
    }
  }

  return {
    clearAllAppData,
    clearStoreData,
  }
}
