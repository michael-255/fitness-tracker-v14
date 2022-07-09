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
  public id: string
  public createdAt: string

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
