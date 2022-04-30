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
