import type { Id, CreatedAt } from '@/constants/types'
import type { IEntity } from '@/constants/interfaces'
import { createId } from '@/utils/build-id'

/**
 * _Entity Class
 * @arg obj.id
 * @arg obj.createdAt
 */
export class _Entity {
  id?: Id
  createdAt?: CreatedAt

  constructor({ id = createId(), createdAt = new Date().toISOString() }: IEntity = {}) {
    this.id = id
    this.createdAt = createdAt
  }
}
