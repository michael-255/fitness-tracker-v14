import { _Record, type IRecord } from '@/models/_Record'
import { ExerciseSet } from '@/models/ExerciseSet'
import { truncateString } from '@/utils/common'

export interface IExerciseRecord extends IRecord {
  sets: ExerciseSet[]
}

/**
 * ExerciseRecord Class
 * @param obj IExerciseRecord
 */
export class ExerciseRecord extends _Record {
  sets: ExerciseSet[]

  constructor(params: IExerciseRecord) {
    super({
      id: params.id,
      createdAt: params.createdAt,
      parentId: params.parentId,
      note: params.note,
      status: params.status,
    })
    this.sets = params.sets
  }

  static getTableColumns(): any[] {
    return [
      ..._Record.getTableColumns(),
      {
        name: 'sets',
        label: 'Sets',
        align: 'left',
        field: (row: ExerciseRecord) => row.sets,
        format: (val: any[]) => truncateString(val.toString()),
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Record.getVisibleColumns()]
  }

  addNewSet(): number {
    return this.sets.push(new ExerciseSet({}))
  }

  removeLastSet(): ExerciseSet | undefined {
    return this.sets.pop()
  }
}
