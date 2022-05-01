import { createId } from '@/utils/build-id'

export interface IEntity {
  id?: string
  createdAt?: string
}

/**
 * _Entity Class
 * @arg obj.id (Defaulted)
 * @arg obj.createdAt (Defaulted)
 */
export class _Entity {
  id?: string
  createdAt?: string

  constructor({ id = createId(), createdAt = new Date().toISOString() }: IEntity = {}) {
    this.id = id
    this.createdAt = createdAt
  }
}
