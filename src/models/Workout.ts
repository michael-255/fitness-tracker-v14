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

/**
 * Workout Class
 * @param id
 * @param createdAt
 * @param name
 * @param description
 * @param exerciseIds
 */
export class Workout extends _Action {
  exerciseIds?: string[]

  constructor({ id, createdAt, name, description, exerciseIds = [] }: IWorkout) {
    super({ id, createdAt, name, description })
    this.exerciseIds = exerciseIds
  }
}
