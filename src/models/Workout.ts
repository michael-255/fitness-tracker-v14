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

  static getTableColumns(): any[] {
    return [
      ..._Activity.getTableColumns(),
      {
        name: 'exerciseIds',
        label: 'Exercise Ids',
        align: 'left',
        field: (row: Workout) => row.getExerciseIds(),
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Activity.getVisibleColumns(), 'exerciseIds']
  }

  getExerciseIds(): Id[] {
    return this.exerciseIds
  }
}
