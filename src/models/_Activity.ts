import type { ActivityName, TextBlock } from '@/constants/types'
import type { IActivity } from '@/constants/interfaces'
import { _Entity } from '@/models/_Entity'

/**
 * _Activity Class
 * @param obj.id (Inherited)
 * @param obj.createdAt (Inherited)
 * @param obj.name
 * @param obj.description
 */
export class _Activity extends _Entity {
  name: ActivityName
  description: TextBlock

  constructor({ id, createdAt, name = 'My Activity', description = null }: IActivity = {}) {
    super({ id, createdAt })
    this.name = name
    this.description = description
  }
}
