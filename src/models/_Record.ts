import { _Entity, type IEntity } from '@/models/_Entity'
import type { RecordStatus } from '@/constants/enums'
import { truncateString } from '@/utils/common'

export interface IRecord extends IEntity {
  parentId: string
  note: string
  status: RecordStatus
}

/**
 * _Record Class
 * @param params IRecord
 */
export class _Record extends _Entity {
  parentId: string
  note: string
  status: RecordStatus

  constructor(params: IRecord) {
    super({ id: params.id, createdAt: params.createdAt })
    this.parentId = params.parentId
    this.note = params.note
    this.status = params.status
  }

  static getTableColumns(): any[] {
    return [
      ..._Entity.getTableColumns(),
      {
        name: 'parentId',
        label: 'Parent Id',
        align: 'left',
        field: (row: _Record) => row.parentId,
        sortable: true,
      },
      {
        name: 'note',
        label: 'Note',
        align: 'left',
        field: (row: _Record) => row.note,
        format: (val: string) => truncateString(val),
        sortable: true,
      },
      {
        name: 'status',
        label: 'Status',
        align: 'left',
        field: (row: _Record) => row.status,
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Entity.getVisibleColumns()]
  }
}
