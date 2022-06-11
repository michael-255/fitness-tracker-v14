import { _Entity } from '@/models/_Entity'
import type { IEntity } from '@/models/_Entity'
import { Store } from '@/constants'

export enum LogLevel {
  FATAL = 'Fatal',
  ERROR = 'Error',
  WARN = 'Warning',
  INFO = 'Info',
  DEBUG = 'Debug',
}

// Exports for LocalDatabase
export const errorLogStoreIndices = Object.freeze({ [Store.APP_LOGS]: '&id, createdAt' })

export interface IAppLog extends IEntity {
  level: LogLevel
  callerName: string
  details?: string
  errorName?: string
  message?: string
  stack?: string
}

export type appLogParams = {
  error: Error | any
  level: LogLevel
  name: string
  details?: string
}

/**
 * AppLog Class
 * @arg obj.error (Required) - Error object (or any since it's unknown)
 * @arg obj.level (Required) - Severity level of this log
 * @arg obj.name (Required) - Name of caller (normally the function name)
 * @arg obj.details (Optional) - Additional information about the event
 */
export class AppLog extends _Entity {
  level: LogLevel
  callerName: string
  details?: string
  errorName?: string
  message?: string
  stack?: string

  constructor(appLogParams: appLogParams) {
    super() // Will use default id and createdAt
    this.level = appLogParams?.level
    this.callerName = appLogParams?.name
    this.details = appLogParams?.details
    this.errorName = appLogParams?.error?.name
    this.message = appLogParams?.error?.message
    this.stack = appLogParams?.error?.stack
  }
}
