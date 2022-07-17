import { _Record, type IRecord } from '@/models/_Record'
import { truncateString } from '@/utils/common'
import { getDurationString } from '@/utils/date-time'
import { DateTime } from 'luxon'

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
      recordStatus: params.recordStatus,
    })
    this.finishedAt = params.finishedAt
    this.exerciseRecordIds = params.exerciseRecordIds
  }

  // static getTableColumns(): any[] {
  //   return [
  //     ..._Record.getTableColumns(),
  //     {
  //       name: 'finishedAt',
  //       label: 'Finished Date',
  //       align: 'left',
  //       field: (row: WorkoutRecord) => row.getDisplayFinishedAt(),
  //       format: (val: string) => (DateTime.fromISO(val).toFormat('ccc LLL d yyyy ttt') ? val : '-'),
  //       sortable: true,
  //     },
  //     {
  //       name: 'exerciseRecordIds',
  //       label: 'Exercise Record Ids',
  //       align: 'left',
  //       field: (row: WorkoutRecord) => row.exerciseRecordIds,
  //       format: (val: string[]) => truncateString(val.toString()),
  //       sortable: true,
  //     },
  //   ]
  // }

  // static getVisibleColumns(): string[] {
  //   return [..._Record.getVisibleColumns(), 'finishedAt']
  // }

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
