import type { Name, Description } from '@/constants/types'
import { Status } from '@/constants/enums'
import type { IActivity } from '@/constants/interfaces'
import { _Entity } from '@/models/_Entity'

/**
 * _Activity Class
 * @arg obj.id (Inherited)
 * @arg obj.createdAt (Inherited)
 * @arg obj.name
 * @arg obj.description
 * @arg obj.status
 */
export class _Activity extends _Entity {
  name?: Name
  description?: Description
  status?: Status

  constructor({
    id,
    createdAt,
    name = 'My Activity',
    description = '',
    status = Status.ENABLED,
  }: IActivity = {}) {
    super({ id, createdAt })
    this.name = name
    this.description = description
    this.status = status
  }
}
