import { _Record } from './_Record'
import { getDurationString, getMediumDateString } from '@/utils/date-time'

// Exports for LocalDatabase
export const WorkoutRecordStore = Object.freeze({ workoutRecords: '&id, parentId' })
export const ActiveWorkoutStore = Object.freeze({ activeWorkouts: '&id, parentId' })

export interface IWorkoutRecord {
  id?: string
  createdAt?: string
  parentId: string
  note?: string
  finishedAt?: string
  exerciseRecordIds?: string[]
}

export interface IUpdateWorkoutRecord {
  note?: string
  finishedAt?: string
  exerciseRecordIds?: string[]
}

/**
 * WorkoutRecord Class
 * @param {string} obj.id (Inherited, Optional)
 * @param {string} obj.createdAt (Inherited, Optional)
 * @param {string} obj.parentId (Inherited, Required)
 * @param {string} obj.note (Inherited, Optional)
 * @param {string} obj.finishedAt (Optional)
 * @param {string[]} obj.exerciseRecordIds (Defaulted)
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
