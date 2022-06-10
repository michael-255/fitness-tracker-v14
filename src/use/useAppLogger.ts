import { database } from '@/services/LocalDatabase'
import { logger } from '@/services/Logger'
import { DEBUG } from '@/constants'
import { LogLevel, appLogParams } from '@/models/AppLog'

export function useAppLogger() {
  /**
   * This function isn't meant to be used outside of this composable
   */
  function consoleLog(appLogParams: appLogParams): void {
    const { error, level, name, details } = appLogParams
    
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
   * Logs without alerting the user
   */
  async function silentLog(appLogParams: appLogParams): Promise<void> {
    consoleLog(appLogParams)
    await database.addAppLog(appLogParams)
  }

  /**
   * Logs and alerts the user
   * @todo Implement alert box and related components
   */
  async function alertLog(appLogParams: appLogParams): Promise<void> {
    consoleLog(appLogParams)
    await database.addAppLog(appLogParams)
    // Alert...
  }

  return {
    silentLog,
    alertLog,
  }
}