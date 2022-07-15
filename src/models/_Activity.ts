import { _Entity, type IEntity } from '@/models/_Entity'
import type { ActivityStatus } from '@/constants/enums'
import { truncateString } from '@/utils/common'
import { isShortTextValid, isTextValid, isRequired } from '@/utils/validators'

export interface IActivity extends IEntity {
  name: string
  description: string
  status: ActivityStatus
}

/**
 * _Activity Class
 * @param params IActivity
 */
export class _Activity extends _Entity {
  protected name: string
  protected description: string
  protected status: ActivityStatus

  constructor(params: IActivity) {
    super({ id: params.id, createdAt: params.createdAt })

    if (isTextValid(params.description)) {
      this.description = params.description
    } else {
      throw new Error(`(constructor) Validation failed on description << ${params.description} >>`)
    }

    if (isShortTextValid(params.name)) {
      this.name = params.name
    } else {
      throw new Error(`(constructor) Validation failed on name << ${params.name} >>`)
    }

    if (isRequired(params.status)) {
      this.status = params.status
    } else {
      throw new Error(`(constructor) Validation failed on status << ${params.status} >>`)
    }
  }

  get Name(): string {
    return this.name
  }

  set Name(name: string) {
    if (isShortTextValid(name)) {
      this.name = name
    } else {
      throw new Error(`Validation failed on name << ${name} >>`)
    }
  }

  get Description(): string {
    return this.description
  }

  set Description(description: string) {
    if (isTextValid(description)) {
      this.description = description
    } else {
      throw new Error(`Validation failed on description << ${description} >>`)
    }
  }

  get Status(): ActivityStatus {
    return this.status
  }

  set Status(status: ActivityStatus) {
    if (isRequired(status)) {
      this.status = status
    } else {
      throw new Error(`Validation failed on status << ${status} >>`)
    }
  }

  static getTableColumns(): any[] {
    return [
      ..._Entity.getTableColumns(),
      {
        name: 'name',
        label: 'Name',
        align: 'left',
        field: (row: _Activity) => row.name,
        sortable: true,
      },
      {
        name: 'description',
        label: 'Description',
        align: 'left',
        field: (row: _Activity) => truncateString(row.description, 40),
        sortable: true,
      },
      {
        name: 'status',
        label: 'Status',
        align: 'left',
        field: (row: _Activity) => row.status,
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Entity.getVisibleColumns(), 'name']
  }
}
