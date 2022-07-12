import { DateTime } from 'luxon'
import { isIdValid, isRequiredDateValid } from '@/utils/validators'

export interface IEntity {
  id: string
  createdAt: string
  // updatedAt: string
  // deletedAt: string
}

/**
 * _Entity Class
 * @param params IEntity
 */
export class _Entity {
  protected id: string
  protected createdAt: string

  constructor(params: IEntity) {
    if (isIdValid(params.id)) {
      this.id = params.id
    } else {
      throw new Error(`(constructor) Validation failed on id << ${params.id} >>`)
    }

    if (isRequiredDateValid(params.createdAt)) {
      this.createdAt = params.createdAt
    } else {
      throw new Error(`(constructor) Validation failed on createdAt << ${params.id} >>`)
    }
  }

  get Id(): string {
    return this.id
  }

  set Id(id: string) {
    if (isIdValid(id)) {
      this.id = id
    } else {
      throw new Error(`Validation failed on id << ${id} >>`)
    }
  }

  get CreatedAt(): string {
    return this.createdAt
  }

  set CreatedAt(createdAt: string) {
    if (isRequiredDateValid(createdAt)) {
      this.createdAt = createdAt
    } else {
      throw new Error(`Validation failed on createdAt << ${createdAt} >>`)
    }
  }

  static getTableColumns(): any[] {
    return [
      {
        name: 'id',
        label: 'Id',
        align: 'left',
        required: true,
        field: (row: _Entity) => row.id,
        sortable: true,
      },
      {
        name: 'createdAt',
        label: 'Created At',
        align: 'left',
        field: (row: _Entity) => row.createdAt,
        format: (val: string) => DateTime.fromISO(val).toFormat('ccc LLL d yyyy ttt'),
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return ['createdAt']
  }

  static getColumnOptions(): any[] {
    return this.getTableColumns().filter((i: any) => i.name !== 'id')
  }

  getReadableCreatedAt(): string {
    return DateTime.fromISO(this.createdAt).toFormat('ccc LLL d yyyy ttt')
  }
}
