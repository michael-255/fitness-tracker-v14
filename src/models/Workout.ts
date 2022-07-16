import { _Activity, type IActivity } from '@/models/_Activity'
import { truncateString } from '@/utils/common'

export interface IWorkout extends IActivity {
  exerciseIds: string[]
}

/**
 * Workout Class
 * @param params IWorkout
 */
export class Workout extends _Activity {
  exerciseIds: string[]

  constructor(params: IWorkout) {
    super({
      id: params.id,
      createdAt: params.createdAt,
      name: params.name,
      description: params.description,
      status: params.status,
    })
    this.exerciseIds = params.exerciseIds
  }

  static getTableColumns(): any[] {
    return [
      ..._Activity.getTableColumns(),
      {
        name: 'exerciseIds',
        label: 'Exercise Ids',
        align: 'left',
        field: (row: Workout) => row.exerciseIds,
        format: (val: string[]) => truncateString(val.toString()),
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Activity.getVisibleColumns()]
  }
}
