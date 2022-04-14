import { _Action } from './_Action'

// Exports for LocalDatabase
export const MeasurementStore = Object.freeze({ measurements: '&id, name' })

export interface IMeasurement {
  id?: string
  createdAt?: string
  name: string
  description?: string
  disabled?: boolean
  trackLbs?: boolean
  trackInches?: boolean
}

export interface IUpdateMeasurement {
  name?: string
  description?: string
  disabled?: boolean
  trackLbs?: boolean
  trackInches?: boolean
}

/**
 * Measurement Class
 * @param id (Inherited, Optional)
 * @param createdAt (Inherited, Optional)
 * @param name (Inherited, Required)
 * @param description (Inherited, Optional)
 * @param disabled (Inherited, Optional)
 * @param trackLbs (Optional)
 * @param trackInches (Optional)
 */
export class Measurement extends _Action {
  trackLbs?: boolean
  trackInches?: boolean

  constructor({
    id,
    createdAt,
    name,
    description,
    disabled,
    trackLbs = false,
    trackInches = false,
  }: IMeasurement) {
    super({ id, createdAt, name, description, disabled })
    this.trackLbs = trackLbs
    this.trackInches = trackInches
  }
}
