import type { Nullable } from '@/constants/types'
import { _Entity, type EntityParams } from '@/models/_Entity'
import { truncateString } from '@/utils/common'

export interface RecordParams extends EntityParams {
  parentId?: string
  note?: Nullable<string>
}

/**
 * _Record Class
 * @param obj Partial<RecordParams>
 */
export class _Record extends _Entity {
  protected parentId: string
  protected note: Nullable<string>

  constructor({ id, createdAt, parentId = '', note = null }: Partial<RecordParams> = {}) {
    super({ id, createdAt })
    this.parentId = parentId
    this.note = note
  }

  static getTableColumns(): any[] {
    return [
      ..._Entity.getTableColumns(),
      {
        name: 'parentId',
        label: 'Parent Id',
        align: 'left',
        field: (row: _Record) => row.getParentId(),
        sortable: true,
      },
      {
        name: 'note',
        label: 'Note',
        align: 'left',
        field: (row: _Record) => truncateString(row.getNote(), 40),
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Entity.getVisibleColumns(), 'parentId', 'note']
  }

  getParentId(): string {
    return this.parentId
  }

  getNote(): Nullable<string> {
    return this.note
  }
}
