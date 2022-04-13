import { _Record } from './_Record'

// Exports for LocalDatabase
export const ExerciseRecordStore = Object.freeze({ exerciseRecords: '&id, createdAt, parentId' })
export const ActiveExerciseStore = Object.freeze({ activeExercises: '&id, createdAt, parentId' })

export interface IExerciseRecord {
  id?: string
  createdAt?: string
  parentId: string
  note?: string
  sets?: ExerciseSet[]
}

export type ExerciseSet = {
  weight?: number
  reps?: number
  distance?: number
  duration?: number
}

/**
 * ExerciseRecord Class
 * @param id
 * @param createdAt
 * @param parentId
 * @param note
 * @param sets
 */
export class ExerciseRecord extends _Record {
  sets?: ExerciseSet[]

  constructor({ id, createdAt, parentId, note, sets = [] }: IExerciseRecord) {
    super({ id, createdAt, parentId, note })
    this.sets = sets
  }
}
