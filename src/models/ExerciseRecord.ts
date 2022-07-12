import { _Record, type IRecord } from '@/models/_Record'
import { ExerciseSet } from '@/models/ExerciseSet'
import { truncateString } from '@/utils/common'
import { isRequired } from '@/utils/validators'

export interface IExerciseRecord extends IRecord {
  sets: ExerciseSet[]
}

/**
 * ExerciseRecord Class
 * @param obj IExerciseRecord
 */
export class ExerciseRecord extends _Record {
  protected sets: ExerciseSet[]

  constructor(params: IExerciseRecord) {
    super({
      id: params.id,
      createdAt: params.createdAt,
      parentId: params.parentId,
      note: params.note,
      status: params.status,
    })

    if (isRequired(params.sets)) {
      this.sets = params.sets
    } else {
      throw new Error(`(constructor) Validation failed on sets << ${params.sets} >>`)
    }
  }

  get Sets(): ExerciseSet[] {
    return this.sets
  }

  set Sets(sets: ExerciseSet[]) {
    if (isRequired(sets)) {
      this.sets = sets
    } else {
      throw new Error(`Validation failed on sets << ${sets} >>`)
    }
  }

  static getTableColumns(): any[] {
    return [
      ..._Record.getTableColumns(),
      {
        name: 'sets',
        label: 'Sets',
        align: 'left',
        field: (row: ExerciseRecord) => truncateString(row.sets.toString(), 40),
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Record.getVisibleColumns(), 'sets']
  }

  addNewSet(): number {
    return this.sets.push(new ExerciseSet({}))
  }

  removeLastSet(): ExerciseSet | undefined {
    return this.sets.pop()
  }
}
