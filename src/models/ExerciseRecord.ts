import type { ExerciseSet } from '@/constants/types'
import type { ExerciseRecordObject } from '@/constants/interfaces'
import { _Record } from '@/models/_Record'

/**
 * ExerciseRecord Class
 * @param obj ExerciseRecordObject
 */
export class ExerciseRecord extends _Record {
  protected sets: ExerciseSet[]

  constructor({ id, createdAt, parentId, note, sets = [] }: ExerciseRecordObject = {}) {
    super({ id, createdAt, parentId, note })
    this.sets = sets
  }

  static getTableColumns(): any[] {
    return [
      ..._Record.getTableColumns(),
      {
        name: 'sets',
        label: 'Sets',
        align: 'left',
        field: (row: ExerciseRecord) => row.getSets(),
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Record.getVisibleColumns(), 'sets']
  }

  getSets(): ExerciseSet[] {
    return this.sets
  }
}
