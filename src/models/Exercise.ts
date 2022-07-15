import { _Activity, type IActivity } from '@/models/_Activity'
import type { ExerciseTracks } from '@/constants/enums'
import { isRequired } from '@/utils/validators'

export interface IExercise extends IActivity {
  tracks: ExerciseTracks[]
}

/**
 * Exercise Class
 * @param params IExercise
 */
export class Exercise extends _Activity {
  protected tracks: ExerciseTracks[]

  constructor(params: IExercise) {
    super({
      id: params.id,
      createdAt: params.createdAt,
      name: params.name,
      description: params.description,
      status: params.status,
    })

    if (isRequired(params.tracks)) {
      this.tracks = params.tracks
    } else {
      throw new Error(`(constructor) Validation failed on tracks << ${params.tracks} >>`)
    }
  }

  get Tracks(): ExerciseTracks[] {
    return this.tracks
  }

  set Tracks(tracks: ExerciseTracks[]) {
    if (isRequired(tracks)) {
      this.tracks = tracks
    } else {
      throw new Error(`Validation failed on tracks << ${tracks} >>`)
    }
  }

  static getTableColumns(): any[] {
    return [
      ..._Activity.getTableColumns(),
      {
        name: 'tracks',
        label: 'Tracks',
        align: 'left',
        field: (row: Exercise) => row.Tracks,
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Activity.getVisibleColumns()]
  }
}
