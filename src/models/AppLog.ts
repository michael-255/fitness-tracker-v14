import type { LogLevel } from '@/constants/enums'
import { _Entity, type EntityParams } from '@/models/_Entity'
import { truncateString } from '@/utils/common'

interface AppLogParams extends EntityParams {
  error: Error | any
  level: LogLevel
  name: string
  details?: string
}

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

  static getTableColumns(): any[] {
    return [
      {
        name: 'id',
        label: 'Id',
        align: 'left',
        required: true,
        field: (row: AppLog) => row.getId(),
        sortable: true,
      },
      {
        name: 'createdAt',
        label: 'Created At',
        align: 'left',
        field: (row: AppLog) => row.getDisplayCreatedAt(),
        sortable: true,
      },
      {
        name: 'callerName',
        label: 'Caller Name',
        align: 'left',
        field: (row: AppLog) => row.getCallerName(),
        sortable: true,
      },
      {
        name: 'details',
        label: 'Details',
        align: 'left',
        field: (row: AppLog) => row.getDetails(),
        sortable: true,
      },
      {
        name: 'errorName',
        label: 'Error Name',
        align: 'left',
        field: (row: AppLog) => row.getErrorName(),
        sortable: true,
      },
      {
        name: 'message',
        label: 'Messages',
        align: 'left',
        field: (row: AppLog) => truncateString(row.getMessage(), 40),
        sortable: true,
      },
      {
        name: 'stack',
        label: 'Stack Trace',
        align: 'left',
        field: (row: AppLog) => truncateString(row.getStack(), 40),
        sortable: true,
      },
    ]
  }

  static getColumnOptions(): any[] {
    return this.getTableColumns().filter((i: any) => i.name !== 'id')
  }

  static getVisibleColumns(): string[] {
    return ['createdAt', 'callerName', 'details', 'errorName', 'message', 'stack']
  }

  getCallerName(): string {
    return this.callerName || '-'
  }

  getDetails(): string {
    return this.details || '-'
  }

  getErrorName(): string {
    return this.errorName || '-'
  }

  getMessage(): string {
    return this.message || '-'
  }

  getStack(): string {
    return this.stack || '-'
  }
}
