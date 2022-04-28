import { _Action, ActionStatus } from './_Action'

// Exports for LocalDatabase
export const MeasurementStore = Object.freeze({ measurements: '&id, name, status' })

export interface IMeasurement {
  id?: string
  createdAt?: string
  name: string
  description?: string
  status?: ActionStatus
  trackLbs?: boolean
  trackInches?: boolean
  trackFeet?: boolean
  trackPercent?: boolean
}

export interface IUpdateMeasurement {
  name?: string
  description?: string
  status?: ActionStatus
  trackLbs?: boolean
  trackInches?: boolean
  trackFeet?: boolean
  trackPercent?: boolean
}

/**
 * Measurement Class
 * @param {string} obj.id (Inherited, Optional)
 * @param {string} obj.createdAt (Inherited, Optional)
 * @param {string} obj.name (Inherited, Required)
 * @param {string} obj.description (Inherited, Optional)
 * @param {ActionStatus} obj.status (Inherited, Optional)
 * @param {boolean} obj.trackLbs (Optional)
 * @param {boolean} obj.trackInches (Optional)
 * @param {boolean} obj.trackFeet (Optional)
 * @param {boolean} obj.trackPercent (Optional)
 */
export class Measurement extends _Action {
  trackLbs?: boolean
  trackInches?: boolean
  trackFeet?: boolean
  trackPercent?: boolean

  constructor({
    id,
    createdAt,
    name,
    description,
    status,
    trackLbs,
    trackInches,
    trackFeet,
    trackPercent,
  }: IMeasurement) {
    super({ id, createdAt, name, description, status })
    this.trackLbs = trackLbs
    this.trackInches = trackInches
    this.trackFeet = trackFeet
    this.trackPercent = trackPercent
  }
}
