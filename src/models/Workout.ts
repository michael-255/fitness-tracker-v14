import type { Id } from '@/constants/types'
import type { WorkoutObject } from '@/constants/interfaces'
import { _Activity } from '@/models/_Activity'

/**
 * Workout Class
 * @param obj WorkoutObject
 */
export class Workout extends _Activity {
  protected exerciseIds: Id[]

  constructor({
    id,
    createdAt,
    name = 'My Workout',
    description,
    exerciseIds = [],
  }: WorkoutObject = {}) {
    super({ id, createdAt, name, description })
    this.exerciseIds = exerciseIds
  }
}
