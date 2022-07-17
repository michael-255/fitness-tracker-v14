import { DateTime } from 'luxon'

export interface IEntity {
  id: string
  createdAt: string
  // updatedAt: string
  // deletedAt: string
}

/**
 * _Entity Class
 * @param params IEntity
 */
export class _Entity {
  id: string
  createdAt: string

  constructor(params: IEntity) {
    this.id = params.id
    this.createdAt = params.createdAt
  }

  getReadableCreatedAt(): string {
    return DateTime.fromISO(this.createdAt).toFormat('ccc LLL d yyyy ttt')
  }
}
