import { _Activity, type IActivity } from '@/models/_Activity'
import { truncateString } from '@/utils/common'
import { isRequired } from '@/utils/validators'

export interface IWorkout extends IActivity {
  exerciseIds: string[]
}

/**
 * Workout Class
 * @param params IWorkout
 */
export class Workout extends _Activity {
  protected exerciseIds: string[]

  constructor(params: IWorkout) {
    super({
      id: params.id,
      createdAt: params.createdAt,
      name: params.name,
      description: params.description,
      status: params.status,
    })

    if (isRequired(params.exerciseIds)) {
      this.exerciseIds = params.exerciseIds
    } else {
      throw new Error(`(constructor) Validation failed on exerciseIds << ${params.exerciseIds} >>`)
    }
  }

  get ExerciseIds(): string[] {
    return this.exerciseIds
  }

  set ExerciseIds(exerciseIds: string[]) {
    if (isRequired(exerciseIds)) {
      this.exerciseIds = exerciseIds
    } else {
      throw new Error(`Validation failed on exerciseIds << ${exerciseIds} >>`)
    }
  }

  static getTableColumns(): any[] {
    return [
      ..._Activity.getTableColumns(),
      {
        name: 'exerciseIds',
        label: 'Exercise Ids',
        align: 'left',
        field: (row: Workout) => truncateString(row.exerciseIds.toString(), 40),
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Activity.getVisibleColumns(), 'exerciseIds']
  }
}
