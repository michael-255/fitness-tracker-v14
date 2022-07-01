import type { AppLogParams } from '@/constants/types'
import type { LogLevel } from '@/constants/enums'
import { _Entity } from '@/models/_Entity'

/**
 * AppLog Class
 * @param obj.error Error or any if unknown
 * @param obj.level LogLevel severity
 * @param obj.name Name of caller (normally the function name)
 * @param obj.details Optional - Additional string with information about the event (str:str:str)
 */
export class AppLog extends _Entity {
  protected level: LogLevel
  protected callerName: string
  protected details?: string
  protected errorName?: string
  protected message?: string
  protected stack?: string

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
