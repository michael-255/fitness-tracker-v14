import type { FinishedAt, Id } from '@/constants/types'
import type { IWorkoutRecord } from '@/constants/interfaces'
import { DBTable } from '@/constants/enums'
import { _Record } from '@/models/_Record'
import { getDurationString, getMediumDateString } from '@/utils/date-time'

// Exports for LocalDatabase
export const workoutRecordTableIndices = Object.freeze({
  [DBTable.WORKOUT_RECORDS]: '&id, parentId',
  [DBTable.ACTIVE_WORKOUTS]: '&id, parentId',
})

/**
 * WorkoutRecord Class
 * @arg obj.id (Inherited)
 * @arg obj.createdAt (Inherited)
 * @arg obj.parentId (Inherited)
 * @arg obj.note (Inherited)
 * @arg obj.finishedAt
 * @arg obj.exerciseRecordIds
 */
export class WorkoutRecord extends _Record {
  finishedAt: FinishedAt
  exerciseRecordIds: Id[]

  constructor({
    id,
    createdAt,
    parentId,
    note,
    finishedAt = null,
    exerciseRecordIds = [],
  }: IWorkoutRecord = {}) {
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
