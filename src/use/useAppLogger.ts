import { database } from '@/services/LocalDatabase'
import { logger } from '@/services/Logger'
import { DEBUG } from '@/constants/globals'
import { DBTable, Icon, LogLevel } from '@/constants/enums'
import { AppLog, type AppLogParams } from '@/models/AppLog'
import { useQuasar } from 'quasar'

const $q = useQuasar()

/**
 * Composable with utilities for logging and notifications.
 */
export function useAppLogger() {
  /**
   * Helper function for adding an AppLog to the database.
   */
  async function addAppLog(params: AppLogParams): Promise<void> {
    await database.add(DBTable.APP_LOGS, new AppLog(params))
  }

  /**
   * Returns the appropriate icon for the log level.
   */
  function logLevelIcon(level: LogLevel): Icon {
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
  function logLevelColor(level: LogLevel): 'secondary' | 'orange-9' | 'negative' {
    if (level === LogLevel.DEBUG || level === LogLevel.INFO) {
      return 'secondary'
    } else if (level === LogLevel.WARN) {
      return 'orange-9'
    } else {
      return 'negative'
    }
  }

  /**
   * Uses the level and a message to craft an on screen notification.
   */
  function loggerNotification(level: LogLevel, message: string): void {
    $q.notify({
      message,
      color: logLevelColor(level),
      textColor: 'white',
      icon: logLevelIcon(level),
      actions: [
        {
          label: 'Dismiss',
          color: 'white',
        },
      ],
    })
  }

  /**
   * Generic notification.
   */
  function notify(message: string): void {
    $q.notify({
      message,
      color: 'secondary',
      textColor: 'white',
      icon: Icon.INFO,
      actions: [
        {
          label: 'Dismiss',
          color: 'white',
        },
      ],
    })
  }

  /**
   * Helper for console logging. This function isn't meant to be used outside of this composable.
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
   * Silently logs to the DB and console without alerting the user.
   */
  async function silentLog(params: AppLogParams): Promise<void> {
    consoleLog(params)
    await addAppLog(params)
  }

  /**
   * Logs to the DB and console while also alerting the user on the front-end.
   */
  async function alertLog(params: AppLogParams, notifyMessage: string): Promise<void> {
    consoleLog(params)
    await addAppLog(params)
    loggerNotification(params.level, notifyMessage)
  }

  return {
    silentLog,
    alertLog,
    notify,
  }
}
