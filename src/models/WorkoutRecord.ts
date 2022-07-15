import { _Record, type IRecord } from '@/models/_Record'
import { truncateString } from '@/utils/common'
import { getDurationString } from '@/utils/date-time'
import { DateTime } from 'luxon'
import { isOptionalDateValid, isRequired } from '@/utils/validators'

export interface IWorkoutRecord extends IRecord {
  finishedAt: string
  exerciseRecordIds: string[]
}

/**
 * WorkoutRecord Class
 * @param params IWorkoutRecord
 */
export class WorkoutRecord extends _Record {
  protected finishedAt: string
  protected exerciseRecordIds: string[]

  constructor(params: IWorkoutRecord) {
    super({
      id: params.id,
      createdAt: params.createdAt,
      parentId: params.parentId,
      note: params.note,
      status: params.status,
    })

    if (isOptionalDateValid(params.finishedAt)) {
      this.finishedAt = params.finishedAt
    } else {
      throw new Error(`(constructor) Validation failed on finishedAt << ${params.finishedAt} >>`)
    }

    if (isRequired(params.exerciseRecordIds)) {
      this.exerciseRecordIds = params.exerciseRecordIds
    } else {
      throw new Error(
        `(constructor) Validation failed on exerciseRecordIds << ${params.exerciseRecordIds} >>`
      )
    }
  }

  get FinishedAt(): string {
    return this.finishedAt
  }

  set FinishedAt(finishedAt: string) {
    if (isOptionalDateValid(finishedAt)) {
      this.finishedAt = finishedAt
    } else {
      throw new Error(`Validation failed on finishedAt << ${finishedAt} >>`)
    }
  }

  get ExerciseRecordIds(): string[] {
    return this.exerciseRecordIds
  }

  set ExerciseRecordIds(exerciseRecordIds: string[]) {
    if (isRequired(exerciseRecordIds)) {
      this.exerciseRecordIds = exerciseRecordIds
    } else {
      throw new Error(`Validation failed on exerciseRecordIds << ${exerciseRecordIds} >>`)
    }
  }

  static getTableColumns(): any[] {
    return [
      ..._Record.getTableColumns(),
      {
        name: 'finishedAt',
        label: 'Finished Date',
        align: 'left',
        field: (row: WorkoutRecord) => row.getDisplayFinishedAt(),
        sortable: true,
      },
      {
        name: 'exerciseRecordIds',
        label: 'Exercise Record Ids',
        align: 'left',
        field: (row: WorkoutRecord) => truncateString(row.exerciseRecordIds.toString(), 40),
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Record.getVisibleColumns(), 'finishedAt']
  }

  getDisplayFinishedAt(): string {
    if (this.finishedAt) {
      return DateTime.fromISO(this.finishedAt).toFormat('ccc LLL d yyyy ttt')
    } else {
      return '-'
    }
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
