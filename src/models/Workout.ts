import { _Activity, type ActivityParams } from '@/models/_Activity'

interface WorkoutParams extends ActivityParams {
  exerciseIds?: string[]
}

/**
 * Workout Class
 * @param obj Partial<WorkoutParams>
 */
export class Workout extends _Activity {
  protected exerciseIds: string[]

  constructor({
    id,
    createdAt,
    name = 'My Workout',
    description,
    exerciseIds = [],
  }: Partial<WorkoutParams> = {}) {
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

  getExerciseIds(): string[] {
    return this.exerciseIds
  }
}
