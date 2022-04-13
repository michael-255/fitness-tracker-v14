import { _Entity } from './_Entity'

type _RecordParams = {
  id?: string
  createdAt?: string
  parentId: string
  note?: string
}

/**
 * _Record Class
 * @param id
 * @param createdAt
 * @param parentId
 * @param note
 */
export class _Record extends _Entity {
  parentId: string
  note?: string

  constructor({ id, createdAt, parentId, note }: _RecordParams) {
    super({ id, createdAt })
    this.parentId = parentId
    this.note = note
  }
}
