import { _Record, type RecordParams } from '@/models/_Record'
import { ExerciseSet } from '@/models/ExerciseSet'
import { database } from '@/services/LocalDatabase'
import { DBTable } from '@/constants/enums'
import { truncateString } from '@/utils/common'

interface ExerciseRecordParams extends RecordParams {
  sets?: ExerciseSet[]
}

/**
 * ExerciseRecord Class
 * @param obj Partial<ExerciseRecordParams>
 */
export class ExerciseRecord extends _Record {
  public sets: ExerciseSet[]

  constructor({
    id,
    createdAt,
    parentId,
    note,
    status,
    sets = [],
  }: Partial<ExerciseRecordParams> = {}) {
    super({ id, createdAt, parentId, note, status })
    this.sets = sets
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
    return this.sets.push(new ExerciseSet())
  }

  removeLastSet(): ExerciseSet | undefined {
    return this.sets.pop()
  }

  async update(): Promise<void> {
    await database.updateById(DBTable.EXERCISE_RECORDS, this.id, this)
  }

  async delete(): Promise<void> {
    await database.deleteById(DBTable.EXERCISE_RECORDS, this.id)
  }
}
