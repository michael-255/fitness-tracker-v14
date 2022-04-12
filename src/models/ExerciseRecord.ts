import { _Record } from './_Record'

// Exports for LocalDatabase
export const ExerciseRecordStore = Object.freeze({ exerciseRecords: '&id, createdAt, parentId' })
export const ActiveExerciseStore = Object.freeze({ activeExercises: '&id' })
export interface IExerciseRecord {
  id: string
  createdAt: string
  parentId: string
  note: string
  data: object
}

type ExerciseRecordParams = {
  id?: string
  createdAt?: string
  parentId?: string
  note?: string
  data?: object
}

/**
 * ExerciseRecord Class
 * @param id
 * @param createdAt
 * @param parentId
 * @param note
 * @param data
 */
export class ExerciseRecord extends _Record {
  constructor({ id, createdAt, parentId, note, data }: ExerciseRecordParams = {}) {
    super({ id, createdAt, parentId, note, data })
  }
}
