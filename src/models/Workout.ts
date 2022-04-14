import { _Action } from './_Action'

// Exports for LocalDatabase
export const WorkoutStore = Object.freeze({ workouts: '&id, name' })

export interface IWorkout {
  id?: string
  createdAt?: string
  name: string
  description?: string
  exerciseIds?: string[]
}

export interface IUpdateWorkout {
  name?: string
  description?: string
  exerciseIds?: string[]
}

/**
 * Workout Class
 * @param id (Inherited, Optional)
 * @param createdAt (Inherited, Optional)
 * @param name (Inherited, Required)
 * @param description (Inherited, Optional)
 * @param exerciseIds (Defaulted)
 */
export class Workout extends _Action {
  exerciseIds?: string[]

  constructor({ id, createdAt, name, description, exerciseIds = [] }: IWorkout) {
    super({ id, createdAt, name, description })
    this.exerciseIds = exerciseIds
  }
}
