import { database } from '@/services/LocalDatabase'
import { logger } from '@/services/Logger'
import { DEBUG } from '@/constants/globals'
import { LogLevel } from '@/constants/enums'
import type { AppLogParams } from '@/constants/types'

export function useAppLogger() {
  /**
   * This function isn't meant to be used outside of this composable
   */
  function consoleLog(params: AppLogParams): void {
    const { error, level, name, details } = params

    if (DEBUG) {
      if (level === LogLevel.DEBUG || level === LogLevel.INFO) {
        logger.log(name, details)
        logger.log(error)
      } else if (level === LogLevel.WARN) {
        logger.warn(name, details)
        logger.warn(error)
      } else {
        // Fatal, Error, or unknown log level
        logger.error(name, details)
        logger.error(error)
      }
    }
  }

  /**
   * Silently logs to the DB and console without alerting the user
   */
  async function silentLog(params: AppLogParams): Promise<void> {
    consoleLog(params)
    await database.addAppLog(params)
  }

  /**
   * Logs to the DB and console while also alerting the user on the front-end
   * @todo Implement alert box and related components
   */
  async function alertLog(params: AppLogParams): Promise<void> {
    consoleLog(params)
    await database.addAppLog(params)
    // Alert...
  }

  return {
    silentLog,
    alertLog,
  }
}
