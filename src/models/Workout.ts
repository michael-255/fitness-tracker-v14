import { _Action } from '@/models/_Action'
import type { IAction, IUpdateAction } from '@/models/_Action'
import { Store } from '@/constants'

// Exports for LocalDatabase
export const workoutStoreIndices = Object.freeze({ [Store.WORKOUTS]: '&id, name, status' })

export interface IWorkout extends IAction, IWorkoutFields {}

export interface IUpdateWorkout extends IUpdateAction, IWorkoutFields {}

interface IWorkoutFields {
  exerciseIds?: string[]
}

/**
 * Workout Class
 * @arg obj.id (Inherited, Optional)
 * @arg obj.createdAt (Inherited, Optional)
 * @arg obj.name (Inherited, Required)
 * @arg obj.description (Inherited, Optional)
 * @arg obj.status (Inherited, Optional)
 * @arg obj.exerciseIds (Defaulted)
 */
export class Workout extends _Action {
  exerciseIds?: string[]

  constructor({ id, createdAt, name, description, status, exerciseIds = [] }: IWorkout) {
    super({ id, createdAt, name, description, status })
    this.exerciseIds = exerciseIds
  }
}
