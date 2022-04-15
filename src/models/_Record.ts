import { _Entity } from './_Entity'

interface IRecordParams {
  id?: string
  createdAt?: string
  parentId: string
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
  parentId: string
  note?: string

  constructor({ id, createdAt, parentId, note }: IRecordParams) {
    super({ id, createdAt })
    this.parentId = parentId
    this.note = note
  }
}
