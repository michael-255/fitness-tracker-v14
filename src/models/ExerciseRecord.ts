import type { ExerciseSet } from '@/constants/types'
import type { IExerciseRecord } from '@/constants/interfaces'
import { DBTable } from '@/constants/enums'
import { _Record } from '@/models/_Record'

// Exports for LocalDatabase
export const exerciseRecordTableIndices = Object.freeze({
  [DBTable.EXERCISE_RECORDS]: '&id, parentId',
  [DBTable.ACTIVE_EXERCISES]: '&id, parentId',
})

/**
 * ExerciseRecord Class
 * @param obj.id (Inherited)
 * @param obj.createdAt (Inherited)
 * @param obj.parentId (Inherited)
 * @param obj.note (Inherited)
 * @param obj.sets
 */
export class ExerciseRecord extends _Record {
  sets: ExerciseSet[]

  constructor({ id, createdAt, parentId, note, sets = [] }: IExerciseRecord = {}) {
    super({ id, createdAt, parentId, note })
    this.sets = sets
  }
}
