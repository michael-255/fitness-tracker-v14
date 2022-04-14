import { _Action } from './_Action'

// Exports for LocalDatabase
export const ExerciseStore = Object.freeze({ exercises: '&id, name' })

export interface IExercise {
  id?: string
  createdAt?: string
  name: string
  description?: string
  disabled?: boolean
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
  disabled?: boolean
  trackConfirm?: boolean
  trackMultipleSets?: boolean
  trackDuration?: boolean
  trackDistance?: boolean
  trackWeight?: boolean
  trackReps?: boolean
}

/**
 * Exercise Class
 * @param id (Inherited, Optional)
 * @param createdAt (Inherited, Optional)
 * @param name (Inherited, Required)
 * @param description (Inherited, Optional)
 * @param disabled (Inherited, Optional)
 * @param trackConfirm (Defaulted)
 * @param trackMultipleSets (Defaulted)
 * @param trackDuration (Defaulted)
 * @param trackDistance (Defaulted)
 * @param trackWeight (Defaulted)
 * @param trackReps (Defaulted)
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
    disabled,
    trackConfirm = false,
    trackMultipleSets = false,
    trackDuration = false,
    trackDistance = false,
    trackWeight = false,
    trackReps = false,
  }: IExercise) {
    super({ id, createdAt, name, description, disabled })
    this.trackConfirm = trackConfirm
    this.trackMultipleSets = trackMultipleSets
    this.trackDuration = trackDuration
    this.trackDistance = trackDistance
    this.trackWeight = trackWeight
    this.trackReps = trackReps
  }
}
