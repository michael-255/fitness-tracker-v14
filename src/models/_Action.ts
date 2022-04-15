import { _Entity } from './_Entity'

export enum ActionStatus {
  DISABLED = 'Disabled',
  ENABLED = 'Enabled',
  ARCHIVED = 'Archived',
}

interface IActionParams {
  id?: string
  createdAt?: string
  name: string
  description?: string
  status?: ActionStatus
}

/**
 * _Action Class
 * @param {string} obj.id (Inherited, Optional)
 * @param {string} obj.createdAt (Inherited, Optional)
 * @param {string} obj.name (Required)
 * @param {string} obj.description (Optional)
 * @param {ActionStatus} obj.status (Defaulted)
 */
export class _Action extends _Entity {
  name: string
  description?: string
  status?: ActionStatus

  constructor({ id, createdAt, name, description, status = ActionStatus.ENABLED }: IActionParams) {
    super({ id, createdAt })
    this.name = name
    this.description = description
    this.status = status
  }
}
