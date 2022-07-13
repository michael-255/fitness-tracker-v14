import { database } from '@/services/LocalDatabase'
import { logger } from '@/services/Logger'
import { DEBUG } from '@/constants/globals'
import { DBTable, Icon, LogLevel } from '@/constants/enums'
import { AppLog, type IAppLog } from '@/models/AppLog'
import { useMessaging } from '@/use/useMessaging'

/**
 * Composable with utilities for logging, notifications, and basic dialogs.
 */
export function useLogging() {
  const { showNotification } = useMessaging()

  /**
   * Logs to the DB and console while also showing a notification.
   */
  async function log(params: IAppLog): Promise<void> {
    consoleLog(params)
    await saveAppLog(params)
    const { icon, color, message } = getLogLevelDetails(params.level)
    showNotification(`${params.callerName} ${message}`, icon, color)
  }

  /**
   * Helper function for adding an AppLog to the database.
   */
  async function saveAppLog(params: IAppLog): Promise<void> {
    await database.add(DBTable.APP_LOGS, new AppLog(params))
  }

  function getLogLevelDetails(level: LogLevel): {
    icon: Icon.INFO | Icon.WARN | Icon.ERROR
    color: 'light-blue' | 'orange-9' | 'negative'
    message: 'Information' | 'Warning' | 'Error'
  } {
    if (level === LogLevel.DEBUG || level === LogLevel.INFO) {
      return {
        icon: Icon.INFO,
        color: 'light-blue',
        message: 'Error',
      }
    } else if (level === LogLevel.WARN) {
      return {
        icon: Icon.WARN,
        color: 'orange-9',
        message: 'Warning',
      }
    } else {
      return {
        icon: Icon.ERROR,
        color: 'negative',
        message: 'Error',
      }
    }
  }

  /**
   * Helper for console logging.
   */
  function consoleLog(params: IAppLog): void {
    const { error, level, callerName, details } = params

    if (DEBUG) {
      if (level === LogLevel.DEBUG || level === LogLevel.INFO) {
        logger.log(callerName, details)
        logger.log(error)
      } else if (level === LogLevel.WARN) {
        logger.warn(callerName, details)
        logger.warn(error)
      } else {
        // Fatal, Error, or unknown log level
        logger.error(callerName, details)
        logger.error(error)
      }
    }
  }

  return {
    log,
    getLogLevelDetails,
  }
}