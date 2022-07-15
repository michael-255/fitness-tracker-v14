import { isOptionalNumber } from '@/utils/validators'

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
  protected weightLbs?: number
  protected reps?: number
  protected distanceMiles?: number
  protected durationMinutes?: number

  constructor(params: IExerciseSet) {
    if (isOptionalNumber(params.weightLbs)) {
      this.weightLbs = params.weightLbs
    } else {
      throw new Error(`(constructor) Validation failed on weightLbs << ${params.weightLbs} >>`)
    }

    if (isOptionalNumber(params.reps)) {
      this.reps = params.reps
    } else {
      throw new Error(`(constructor) Validation failed on reps << ${params.reps} >>`)
    }

    if (isOptionalNumber(params.distanceMiles)) {
      this.distanceMiles = params.distanceMiles
    } else {
      throw new Error(
        `(constructor) Validation failed on distanceMiles << ${params.distanceMiles} >>`
      )
    }

    if (isOptionalNumber(params.durationMinutes)) {
      this.durationMinutes = params.durationMinutes
    } else {
      throw new Error(
        `(constructor) Validation failed on durationMinutes << ${params.durationMinutes} >>`
      )
    }
  }

  get ExerciseSet(): IExerciseSet {
    return {
      weightLbs: this.weightLbs,
      reps: this.reps,
      distanceMiles: this.distanceMiles,
      durationMinutes: this.durationMinutes,
    }
  }

  set ExerciseSet(params: IExerciseSet) {
    if (isOptionalNumber(params.weightLbs)) {
      this.weightLbs = params.weightLbs
    } else {
      throw new Error(`(constructor) Validation failed on weightLbs << ${params.weightLbs} >>`)
    }

    if (isOptionalNumber(params.reps)) {
      this.reps = params.reps
    } else {
      throw new Error(`(constructor) Validation failed on reps << ${params.reps} >>`)
    }

    if (isOptionalNumber(params.distanceMiles)) {
      this.distanceMiles = params.distanceMiles
    } else {
      throw new Error(
        `(constructor) Validation failed on distanceMiles << ${params.distanceMiles} >>`
      )
    }

    if (isOptionalNumber(params.durationMinutes)) {
      this.durationMinutes = params.durationMinutes
    } else {
      throw new Error(
        `(constructor) Validation failed on durationMinutes << ${params.durationMinutes} >>`
      )
    }
  }

  clearExerciseSet(): void {
    this.weightLbs = undefined
    this.reps = undefined
    this.distanceMiles = undefined
    this.durationMinutes = undefined
  }
}
