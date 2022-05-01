import { _Record } from '@/models/_Record'
import type { IRecord, IUpdateRecord } from '@/models/_Record'
import { getDurationString, getMediumDateString } from '@/utils/date-time'
import { Store } from '@/constants'

// Exports for LocalDatabase
export const workoutRecordStoreIndices = Object.freeze({
  [Store.WORKOUT_RECORDS]: '&id, parentId',
  [Store.ACTIVE_WORKOUTS]: '&id, parentId',
})

export interface IWorkoutRecord extends IRecord, IWorkoutRecordFields {}

export interface IUpdateWorkoutRecord extends IUpdateRecord, IWorkoutRecordFields {}

interface IWorkoutRecordFields {
  finishedAt?: string
  exerciseRecordIds?: string[]
}

/**
 * WorkoutRecord Class
 * @arg obj.id (Inherited, Optional)
 * @arg obj.createdAt (Inherited, Optional)
 * @arg obj.parentId (Inherited, Required)
 * @arg obj.note (Inherited, Optional)
 * @arg obj.finishedAt (Optional)
 * @arg obj.exerciseRecordIds (Defaulted)
 */
export class WorkoutRecord extends _Record {
  finishedAt?: string
  exerciseRecordIds?: string[]

  constructor({ id, createdAt, parentId, note, finishedAt, exerciseRecordIds = [] }: IWorkoutRecord) {
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
