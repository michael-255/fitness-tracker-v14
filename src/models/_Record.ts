import { _Entity } from './_Entity'

type _RecordParams = {
  id?: string
  createdAt?: string
  parentId?: string
  note?: string
  data?: object
}

/**
 * _Record Class
 * @param id
 * @param createdAt
 * @param parentId
 * @param note
 * @param data
 */
export class _Record extends _Entity {
  parentId: string
  note: string
  data: object

  constructor({ id, createdAt, parentId = '', note = '', data = {} }: _RecordParams = {}) {
    super({ id, createdAt })
    this.parentId = parentId
    this.note = note
    this.data = data
  }

  getParentEntity(): Error {
    return new Error('Not Implemented')
  }
}
