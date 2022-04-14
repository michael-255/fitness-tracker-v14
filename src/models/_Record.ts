import { _Entity } from './_Entity'

interface IRecordParams {
  id?: string
  createdAt?: string
  parentId: string
  note?: string
}

/**
 * _Record Class
 * @param id (Inherited, Optional)
 * @param createdAt (Inherited, Optional)
 * @param parentId (Required)
 * @param note (Optional)
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
