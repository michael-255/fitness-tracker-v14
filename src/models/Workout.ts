import { _Action, ActionStatus } from './_Action'

// Exports for LocalDatabase
export const WorkoutStore = Object.freeze({ workouts: '&id, name, status' })

export interface IWorkout {
  id?: string
  createdAt?: string
  name: string
  description?: string
  status?: ActionStatus
  exerciseIds?: string[]
}

export interface IUpdateWorkout {
  name?: string
  description?: string
  status?: ActionStatus
  exerciseIds?: string[]
}

/**
 * Workout Class
 * @param {string} obj.id (Inherited, Optional)
 * @param {string} obj.createdAt (Inherited, Optional)
 * @param {string} obj.name (Inherited, Required)
 * @param {string} obj.description (Inherited, Optional)
 * @param {ActionStatus} obj.status (Inherited, Optional)
 * @param {string[]} obj.exerciseIds (Defaulted)
 */
export class Workout extends _Action {
  exerciseIds?: string[]

  constructor({ id, createdAt, name, description, status, exerciseIds = [] }: IWorkout) {
    super({ id, createdAt, name, description, status })
    this.exerciseIds = exerciseIds
  }
}
