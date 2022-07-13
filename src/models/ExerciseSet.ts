import { isOptionalNumber } from '@/utils/validators'

interface ExerciseSetParams {
  weight?: number
  reps?: number
  distance?: number
  duration?: number
  // weightLbs?: number
  // reps?: number
  // distanceMiles?: number
  // durationMinutes?: number
}

/**
 * ExerciseSet Class
 * @param obj ExerciseSetParams
 */
export class ExerciseSet {
  protected weight?: number
  protected reps?: number
  protected distance?: number
  protected duration?: number
  // protected weightLbs?: number
  // protected reps?: number
  // protected distanceMiles?: number
  // protected durationMinutes?: number

  constructor(params: ExerciseSetParams) {
    if (isOptionalNumber(params.weight)) {
      this.weight = params.weight
    } else {
      throw new Error(`(constructor) Validation failed on weight << ${params.weight} >>`)
    }

    if (isOptionalNumber(params.reps)) {
      this.reps = params.reps
    } else {
      throw new Error(`(constructor) Validation failed on reps << ${params.reps} >>`)
    }

    if (isOptionalNumber(params.distance)) {
      this.distance = params.distance
    } else {
      throw new Error(`(constructor) Validation failed on distance << ${params.distance} >>`)
    }

    if (isOptionalNumber(params.duration)) {
      this.duration = params.duration
    } else {
      throw new Error(`(constructor) Validation failed on duration << ${params.duration} >>`)
    }
  }

  get ExerciseSet(): ExerciseSetParams {
    return {
      weight: this.weight,
      reps: this.reps,
      distance: this.distance,
      duration: this.duration,
    }
  }

  set ExerciseSet(params: ExerciseSetParams) {
    if (isOptionalNumber(params.weight)) {
      this.weight = params.weight
    } else {
      throw new Error(`(constructor) Validation failed on weight << ${params.weight} >>`)
    }

    if (isOptionalNumber(params.reps)) {
      this.reps = params.reps
    } else {
      throw new Error(`(constructor) Validation failed on reps << ${params.reps} >>`)
    }

    if (isOptionalNumber(params.distance)) {
      this.distance = params.distance
    } else {
      throw new Error(`(constructor) Validation failed on distance << ${params.distance} >>`)
    }

    if (isOptionalNumber(params.duration)) {
      this.duration = params.duration
    } else {
      throw new Error(`(constructor) Validation failed on duration << ${params.duration} >>`)
    }
  }

  clearExerciseSet(): void {
    this.weight = undefined
    this.reps = undefined
    this.distance = undefined
    this.duration = undefined
  }
}
