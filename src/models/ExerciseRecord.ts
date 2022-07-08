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

  static getTableColumns(): any[] {
    return [
      ..._Record.getTableColumns(),
      {
        name: 'sets',
        label: 'Sets',
        align: 'left',
        field: (row: ExerciseRecord) => row.getSets(),
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Record.getVisibleColumns(), 'sets']
  }

  getSets(): ExerciseSet[] {
    return this.sets
  }

  addNewSet(): number {
    return this.sets.push({
      weight: null,
      reps: null,
      distance: null,
      duration: null,
    } as ExerciseSet)
  }

  removeLastSet(): ExerciseSet | undefined {
    return this.sets.pop()
  }

  updateSetByIndex(index: number, properties: ExerciseSet): void {
    if (!properties.weight) {
      properties.weight = null
    }
    if (!properties.reps) {
      properties.reps = null
    }
    if (!properties.distance) {
      properties.distance = null
    }
    if (!properties.duration) {
      properties.duration = null
    }

    this.sets[index] = properties

    console.log(this.sets)
  }
}
