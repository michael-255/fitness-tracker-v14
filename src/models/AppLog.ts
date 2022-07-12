import type { LogLevel } from '@/constants/enums'
import { _Entity } from '@/models/_Entity'
import { truncateString } from '@/utils/common'
import { v4 as createId } from 'uuid'

export interface IAppLog {
  error: Error | any
  level: LogLevel
  callerName: string
  details?: string
}

/**
 * AppLog Class
 * @param params.error Error or any if unknown
 * @param params.level LogLevel severity
 * @param params.callerName Name of caller (normally the function name)
 * @param params.details Optional - Additional information about the event (str:str:str)
 */
export class AppLog extends _Entity {
  public level: LogLevel
  public callerName: string
  public details?: string
  public errorName?: string
  public message?: string
  public stack?: string

  constructor(params: IAppLog) {
    super({ id: createId(), createdAt: new Date().toISOString() })

    this.level = params?.level
    this.callerName = params?.callerName
    this.details = params?.details
    this.errorName = params?.error?.name
    this.message = params?.error?.message
    this.stack = params?.error?.stack
  }

  static getTableColumns(): any[] {
    return [
      ..._Entity.getTableColumns(),
      {
        name: 'callerName',
        label: 'Caller Name',
        align: 'left',
        field: (row: AppLog) => row.callerName,
        sortable: true,
      },
      {
        name: 'details',
        label: 'Details',
        align: 'left',
        field: (row: AppLog) => row.details,
        sortable: true,
      },
      {
        name: 'errorName',
        label: 'Error Name',
        align: 'left',
        field: (row: AppLog) => row.errorName,
        sortable: true,
      },
      {
        name: 'message',
        label: 'Messages',
        align: 'left',
        field: (row: AppLog) => truncateString(row.message, 40),
        sortable: true,
      },
      {
        name: 'stack',
        label: 'Stack Trace',
        align: 'left',
        field: (row: AppLog) => truncateString(row.stack, 40),
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [
      ..._Entity.getVisibleColumns(),
      'callerName',
      'details',
      'errorName',
      'message',
      'stack',
    ]
  }
}
