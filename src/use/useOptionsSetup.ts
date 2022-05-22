import { database } from '@/services/LocalDatabase'
import { Store } from '@/constants'
import { logger } from '@/services/Logger'

export function useOptionsSetup() {
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

  return {
    clearAllAppData,
  }
}
