import { v4 as createId } from 'uuid'
import { DateTime } from 'luxon'

export interface EntityParams {
  id?: string
  createdAt?: string
}

/**
 * _Entity Class
 * @param obj Partial<EntityParams>
 */
export class _Entity {
  protected readonly id: string
  protected readonly createdAt: string

  constructor({
    id = createId(),
    createdAt = new Date().toISOString(),
  }: Partial<EntityParams> = {}) {
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

  getId(): string {
    return this.id
  }

  getCreatedAt(): string {
    return this.createdAt
  }

  getDisplayCreatedAt(): string {
    return DateTime.fromISO(this.createdAt).toFormat('ccc LLL d yyyy ttt')
  }
}
