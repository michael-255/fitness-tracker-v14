import { _Entity } from '@/models/_Entity'
import type { IEntity } from '@/models/_Entity'

export interface IRecord extends IEntity {
  parentId: string // Required
  note?: string
}

export interface IUpdateRecord {
  note?: string
}

/**
 * _Record Class
 * @arg obj.id (Inherited, Optional)
 * @arg obj.createdAt (Inherited, Optional)
 * @arg obj.parentId (Required)
 * @arg obj.note (Optional)
 */
export class _Record extends _Entity {
  parentId: string // Required
  note?: string

  constructor({ id, createdAt, parentId, note }: IRecord) {
    super({ id, createdAt })
    this.parentId = parentId
    this.note = note
  }
}
