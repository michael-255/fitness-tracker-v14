import type { FinishedAt, Id } from '@/constants/types'
import type { WorkoutRecordObject } from '@/constants/interfaces'
import { _Record } from '@/models/_Record'
import { getDurationString, getMediumDateString } from '@/utils/date-time'
import { DateTime } from 'luxon'

/**
 * WorkoutRecord Class
 * @param obj WorkoutRecordObject
 */
export class WorkoutRecord extends _Record {
  protected finishedAt: FinishedAt
  protected exerciseRecordIds: Id[]

  constructor({
    id,
    createdAt,
    parentId,
    note,
    finishedAt = null,
    exerciseRecordIds = [],
  }: WorkoutRecordObject = {}) {
    super({ id, createdAt, parentId, note })
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
        field: (row: WorkoutRecord) => row.getExerciseRecordIds(),
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Record.getVisibleColumns(), 'finishedAt', 'exerciseRecordIds']
  }

  getFinishedAt(): FinishedAt {
    return this.finishedAt
  }

  getDisplayFinishedAt(): string {
    if (this.finishedAt) {
      return DateTime.fromISO(this.finishedAt).toFormat('ccc LLL d yyyy ttt')
    } else {
      return '-'
    }
  }

  getExerciseRecordIds(): Id[] {
    return this.exerciseRecordIds
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

  getStartDate(): string | undefined {
    if (this.createdAt) {
      const date = new Date(this.createdAt)
      return getMediumDateString(date)
    } else {
      return '-'
    }
  }
}
