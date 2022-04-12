import { _Record } from './_Record'

// Exports for LocalDatabase
export const WorkoutRecordStore = Object.freeze({ workoutRecords: '&id, createdAt, parentId' })
export const ActiveWorkoutStore = Object.freeze({ activeWorkouts: '&id' })
export interface IWorkoutRecord {
  id: string
  createdAt: string
  parentId: string
  note: string
  data: object
  getParentEntity(): object
  getDuration(): string
}

type WorkoutRecordParams = {
  id?: string
  createdAt?: string
  parentId?: string
  note?: string
  data?: object
}

/**
 * WorkoutRecord Class
 * @param id
 * @param createdAt
 * @param parentId
 * @param note
 * @param data
 */
export class WorkoutRecord extends _Record {
  constructor({ id, createdAt, parentId, note, data }: WorkoutRecordParams = {}) {
    super({ id, createdAt, parentId, note, data })
  }

  getDuration(): Error {
    return new Error('Not Implemented')
  }
}
