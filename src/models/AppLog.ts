import type { AppLogParams } from '@/constants/types'
import { type LogLevel, DBTable } from '@/constants/enums'
import { _Entity } from '@/models/_Entity'

// Exports for LocalDatabase
export const appLogTableIndices = Object.freeze({ [DBTable.APP_LOGS]: '&id, createdAt' })

/**
 * AppLog Class
 * @arg obj.error Error object (or any since it's unknown)
 * @arg obj.level Severity level of this log
 * @arg obj.name Name of caller (normally the function name)
 * @arg obj.details Optional - Additional string with information about the event (str:str:str)
 */
export class AppLog extends _Entity {
  level: LogLevel
  callerName: string
  details?: string
  errorName?: string
  message?: string
  stack?: string

  constructor(params: AppLogParams) {
    super() // Will use default id and createdAt
    this.level = params?.level
    this.callerName = params?.name
    this.details = params?.details
    this.errorName = params?.error?.name
    this.message = params?.error?.message
    this.stack = params?.error?.stack
  }
}
