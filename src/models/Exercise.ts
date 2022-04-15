import { _Action, ActionStatus } from './_Action'

// Exports for LocalDatabase
export const ExerciseStore = Object.freeze({ exercises: '&id, name, status' })

export interface IExercise {
  id?: string
  createdAt?: string
  name: string
  description?: string
  status?: ActionStatus
  trackConfirm?: boolean
  trackMultipleSets?: boolean
  trackDuration?: boolean
  trackDistance?: boolean
  trackWeight?: boolean
  trackReps?: boolean
}

export interface IUpdateExercise {
  name?: string
  description?: string
  status?: ActionStatus
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
 * @param {boolean} obj.trackConfirm (Defaulted)
 * @param {boolean} obj.trackMultipleSets (Defaulted)
 * @param {boolean} obj.trackDuration (Defaulted)
 * @param {boolean} obj.trackDistance (Defaulted)
 * @param {boolean} obj.trackWeight (Defaulted)
 * @param {boolean} obj.trackReps (Defaulted)
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
    trackConfirm = false,
    trackMultipleSets = false,
    trackDuration = false,
    trackDistance = false,
    trackWeight = false,
    trackReps = false,
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
