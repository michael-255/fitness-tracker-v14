import { _Activity } from '@/models/_Activity'
import type { IActivity, IUpdateActivity } from '@/models/_Activity'
import { Store } from '@/constants'

// Exports for LocalDatabase
export const exerciseStoreIndices = Object.freeze({ [Store.EXERCISES]: '&id, name, status' })

export interface IExercise extends IActivity, IExerciseFields {}

export interface IUpdateExercise extends IUpdateActivity, IExerciseFields {}

interface IExerciseFields {
  trackConfirm?: boolean
  trackMultipleSets?: boolean
  trackDuration?: boolean
  trackDistance?: boolean
  trackWeight?: boolean
  trackReps?: boolean
}

/**
 * Exercise Class
 * @arg obj.id (Inherited, Optional)
 * @arg obj.createdAt (Inherited, Optional)
 * @arg obj.name (Inherited, Required)
 * @arg obj.description (Inherited, Optional)
 * @arg obj.status (Inherited, Optional)
 * @arg obj.trackConfirm (Optional)
 * @arg obj.trackMultipleSets (Optional)
 * @arg obj.trackDuration (Optional)
 * @arg obj.trackDistance (Optional)
 * @arg obj.trackWeight (Optional)
 * @arg obj.trackReps (Optional)
 */
export class Exercise extends _Activity {
  trackConfirm?: boolean
  trackMultipleSets?: boolean
  trackDuration?: boolean
  trackDistance?: boolean
  trackWeight?: boolean
  trackReps?: boolean

  constructor({
    id,
    createdAt,
    name,
    description,
    status,
    trackConfirm,
    trackMultipleSets,
    trackDuration,
    trackDistance,
    trackWeight,
    trackReps,
  }: IExercise) {
    super({ id, createdAt, name, description, status })
    this.trackConfirm = trackConfirm
    this.trackMultipleSets = trackMultipleSets
    this.trackDuration = trackDuration
    this.trackDistance = trackDistance
    this.trackWeight = trackWeight
    this.trackReps = trackReps
  }
}
