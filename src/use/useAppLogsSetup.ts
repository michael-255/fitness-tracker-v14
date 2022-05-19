import { database } from '@/services/LocalDatabase'

import { Store } from '@/constants'
import { logger } from '@/services/Logger'

export function useAppLogsSetup() {
  async function clearAppLogsTableData() {
    try {
      const store = Store.APP_LOGS

      if (confirm(`Clear "${store}" table data?`)) {
        database.clear(store)
      }
    } catch (err) {
      logger.error(err)
      database.addAppLog(err, new Error('clearAppLogsTableData'))
    }
  }

  return {
    clearAppLogsTableData,
  }
}
