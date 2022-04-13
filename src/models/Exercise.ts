import { _Action } from './_Action'

// Exports for LocalDatabase
export const ExerciseStore = Object.freeze({ exercises: '&id, name' })

export interface IExercise {
  id?: string
  createdAt?: string
  name: string
  description?: string
  trackConfirm?: boolean
  trackMultipleSets?: boolean
  trackDuration?: boolean
  trackDistance?: boolean
  trackWeight?: boolean
  trackReps?: boolean
}

/**
 * Exercise Class
 * @param id
 * @param createdAt
 * @param name
 * @param description
 * @param trackConfirm
 * @param trackMultipleSets
 * @param trackDuration
 * @param trackDistance
 * @param trackWeight
 * @param trackReps
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
    trackConfirm = false,
    trackMultipleSets = false,
    trackDuration = false,
    trackDistance = false,
    trackWeight = false,
    trackReps = false,
  }: IExercise) {
    super({ id, createdAt, name, description })
    this.trackConfirm = trackConfirm
    this.trackMultipleSets = trackMultipleSets
    this.trackDuration = trackDuration
    this.trackDistance = trackDistance
    this.trackWeight = trackWeight
    this.trackReps = trackReps
  }
}
