import { _Activity, type IActivity } from '@/models/_Activity'
import type { ExerciseTracks } from '@/constants/enums'

export interface IExercise extends IActivity {
  tracks: ExerciseTracks[]
}

/**
 * Exercise Class
 * @param params IExercise
 */
export class Exercise extends _Activity {
  tracks: ExerciseTracks[]

  constructor(params: IExercise) {
    super({
      id: params.id,
      createdAt: params.createdAt,
      name: params.name,
      description: params.description,
      activityStatus: params.activityStatus,
    })
    this.tracks = params.tracks
  }

  // static getTableColumns(): any[] {
  //   return [
  //     ..._Activity.getTableColumns(),
  //     {
  //       name: 'tracks',
  //       label: 'Tracks',
  //       align: 'left',
  //       field: (row: Exercise) => row.tracks,
  //       format: (val: string[]) => truncateString(val.toString()),
  //       sortable: true,
  //     },
  //   ]
  // }

  // static getVisibleColumns(): string[] {
  //   return [..._Activity.getVisibleColumns()]
  // }
}
