import type { ExerciseSet } from '@/constants/types'
import type { ExerciseRecordObject } from '@/constants/interfaces'
import { _Record } from '@/models/_Record'

/**
 * ExerciseRecord Class
 * @param obj ExerciseRecordObject
 */
export class ExerciseRecord extends _Record {
  protected sets: ExerciseSet[]

  constructor({ id, createdAt, parentId, note, sets = [] }: ExerciseRecordObject = {}) {
    super({ id, createdAt, parentId, note })
    this.sets = sets
  }
}
