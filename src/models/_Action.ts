import { _Entity } from './_Entity'

interface IActionParams {
  id?: string
  createdAt?: string
  name: string
  description?: string
}

/**
 * _Action Class
 * @param id (Inherited, Optional)
 * @param createdAt (Inherited, Optional)
 * @param name (Required)
 * @param description (Optional)
 */
export class _Action extends _Entity {
  name: string
  description?: string

  constructor({ id, createdAt, name, description }: IActionParams) {
    super({ id, createdAt })
    this.name = name
    this.description = description
  }
}
