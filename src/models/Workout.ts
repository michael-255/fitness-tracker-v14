import type { Id } from '@/constants/types'
import type { IWorkout } from '@/constants/interfaces'
import { Store } from '@/constants/enums'
import { _Activity } from '@/models/_Activity'

// Exports for LocalDatabase
export const workoutStoreIndices = Object.freeze({ [Store.WORKOUTS]: '&id, name, status' })

/**
 * Workout Class
 * @arg obj.id (Inherited)
 * @arg obj.createdAt (Inherited)
 * @arg obj.name (Inherited)
 * @arg obj.description (Inherited)
 * @arg obj.status (Inherited)
 * @arg obj.exerciseIds
 */
export class Workout extends _Activity {
  exerciseIds?: Id[]

  constructor({
    id,
    createdAt,
    name = 'My Workout',
    description,
    status,
    exerciseIds = [],
  }: IWorkout = {}) {
    super({ id, createdAt, name, description, status })
    this.exerciseIds = exerciseIds
  }
}
