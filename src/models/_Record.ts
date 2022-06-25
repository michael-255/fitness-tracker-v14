import type { Id, TextBlock } from '@/constants/types'
import type { IRecord } from '@/constants/interfaces'
import { _Entity } from '@/models/_Entity'

/**
 * _Record Class
 * @arg obj.id (Inherited)
 * @arg obj.createdAt (Inherited)
 * @arg obj.parentId
 * @arg obj.note
 */
export class _Record extends _Entity {
  parentId?: Id
  note?: TextBlock

  constructor({ id, createdAt, parentId = '', note = null }: IRecord = {}) {
    super({ id, createdAt })
    this.parentId = parentId
    this.note = note
  }
}
