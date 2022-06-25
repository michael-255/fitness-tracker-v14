import type { Id } from '@/constants/types'
import type { IWorkout } from '@/constants/interfaces'
import { DBTable } from '@/constants/enums'
import { _Activity } from '@/models/_Activity'

// Exports for LocalDatabase
export const workoutTableIndices = Object.freeze({ [DBTable.WORKOUTS]: '&id, name, status' })

/**
 * Workout Class
 * @arg obj.id (Inherited)
 * @arg obj.createdAt (Inherited)
 * @arg obj.name (Inherited)
 * @arg obj.description (Inherited)
 * @arg obj.exerciseIds
 */
export class Workout extends _Activity {
  exerciseIds?: Id[]

  constructor({
    id,
    createdAt,
    name = 'My Workout',
    description,
    exerciseIds = [],
  }: IWorkout = {}) {
    super({ id, createdAt, name, description })
    this.exerciseIds = exerciseIds
  }
}
