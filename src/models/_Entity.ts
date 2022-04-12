import { createId } from '@/utils/build-id'

type _EntityParams = {
  id?: string
  createdAt?: string
}

/**
 * _Entity Class
 * @param id
 * @param createdAt
 */
export class _Entity {
  id: string
  createdAt: string

  constructor({ id = createId(), createdAt = new Date().toISOString() }: _EntityParams = {}) {
    this.id = id
    this.createdAt = createdAt
  }
}
