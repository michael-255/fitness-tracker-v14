import { _Entity } from '@/models/_Entity'
import type { IEntity } from '@/models/_Entity'

export enum ActivityStatus {
  DISABLED = 'Disabled',
  ENABLED = 'Enabled',
  ARCHIVED = 'Archived',
}

export interface IActivity extends IEntity {
  name: string // Required
  description?: string
  status?: ActivityStatus
}

export interface IUpdateActivity {
  name?: string
  description?: string
  status?: ActivityStatus
}

/**
 * _Activity Class
 * @arg obj.id (Inherited, Optional)
 * @arg obj.createdAt (Inherited, Optional)
 * @arg obj.name (Required)
 * @arg obj.description (Optional)
 * @arg obj.status (Defaulted)
 */
export class _Activity extends _Entity {
  name: string // Required
  description?: string
  status?: ActivityStatus

  constructor({ id, createdAt, name, description, status = ActivityStatus.ENABLED }: IActivity) {
    super({ id, createdAt })
    this.name = name
    this.description = description
    this.status = status
  }
}
