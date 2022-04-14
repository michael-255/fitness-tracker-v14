import { _Record } from './_Record'
import { getDurationString } from '@/utils/date-time'

// Exports for LocalDatabase
export const WorkoutRecordStore = Object.freeze({ workoutRecords: '&id, createdAt, parentId' })
export const ActiveWorkoutStore = Object.freeze({ activeWorkouts: '&id, createdAt, parentId' })

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
 * @param id (Inherited, Optional)
 * @param createdAt (Inherited, Optional)
 * @param parentId (Inherited, Required)
 * @param note (Inherited, Optional)
 * @param finishedAt (Optional)
 * @param exerciseRecordIds (Defaulted)
 */
export class WorkoutRecord extends _Record {
  finishedAt?: string
  exerciseRecordIds?: string[]

  constructor({
    id,
    createdAt,
    parentId,
    note,
    finishedAt,
    exerciseRecordIds = [],
  }: IWorkoutRecord) {
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
}
