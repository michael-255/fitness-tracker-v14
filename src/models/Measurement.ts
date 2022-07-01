import type { TrackBoolean } from '@/constants/types'
import type { MeasurementObject } from '@/constants/interfaces'
import { _Activity } from './_Activity'

/**
 * Measurement Class
 * @param obj MeasurementObject
 */
export class Measurement extends _Activity {
  protected trackLbs: TrackBoolean
  protected trackInches: TrackBoolean
  protected trackFeet: TrackBoolean
  protected trackPercent: TrackBoolean

  constructor({
    id,
    createdAt,
    name = 'My Measurement',
    description,
    trackLbs = false,
    trackInches = false,
    trackFeet = false,
    trackPercent = false,
  }: MeasurementObject = {}) {
    super({ id, createdAt, name, description })
    this.trackLbs = trackLbs
    this.trackInches = trackInches
    this.trackFeet = trackFeet
    this.trackPercent = trackPercent
  }
}
