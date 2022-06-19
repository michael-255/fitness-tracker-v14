import type { TrackBoolean } from '@/constants/types'
import type { IExercise } from '@/constants/interfaces'
import { Store } from '@/constants/enums'
import { _Activity } from '@/models/_Activity'

// Exports for LocalDatabase
export const exerciseStoreIndices = Object.freeze({ [Store.EXERCISES]: '&id, name, status' })

/**
 * Exercise Class
 * @arg obj.id (Inherited)
 * @arg obj.createdAt (Inherited)
 * @arg obj.name (Inherited)
 * @arg obj.description (Inherited)
 * @arg obj.status (Inherited)
 * @arg obj.trackConfirm
 * @arg obj.trackMultipleSets
 * @arg obj.trackDuration
 * @arg obj.trackDistance
 * @arg obj.trackWeight
 * @arg obj.trackReps
 */
export class Exercise extends _Activity {
  trackConfirm?: TrackBoolean
  trackMultipleSets?: TrackBoolean
  trackDuration?: TrackBoolean
  trackDistance?: TrackBoolean
  trackWeight?: TrackBoolean
  trackReps?: TrackBoolean

  constructor({
    id,
    createdAt,
    name = 'My Exercise',
    description,
    status,
    trackConfirm = false,
    trackMultipleSets = false,
    trackDuration = false,
    trackDistance = false,
    trackWeight = false,
    trackReps = false,
  }: IExercise = {}) {
    super({ id, createdAt, name, description, status })
    this.trackConfirm = trackConfirm
    this.trackMultipleSets = trackMultipleSets
    this.trackDuration = trackDuration
    this.trackDistance = trackDistance
    this.trackWeight = trackWeight
    this.trackReps = trackReps
  }
}
