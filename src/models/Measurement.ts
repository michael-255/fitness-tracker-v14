import type { TrackBoolean } from '@/constants/types'
import type { IMeasurement } from '@/constants/interfaces'
import { DBTable } from '@/constants/enums'
import { _Activity } from './_Activity'

// Exports for LocalDatabase
export const measurementTableIndices = Object.freeze({
  [DBTable.MEASUREMENTS]: '&id, name, status',
})

/**
 * Measurement Class
 * @arg obj.id (Inherited)
 * @arg obj.createdAt (Inherited)
 * @arg obj.name (Inherited)
 * @arg obj.description (Inherited)
 * @arg obj.trackLbs
 * @arg obj.trackInches
 * @arg obj.trackFeet
 * @arg obj.trackPercent
 */
export class Measurement extends _Activity {
  trackLbs?: TrackBoolean
  trackInches?: TrackBoolean
  trackFeet?: TrackBoolean
  trackPercent?: TrackBoolean

  constructor({
    id,
    createdAt,
    name = 'My Measurement',
    description,
    trackLbs = false,
    trackInches = false,
    trackFeet = false,
    trackPercent = false,
  }: IMeasurement = {}) {
    super({ id, createdAt, name, description })
    this.trackLbs = trackLbs
    this.trackInches = trackInches
    this.trackFeet = trackFeet
    this.trackPercent = trackPercent
  }
}
