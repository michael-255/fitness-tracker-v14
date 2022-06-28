import type { TrackBoolean } from '@/constants/types'
import type { IExercise } from '@/constants/interfaces'
import { DBTable } from '@/constants/enums'
import { _Activity } from '@/models/_Activity'

// Exports for LocalDatabase
export const exerciseTableIndices = Object.freeze({ [DBTable.EXERCISES]: '&id, name, status' })

/**
 * Exercise Class
 * @param obj.id (Inherited)
 * @param obj.createdAt (Inherited)
 * @param obj.name (Inherited)
 * @param obj.description (Inherited)
 * @param obj.trackMultipleSets
 * @param obj.trackDuration
 * @param obj.trackDistance
 * @param obj.trackWeight
 * @param obj.trackReps
 */
export class Exercise extends _Activity {
  trackMultipleSets: TrackBoolean
  trackDuration: TrackBoolean
  trackDistance: TrackBoolean
  trackWeight: TrackBoolean
  trackReps: TrackBoolean

  constructor({
    id,
    createdAt,
    name = 'My Exercise',
    description,
    trackMultipleSets = false,
    trackDuration = false,
    trackDistance = false,
    trackWeight = false,
    trackReps = false,
  }: IExercise = {}) {
    super({ id, createdAt, name, description })
    this.trackMultipleSets = trackMultipleSets
    this.trackDuration = trackDuration
    this.trackDistance = trackDistance
    this.trackWeight = trackWeight
    this.trackReps = trackReps
  }
}
