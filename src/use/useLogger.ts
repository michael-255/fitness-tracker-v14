import { database } from '@/services/LocalDatabase'
import { logger } from '@/services/Logger'
import { DEBUG } from '@/constants/globals'
import { DBTable, Icon, LogLevel } from '@/constants/enums'
import { AppLog, type IAppLog } from '@/models/AppLog'

/**
 * Composable with utilities for logging.
 */
export function useLogger() {
  /**
   * Helper function for adding an AppLog to the database.
   */
  async function addAppLog(params: IAppLog): Promise<void> {
    await database.add(DBTable.APP_LOGS, new AppLog(params))
  }

  /**
   * Returns the appropriate icon for the log level.
   */
  function getLogLevelIcon(level: LogLevel): Icon {
    if (level === LogLevel.DEBUG || level === LogLevel.INFO) {
      return Icon.INFO
    } else if (level === LogLevel.WARN) {
      return Icon.WARN
    } else {
      return Icon.ERROR
    }
  }

  /**
   * Returns the appropriate color for the log level.
   */
  function getLogLevelColor(level: LogLevel): 'light-blue' | 'orange-9' | 'negative' {
    if (level === LogLevel.DEBUG || level === LogLevel.INFO) {
      return 'light-blue'
    } else if (level === LogLevel.WARN) {
      return 'orange-9'
    } else {
      return 'negative'
    }
  }

  /**
   * Helper for console logging. This function isn't meant to be used outside of this composable.
   */
  function consoleLog(params: IAppLog): void {
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
   * Silently logs to the DB and console.
   */
  async function log(params: IAppLog): Promise<void> {
    consoleLog(params)
    await addAppLog(params)
  }

  return {
    getLogLevelColor,
    getLogLevelIcon,
    log,
  }
}
