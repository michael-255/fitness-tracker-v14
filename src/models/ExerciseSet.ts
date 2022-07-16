export interface IExerciseSet {
  weightLbs?: number
  reps?: number
  distanceMiles?: number
  durationMinutes?: number
}

/**
 * ExerciseSet Class
 * @param obj IExerciseSet
 */
export class ExerciseSet {
  weightLbs?: number
  reps?: number
  distanceMiles?: number
  durationMinutes?: number

  constructor(params: IExerciseSet) {
    this.weightLbs = params.weightLbs
    this.reps = params.reps
    this.distanceMiles = params.distanceMiles
    this.durationMinutes = params.durationMinutes
  }

  clearExerciseSet(): void {
    this.weightLbs = undefined
    this.reps = undefined
    this.distanceMiles = undefined
    this.durationMinutes = undefined
  }
}
