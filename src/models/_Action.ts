import { _Entity } from './_Entity'

type _ActionParams = {
  id?: string
  createdAt?: string
  name: string
  description?: string
}

/**
 * _Action Class
 * @param id
 * @param createdAt
 * @param name
 * @param description
 */
export class _Action extends _Entity {
  name: string
  description?: string

  constructor({ id, createdAt, name, description }: _ActionParams) {
    super({ id, createdAt })
    this.name = name
    this.description = description
  }
}
