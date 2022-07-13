import { database } from '@/services/LocalDatabase'
import { logger } from '@/services/Logger'
import { DEBUG } from '@/constants/globals'
import { DBTable, Icon, LogLevel } from '@/constants/enums'
import { AppLog, type IAppLog } from '@/models/AppLog'
import { useQuasar } from 'quasar'

/**
 * Composable with utilities for logging, notifications, and basic dialogs.
 */
export function useMessaging() {
  const $quasar = useQuasar()

  /**
   * @todo Use your own dialog component!
   *
   * Customizable Quasar confirm dialog.
   * @param title
   * @param message
   * @param onOkFunc Function to call is OK is clicked
   * import { useLogging } from '@/use/useLogging'
   * import { useQuasar } from 'quasar'
   * const $q = useQuasar()
   * const { confirmDialog } = useLogging($q)
   */
  function confirmDialog(title: string, message: string, onOkFunc: () => any): void {
    $quasar
      .dialog({
        title,
        message,
        cancel: true,
      })
      .onOk(() => {
        onOkFunc()
      })
  }

  /**
   * @todo Use your own dialog component!
   *
   * Customizable Quasar dismiss dialog.
   * @param title
   * @param message
   * import { useLogging } from '@/use/useLogging'
   * import { useQuasar } from 'quasar'
   * const $q = useQuasar()
   * const { confirmDialog } = useLogging($q)
   */
  function dismissDialog(title: string, message: string): void {
    $quasar.dialog({
      title,
      message,
      cancel: false,
    })
  }

  /**
   * Customizable Quasar notification.
   * @param message
   * @param icon
   * @param color
   * @example
   * import { useLogging } from '@/use/useLogging'
   * import { useQuasar } from 'quasar'
   * const $q = useQuasar()
   * const { notify } = useLogging($q)
   */
  function notify(
    message: string,
    icon: Icon = Icon.INFO,
    color: 'light-blue' | 'orange-9' | 'negative' = 'light-blue'
  ): void {
    const textColor = 'white'

    $quasar.notify({
      message,
      icon,
      color,
      textColor,
      actions: [
        {
          label: 'Dismiss',
          color: textColor,
        },
      ],
    })
  }

  /**
   * Logs to the DB and console while also showing a notification.
   */
  async function log(params: IAppLog): Promise<void> {
    consoleLog(params)
    await saveAppLog(params)
    const { icon, color, message } = getLogLevelDetails(params.level)
    notify(`${params.callerName} ${message}`, icon, color)
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
    confirmDialog,
    dismissDialog,
    notify,
    log,
  }
}
