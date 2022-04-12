import { _Action } from './_Action'

// Exports for LocalDatabase
export const MeasurementStore = Object.freeze({ measurements: '&id, name' })
export interface IMeasurement {
  id: string
  createdAt: string
  name: string
  description: string
}

type MeasurementParams = {
  id?: string
  createdAt?: string
  name?: string
  description?: string
}

/**
 * Measurement Class
 * @param id
 * @param createdAt
 * @param name
 * @param description
 */
export class Measurement extends _Action {
  constructor({ id, createdAt, name, description }: MeasurementParams) {
    super({ id, createdAt, name, description })
  }
}
