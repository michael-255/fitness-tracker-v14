import type { ActivityName, TextBlock } from '@/constants/types'
import type { ActivityObject } from '@/constants/interfaces'
import { _Entity } from '@/models/_Entity'

/**
 * _Activity Class
 * @param obj ActivityObject
 */
export class _Activity extends _Entity {
  protected name: ActivityName
  protected description: TextBlock

  constructor({ id, createdAt, name = 'My Activity', description = null }: ActivityObject = {}) {
    super({ id, createdAt })
    this.name = name
    this.description = description
  }

  getName(): ActivityName {
    return this.name
  }

  getDescription(): TextBlock {
    return this.description
  }
}
