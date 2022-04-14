import { _Entity } from './_Entity'

interface IActionParams {
  id?: string
  createdAt?: string
  name: string
  description?: string
  disabled?: boolean
}

/**
 * _Action Class
 * @param id (Inherited, Optional)
 * @param createdAt (Inherited, Optional)
 * @param name (Required)
 * @param description (Optional)
 * @param disabled (Optional)
 */
export class _Action extends _Entity {
  name: string
  description?: string
  disabled?: boolean

  constructor({ id, createdAt, name, description, disabled }: IActionParams) {
    super({ id, createdAt })
    this.name = name
    this.description = description
    this.disabled = disabled
  }
}
