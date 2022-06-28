import type { Id, CreatedAt } from '@/constants/types'
import type { IEntity } from '@/constants/interfaces'
import { v4 as createId } from 'uuid'

/**
 * _Entity Class
 * @param obj.id
 * @param obj.createdAt
 */
export class _Entity {
  id: Id
  createdAt: CreatedAt

  constructor({ id = createId(), createdAt = new Date().toISOString() }: IEntity = {}) {
    this.id = id
    this.createdAt = createdAt
  }

  static keys(): string[] {
    return Object.keys(new this())
  }
}
