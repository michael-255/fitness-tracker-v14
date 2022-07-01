import type { Id, CreatedAt } from '@/constants/types'
import type { EntityObject } from '@/constants/interfaces'
import { v4 as createId } from 'uuid'

/**
 * _Entity Class
 * @param obj EntityObject
 */
export class _Entity {
  protected readonly id: Id
  protected readonly createdAt: CreatedAt

  constructor({ id = createId(), createdAt = new Date().toISOString() }: EntityObject = {}) {
    this.id = id
    this.createdAt = createdAt
  }

  static keys(): string[] {
    return Object.keys(new this())
  }
}
