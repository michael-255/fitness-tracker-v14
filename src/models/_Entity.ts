import { createId } from '@/utils/build-id'

interface IEntityParams {
  id?: string
  createdAt?: string
}

/**
 * _Entity Class
 * @param {string} obj.id (Defaulted)
 * @param {string} obj.createdAt (Defaulted)
 */
export class _Entity {
  id?: string
  createdAt?: string

  constructor({ id = createId(), createdAt = new Date().toISOString() }: IEntityParams = {}) {
    this.id = id
    this.createdAt = createdAt
  }
}
