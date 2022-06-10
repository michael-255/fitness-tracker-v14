import { database } from '@/services/LocalDatabase'
import { logger } from '@/services/Logger'
import { DEBUG } from '@/constants'
import { LogLevel } from '@/models/AppLog'

export function useAppLogger() {
  function consoleLog(error: Error, level: LogLevel, name: string, details?: string): void {
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

  async function silentLog(error: Error, level: LogLevel, name: string, details?: string): Promise<void> {
    consoleLog(error, level, name, details)
    await database.addAppLog(error, level, name, details)
  }

  /**
   * @todo Implement alert box and related components
   */
  async function alertLog(error: Error, level: LogLevel, name: string, details?: string): Promise<void> {
    consoleLog(error, level, name, details)
    await database.addAppLog(error, level, name, details)
    // Alert...
  }

  return {
    consoleLog,
    silentLog,
    alertLog,
  }
}