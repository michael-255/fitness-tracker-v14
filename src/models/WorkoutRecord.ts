import { DBTable } from '@/constants/enums'
import type { Nullable } from '@/constants/globals'
import { _Record, type RecordParams } from '@/models/_Record'
import { database } from '@/services/LocalDatabase'
import { truncateString } from '@/utils/common'
import { getDurationString } from '@/utils/date-time'
import { DateTime } from 'luxon'

interface WorkoutRecordParams extends RecordParams {
  finishedAt?: Nullable<string>
  exerciseRecordIds?: string[]
}

/**
 * WorkoutRecord Class
 * @param obj Partial<WorkoutRecordParams>
 */
export class WorkoutRecord extends _Record {
  public finishedAt: Nullable<string>
  public exerciseRecordIds: string[]

  constructor({
    id,
    createdAt,
    parentId,
    note,
    status,
    finishedAt = null,
    exerciseRecordIds = [],
  }: Partial<WorkoutRecordParams> = {}) {
    super({ id, createdAt, parentId, note, status })
    this.finishedAt = finishedAt
    this.exerciseRecordIds = exerciseRecordIds
  }

  static getTableColumns(): any[] {
    return [
      ..._Record.getTableColumns(),
      {
        name: 'finishedAt',
        label: 'Finished At',
        align: 'left',
        field: (row: WorkoutRecord) => row.getDisplayFinishedAt(),
        sortable: true,
      },
      {
        name: 'exerciseRecordIds',
        label: 'Exercise Record Ids',
        align: 'left',
        field: (row: WorkoutRecord) => truncateString(row.exerciseRecordIds.toString(), 40),
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Record.getVisibleColumns(), 'finishedAt', 'exerciseRecordIds']
  }

  getDisplayFinishedAt(): string {
    if (this.finishedAt) {
      return DateTime.fromISO(this.finishedAt).toFormat('ccc LLL d yyyy ttt')
    } else {
      return '-'
    }
  }

  getDuration(): string {
    if (this.finishedAt && this.createdAt) {
      const finishedAtMS = new Date(this.finishedAt).getTime()
      const createdAtMS = new Date(this.createdAt).getTime()
      const durationMS = finishedAtMS - createdAtMS
      return getDurationString(durationMS)
    } else {
      return '-'
    }
  }

  async add(): Promise<void> {
    await database.add(DBTable.WORKOUT_RECORDS, this)
  }

  async update(): Promise<void> {
    await database.updateById(DBTable.WORKOUT_RECORDS, this.id, this)
  }

  async delete(): Promise<void> {
    await database.deleteById(DBTable.WORKOUT_RECORDS, this.id)
  }
}
