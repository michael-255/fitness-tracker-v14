import type { Id, CreatedAt } from '@/constants/types'
import type { EntityObject } from '@/constants/interfaces'
import { v4 as createId } from 'uuid'
import { DateTime } from 'luxon'

/**
 * _Entity Class
 * @param obj EntityObject
 */
export class _Entity {
  protected readonly id: Id
  protected readonly createdAt: CreatedAt

  constructor({ id = createId(), createdAt = new Date().toISOString() }: EntityObject = {}) {
    this.id = id
    this.createdAt = createdAt
  }

  static keys(): string[] {
    return Object.keys(new this())
  }

  static getTableColumns(): any[] {
    return [
      {
        name: 'id',
        label: 'Id',
        align: 'left',
        required: true,
        field: (row: _Entity) => row.getId(),
        sortable: true,
      },
      {
        name: 'createdAt',
        label: 'Created At',
        align: 'left',
        field: (row: _Entity) => row.getDisplayCreatedAt(),
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

  getId(): Id {
    return this.id
  }

  getCreatedAt(): CreatedAt {
    return this.createdAt
  }

  getDisplayCreatedAt(): string {
    return DateTime.fromISO(this.createdAt).toFormat('ccc LLL d yyyy ttt')
  }
}
