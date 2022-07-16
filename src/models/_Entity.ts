import { DateTime } from 'luxon'

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
  id: string
  createdAt: string

  constructor(params: IEntity) {
    this.id = params.id
    this.createdAt = params.createdAt
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
        label: 'Created Date',
        align: 'left',
        field: (row: _Entity) => row.createdAt,
        format: (val: string) => DateTime.fromISO(val).toFormat('ccc LLL d yyyy ttt'),
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return []
  }

  static getColumnOptions(): any[] {
    return this.getTableColumns().filter((i: any) => i.name !== 'id')
  }

  getReadableCreatedAt(): string {
    return DateTime.fromISO(this.createdAt).toFormat('ccc LLL d yyyy ttt')
  }
}
