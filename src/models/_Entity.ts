import { createId } from '@/utils/build-id'

interface IEntityParams {
  id?: string
  createdAt?: string
}

/**
 * _Entity Class
 * @param id (Defaulted)
 * @param createdAt (Defaulted)
 */
export class _Entity {
  id?: string
  createdAt?: string

  constructor({ id = createId(), createdAt = new Date().toISOString() }: IEntityParams = {}) {
    this.id = id
    this.createdAt = createdAt
  }
}
