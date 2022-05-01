import { _Entity } from '@/models/_Entity'
import type { IEntity } from '@/models/_Entity'

export enum ActionStatus {
  DISABLED = 'Disabled',
  ENABLED = 'Enabled',
  ARCHIVED = 'Archived',
}

export interface IAction extends IEntity {
  name: string // Required
  description?: string
  status?: ActionStatus
}

export interface IUpdateAction {
  name?: string
  description?: string
  status?: ActionStatus
}

/**
 * _Action Class
 * @arg obj.id (Inherited, Optional)
 * @arg obj.createdAt (Inherited, Optional)
 * @arg obj.name (Required)
 * @arg obj.description (Optional)
 * @arg obj.status (Defaulted)
 */
export class _Action extends _Entity {
  name: string // Required
  description?: string
  status?: ActionStatus

  constructor({ id, createdAt, name, description, status = ActionStatus.ENABLED }: IAction) {
    super({ id, createdAt })
    this.name = name
    this.description = description
    this.status = status
  }
}
