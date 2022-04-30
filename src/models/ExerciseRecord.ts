import { _Record } from '@/models/_Record'
import type { IRecord, IUpdateRecord } from '@/models/_Record'
import { Store } from '@/constants'

export type ExerciseSet = {
  weight?: number
  reps?: number
  distance?: number
  duration?: number
}

// Exports for LocalDatabase
export const exerciseRecordStoreIndices = Object.freeze({
  [Store.EXERCISE_RECORDS]: '&id, parentId',
  [Store.ACTIVE_EXERCISES]: '&id, parentId',
})

export interface IExerciseRecord extends IRecord, IExerciseRecordFields {}

export interface IUpdateExerciseRecord extends IUpdateRecord, IExerciseRecordFields {}

interface IExerciseRecordFields {
  skipped?: boolean
  sets?: ExerciseSet[]
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
