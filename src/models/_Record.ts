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
 * @param {string} obj.id (Inherited, Optional)
 * @param {string} obj.createdAt (Inherited, Optional)
 * @param {string} obj.parentId (Required)
 * @param {string} obj.note (Optional)
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
