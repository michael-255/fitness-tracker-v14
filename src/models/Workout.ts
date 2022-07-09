import { DBTable } from '@/constants/enums'
import { _Activity, type ActivityParams } from '@/models/_Activity'
import { database } from '@/services/LocalDatabase'
import { truncateString } from '@/utils/common'

interface WorkoutParams extends ActivityParams {
  exerciseIds?: string[]
}

/**
 * Workout Class
 * @param obj Partial<WorkoutParams>
 */
export class Workout extends _Activity {
  public exerciseIds: string[]

  constructor({
    id,
    createdAt,
    name = 'My Workout',
    description,
    status,
    exerciseIds = [],
  }: Partial<WorkoutParams> = {}) {
    super({ id, createdAt, name, description, status })
    this.exerciseIds = exerciseIds
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

  async add(): Promise<void> {
    await database.add(DBTable.WORKOUTS, this)
  }

  async update(): Promise<void> {
    await database.updateById(DBTable.WORKOUTS, this.id, this)
  }

  async delete(): Promise<void> {
    await database.deleteById(DBTable.WORKOUTS, this.id)
  }
}
