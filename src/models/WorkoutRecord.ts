import type { FinishedAt, Id } from '@/constants/types'
import type { WorkoutRecordObject } from '@/constants/interfaces'
import { _Record } from '@/models/_Record'
import { getDurationString, getMediumDateString } from '@/utils/date-time'

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
