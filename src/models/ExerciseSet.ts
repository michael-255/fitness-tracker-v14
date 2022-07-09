import type { Nullable } from '@/constants/globals'

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
  public weight: Nullable<number>
  public reps: Nullable<number>
  public distance: Nullable<number>
  public duration: Nullable<number>

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
