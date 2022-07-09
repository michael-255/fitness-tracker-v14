import { _Record, type RecordParams } from '@/models/_Record'
import { ExerciseSet } from '@/models/ExerciseSet'

interface ExerciseRecordParams extends RecordParams {
  sets?: ExerciseSet[]
}

/**
 * ExerciseRecord Class
 * @param obj Partial<ExerciseRecordParams>
 */
export class ExerciseRecord extends _Record {
  protected sets: ExerciseSet[]

  constructor({ id, createdAt, parentId, note, sets = [] }: Partial<ExerciseRecordParams> = {}) {
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

  addNewSet(): number {
    return this.sets.push(new ExerciseSet())
  }

  removeLastSet(): ExerciseSet | undefined {
    return this.sets.pop()
  }
}
