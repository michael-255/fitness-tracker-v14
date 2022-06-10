import { _Entity } from '@/models/_Entity'
import type { IEntity } from '@/models/_Entity'
import { Store } from '@/constants'

export enum LogLevel {
  FATAL = "Fatal",
  ERROR = "Error",
  WARN = "Warning",
  INFO = "Info",
  DEBUG = "Debug",
}

// Exports for LocalDatabase
export const errorLogStoreIndices = Object.freeze({ [Store.APP_LOGS]: '&id, createdAt' })

export interface IAppLog extends IEntity {
  level: LogLevel
  name: string
  details?: string
  message?: string
  stack?: string
}

/**
 * AppLog Class
 * @arg error (Required) - Error object
 * @arg level (Required) - Severity level of this log
 * @arg name (Required) - Name of caller (normally the function name)
 * @arg details (Optional) - Additional information about the event
 */
export class AppLog extends _Entity {
  id: string
  createdAt: string
  level: LogLevel
  name: string
  details?: string
  message?: string
  stack?: string

  constructor(error: Error, level: LogLevel, name: string, details?: string) {
    super() // Will use default id and createdAt
    this.level = level
    this.name = name
    this.details = details
    this.message = error?.message
    this.stack = error?.stack
  }
}