import { _Activity } from '@/models/_Activity'
import type { IActivity, IUpdateActivity } from '@/models/_Activity'
import { Store } from '@/constants'

// Exports for LocalDatabase
export const workoutStoreIndices = Object.freeze({ [Store.WORKOUTS]: '&id, name, status' })

export interface IWorkout extends IActivity, IWorkoutFields {}

export interface IUpdateWorkout extends IUpdateActivity, IWorkoutFields {}

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
export class Workout extends _Activity {
  exerciseIds?: string[]

  constructor({ id, createdAt, name, description, status, exerciseIds = [] }: IWorkout) {
    super({ id, createdAt, name, description, status })
    this.exerciseIds = exerciseIds
  }
}
