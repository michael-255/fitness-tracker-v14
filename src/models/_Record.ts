import { _Entity, type IEntity } from '@/models/_Entity'
import type { RecordStatus } from '@/constants/enums'
import { truncateString } from '@/utils/common'
import { isIdValid, isTextValid, isRequired } from '@/utils/validators'

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
  protected parentId: string
  protected note: string
  protected status: RecordStatus

  constructor(params: IRecord) {
    super({ id: params.id, createdAt: params.createdAt })

    if (isIdValid(params.parentId)) {
      this.parentId = params.parentId
    } else {
      throw new Error(`(constructor) Validation failed on parentId << ${params.parentId} >>`)
    }

    if (isTextValid(params.note)) {
      this.note = params.note
    } else {
      throw new Error(`(constructor) Validation failed on note << ${params.note} >>`)
    }

    if (isRequired(params.status)) {
      this.status = params.status
    } else {
      throw new Error(`(constructor) Validation failed on status << ${params.status} >>`)
    }
  }

  get ParentId(): string {
    return this.parentId
  }

  set ParentId(parentId: string) {
    if (isIdValid(parentId)) {
      this.parentId = parentId
    } else {
      throw new Error(`Validation failed on parentId << ${parentId} >>`)
    }
  }

  get Note(): string {
    return this.note
  }

  set Note(note: string) {
    if (isTextValid(note)) {
      this.note = note
    } else {
      throw new Error(`Validation failed on note << ${note} >>`)
    }
  }

  get Status(): RecordStatus {
    return this.status
  }

  set Status(status: RecordStatus) {
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
    return [..._Entity.getVisibleColumns(), 'parentId', 'note', 'status']
  }
}
