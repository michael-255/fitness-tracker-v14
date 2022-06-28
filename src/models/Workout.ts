import type { Id } from '@/constants/types'
import type { IWorkout } from '@/constants/interfaces'
import { DBTable } from '@/constants/enums'
import { _Activity } from '@/models/_Activity'

// Exports for LocalDatabase
export const workoutTableIndices = Object.freeze({ [DBTable.WORKOUTS]: '&id, name, status' })

/**
 * Workout Class
 * @param obj.id (Inherited)
 * @param obj.createdAt (Inherited)
 * @param obj.name (Inherited)
 * @param obj.description (Inherited)
 * @param obj.exerciseIds
 */
export class Workout extends _Activity {
  exerciseIds: Id[]

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
