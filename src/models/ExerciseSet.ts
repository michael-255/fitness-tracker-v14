import { isOptionalNumber } from '@/utils/validators'

interface ExerciseSetParams {
  weight?: number
  reps?: number
  distance?: number
  duration?: number
}

/**
 * ExerciseSet Class
 * @param obj Partial<ExerciseSetParams>
 */
export class ExerciseSet {
  public weight?: number
  public reps?: number
  public distance?: number
  public duration?: number

  constructor(params: Partial<ExerciseSetParams>) {
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
