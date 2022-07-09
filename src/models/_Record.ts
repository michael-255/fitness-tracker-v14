import { RecordStatus } from '@/constants/enums'
import type { Nullable } from '@/constants/globals'
import { _Entity, type EntityParams } from '@/models/_Entity'
import { truncateString } from '@/utils/common'

export interface RecordParams extends EntityParams {
  parentId?: string
  note?: Nullable<string>
  status?: RecordStatus
}

/**
 * _Record Class
 * @param obj Partial<RecordParams>
 */
export class _Record extends _Entity {
  public parentId: string
  public note: Nullable<string>
  public status: RecordStatus

  constructor({
    id,
    createdAt,
    parentId = '',
    note = null,
    status = RecordStatus.IN_PROGRESS,
  }: Partial<RecordParams> = {}) {
    super({ id, createdAt })
    this.parentId = parentId
    this.note = note
    this.status = status
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
        field: (row: _Record) => truncateString(row.note, 40),
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
    return [..._Entity.getVisibleColumns(), 'parentId', 'note']
  }
}
