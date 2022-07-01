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
}
