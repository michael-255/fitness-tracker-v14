import type { TrackBoolean, ExerciseSet } from '@/constants/types'
import type { IExerciseRecord } from '@/constants/interfaces'
import { Store } from '@/constants/enums'
import { _Record } from '@/models/_Record'

// Exports for LocalDatabase
export const exerciseRecordStoreIndices = Object.freeze({
  [Store.EXERCISE_RECORDS]: '&id, parentId',
  [Store.ACTIVE_EXERCISES]: '&id, parentId',
})

/**
 * ExerciseRecord Class
 * @arg obj.id (Inherited)
 * @arg obj.createdAt (Inherited)
 * @arg obj.parentId (Inherited)
 * @arg obj.note (Inherited)
 * @arg obj.skipped
 * @arg obj.sets
 */
export class ExerciseRecord extends _Record {
  skipped?: TrackBoolean
  sets?: ExerciseSet[]

  constructor({ id, createdAt, parentId, note, skipped = false, sets = [] }: IExerciseRecord = {}) {
    super({ id, createdAt, parentId, note })
    this.skipped = skipped
    this.sets = sets
  }
}
