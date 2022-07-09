import type { Nullable } from '@/constants/types'

interface ExerciseSetParams {
  weight?: Nullable<number>
  reps?: Nullable<number>
  distance?: Nullable<number>
  duration?: Nullable<number>
}

/**
 * ExerciseSet Class
 * @param obj Partial<ExerciseSetParams>
 */
export class ExerciseSet {
  protected weight: Nullable<number>
  protected reps: Nullable<number>
  protected distance: Nullable<number>
  protected duration: Nullable<number>

  constructor({
    weight = null,
    reps = null,
    distance = null,
    duration = null,
  }: Partial<ExerciseSetParams> = {}) {
    this.weight = weight
    this.reps = reps
    this.distance = distance
    this.duration = duration
  }

  getWeight(): Nullable<number> {
    return this.weight
  }

  getReps(): Nullable<number> {
    return this.reps
  }

  getDistance(): Nullable<number> {
    return this.distance
  }

  getDuration(): Nullable<number> {
    return this.duration
  }

  updateSet(props: Partial<ExerciseSetParams>): void {
    props.weight ? (this.weight = props.weight) : (this.weight = null)
    props.reps ? (this.reps = props.reps) : (this.reps = null)
    props.distance ? (this.distance = props.distance) : (this.distance = null)
    props.duration ? (this.duration = props.duration) : (this.duration = null)
  }

  clearSet(): void {
    this.weight = null
    this.reps = null
    this.distance = null
    this.duration = null
  }
}
