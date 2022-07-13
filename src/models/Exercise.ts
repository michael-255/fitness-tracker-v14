import { _Activity, type IActivity } from '@/models/_Activity'
// import type { ExerciseTracks } from '@/constants/enums'
import { isBoolean } from '@/utils/validators'

export interface IExercise extends IActivity {
  trackMultipleSets: boolean
  trackDuration: boolean
  trackDistance: boolean
  trackWeight: boolean
  trackReps: boolean
  // tracks: ExerciseTracks[]
}

/**
 * Exercise Class
 * @param params IExercise
 */
export class Exercise extends _Activity {
  protected trackMultipleSets: boolean
  protected trackDuration: boolean
  protected trackDistance: boolean
  protected trackWeight: boolean
  protected trackReps: boolean
  // protected tracks: ExerciseTracks[]

  constructor(params: IExercise) {
    super({
      id: params.id,
      createdAt: params.createdAt,
      name: params.name,
      description: params.description,
      status: params.status,
    })

    if (isBoolean(params.trackMultipleSets)) {
      this.trackMultipleSets = params.trackMultipleSets
    } else {
      throw new Error(
        `(constructor) Validation failed on trackMultipleSets << ${params.trackMultipleSets} >>`
      )
    }

    if (isBoolean(params.trackDuration)) {
      this.trackDuration = params.trackDuration
    } else {
      throw new Error(
        `(constructor) Validation failed on trackDuration << ${params.trackDuration} >>`
      )
    }

    if (isBoolean(params.trackDistance)) {
      this.trackDistance = params.trackDistance
    } else {
      throw new Error(
        `(constructor) Validation failed on trackDistance << ${params.trackDistance} >>`
      )
    }

    if (isBoolean(params.trackWeight)) {
      this.trackWeight = params.trackWeight
    } else {
      throw new Error(`(constructor) Validation failed on trackWeight << ${params.trackWeight} >>`)
    }

    if (isBoolean(params.trackReps)) {
      this.trackReps = params.trackReps
    } else {
      throw new Error(`(constructor) Validation failed on trackReps << ${params.trackReps} >>`)
    }
  }

  get TrackMultipleSets(): boolean {
    return this.trackMultipleSets
  }

  set TrackMultipleSets(trackMultipleSets: boolean) {
    if (isBoolean(trackMultipleSets)) {
      this.trackMultipleSets = trackMultipleSets
    } else {
      throw new Error(`Validation failed on trackMultipleSets << ${trackMultipleSets} >>`)
    }
  }

  get TrackDuration(): boolean {
    return this.trackDuration
  }

  set TrackDuration(trackDuration: boolean) {
    if (isBoolean(trackDuration)) {
      this.trackDuration = trackDuration
    } else {
      throw new Error(`Validation failed on trackDuration << ${trackDuration} >>`)
    }
  }

  get TrackDistance(): boolean {
    return this.trackDistance
  }

  set TrackDistance(trackDistance: boolean) {
    if (isBoolean(trackDistance)) {
      this.trackDistance = trackDistance
    } else {
      throw new Error(`Validation failed on trackDistance << ${trackDistance} >>`)
    }
  }

  get TrackWeight(): boolean {
    return this.trackWeight
  }

  set TrackWeight(trackWeight: boolean) {
    if (isBoolean(trackWeight)) {
      this.trackWeight = trackWeight
    } else {
      throw new Error(`Validation failed on trackWeight << ${trackWeight} >>`)
    }
  }

  get TrackReps(): boolean {
    return this.trackReps
  }

  set TrackReps(trackReps: boolean) {
    if (isBoolean(trackReps)) {
      this.trackReps = trackReps
    } else {
      throw new Error(`Validation failed on trackReps << ${trackReps} >>`)
    }
  }

  static getTableColumns(): any[] {
    return [
      ..._Activity.getTableColumns(),
      {
        name: 'trackMultipleSets',
        label: 'Tracks Multiple Sets',
        align: 'left',
        field: (row: Exercise) => row.trackMultipleSets,
        sortable: true,
      },
      {
        name: 'trackWeight',
        label: 'Tracks Weight',
        align: 'left',
        field: (row: Exercise) => row.trackWeight,
        sortable: true,
      },
      {
        name: 'trackReps',
        label: 'Tracks Reps',
        align: 'left',
        field: (row: Exercise) => row.trackReps,
        sortable: true,
      },
      {
        name: 'trackDuration',
        label: 'Tracks Duration',
        align: 'left',
        field: (row: Exercise) => row.trackDuration,
        sortable: true,
      },
      {
        name: 'trackDistance',
        label: 'Tracks Distance',
        align: 'left',
        field: (row: Exercise) => row.trackDistance,
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [
      ..._Activity.getVisibleColumns(),
      'trackMultipleSets',
      'trackDuration',
      'trackDistance',
      'trackWeight',
      'trackReps',
    ]
  }
}
