import type { Id, TextBlock } from '@/constants/types'
import type { RecordObject } from '@/constants/interfaces'
import { _Entity } from '@/models/_Entity'

/**
 * _Record Class
 * @param obj RecordObject
 */
export class _Record extends _Entity {
  protected parentId: Id
  protected note: TextBlock

  constructor({ id, createdAt, parentId = '', note = null }: RecordObject = {}) {
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
        field: (row: _Record) => row.getNote(),
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Entity.getVisibleColumns(), 'parentId', 'note']
  }

  getParentId(): Id {
    return this.parentId
  }

  getNote(): TextBlock {
    return this.note
  }
}
