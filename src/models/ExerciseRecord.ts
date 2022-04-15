import { _Record } from './_Record'

// Exports for LocalDatabase
export const ExerciseRecordStore = Object.freeze({ exerciseRecords: '&id, parentId' })
export const ActiveExerciseStore = Object.freeze({ activeExercises: '&id, parentId' })

export interface IExerciseRecord {
  id?: string
  createdAt?: string
  parentId: string
  note?: string
  skipped?: boolean
  sets?: ExerciseSet[]
}

export interface IUpdateExerciseRecord {
  note?: string
  skipped?: boolean
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
 * @param {string} obj.id (Inherited, Optional)
 * @param {string} obj.createdAt (Inherited, Optional)
 * @param {string} obj.parentId (Inherited, Required)
 * @param {string} obj.note (Inherited, Optional)
 * @param {boolean} obj.skipped (Optional)
 * @param {ExerciseSet[]} obj.sets (Defaulted)
 */
export class ExerciseRecord extends _Record {
  skipped?: boolean
  sets?: ExerciseSet[]

  constructor({ id, createdAt, parentId, note, skipped, sets = [] }: IExerciseRecord) {
    super({ id, createdAt, parentId, note })
    this.skipped = skipped
    this.sets = sets
  }
}
