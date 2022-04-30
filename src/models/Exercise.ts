import { _Action } from '@/models/_Action'
import type { IAction, IUpdateAction } from '@/models/_Action'
import { Store } from '@/constants'

// Exports for LocalDatabase
export const exerciseStoreIndices = Object.freeze({ [Store.EXERCISES]: '&id, name, status' })

export interface IExercise extends IAction, IExerciseFields {}

export interface IUpdateExercise extends IUpdateAction, IExerciseFields {}

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
 * @param {string} obj.id (Inherited, Optional)
 * @param {string} obj.createdAt (Inherited, Optional)
 * @param {string} obj.name (Inherited, Required)
 * @param {string} obj.description (Inherited, Optional)
 * @param {ActionStatus} obj.status (Inherited, Optional)
 * @param {boolean} obj.trackConfirm (Optional)
 * @param {boolean} obj.trackMultipleSets (Optional)
 * @param {boolean} obj.trackDuration (Optional)
 * @param {boolean} obj.trackDistance (Optional)
 * @param {boolean} obj.trackWeight (Optional)
 * @param {boolean} obj.trackReps (Optional)
 */
export class Exercise extends _Action {
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
