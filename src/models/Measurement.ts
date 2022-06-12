import { _Activity } from './_Activity'
import type { IActivity, IUpdateActivity } from '@/models/_Activity'
import { Store } from '@/constants'

// Exports for LocalDatabase
export const measurementStoreIndices = Object.freeze({ [Store.MEASUREMENTS]: '&id, name, status' })

export interface IMeasurement extends IActivity, IMeasurementFields {}

export interface IUpdateMeasurement extends IUpdateActivity, IMeasurementFields {}

interface IMeasurementFields {
  trackLbs?: boolean
  trackInches?: boolean
  trackFeet?: boolean
  trackPercent?: boolean
}

/**
 * Measurement Class
 * @arg obj.id (Inherited, Optional)
 * @arg obj.createdAt (Inherited, Optional)
 * @arg obj.name (Inherited, Required)
 * @arg obj.description (Inherited, Optional)
 * @arg obj.status (Inherited, Optional)
 * @arg obj.trackLbs (Optional)
 * @arg obj.trackInches (Optional)
 * @arg obj.trackFeet (Optional)
 * @arg obj.trackPercent (Optional)
 */
export class Measurement extends _Activity {
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
