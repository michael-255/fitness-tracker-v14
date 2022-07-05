import type { TrackBoolean } from '@/constants/types'
import type { ExerciseObject } from '@/constants/interfaces'
import { _Activity } from '@/models/_Activity'

/**
 * Exercise Class
 * @param obj ExerciseObject
 */
export class Exercise extends _Activity {
  protected trackMultipleSets: TrackBoolean
  protected trackDuration: TrackBoolean
  protected trackDistance: TrackBoolean
  protected trackWeight: TrackBoolean
  protected trackReps: TrackBoolean

  constructor({
    id,
    createdAt,
    name = 'My Exercise',
    description,
    trackMultipleSets = false,
    trackDuration = false,
    trackDistance = false,
    trackWeight = false,
    trackReps = false,
  }: ExerciseObject = {}) {
    super({ id, createdAt, name, description })
    this.trackMultipleSets = trackMultipleSets
    this.trackDuration = trackDuration
    this.trackDistance = trackDistance
    this.trackWeight = trackWeight
    this.trackReps = trackReps
  }

  static getTableColumns(): any[] {
    return [
      ..._Activity.getTableColumns(),
      {
        name: 'trackMultipleSets',
        label: 'Tracks Multiple Sets',
        align: 'left',
        field: (row: Exercise) => row.getTrackMultipleSets(),
        sortable: true,
      },
      {
        name: 'trackDuration',
        label: 'Tracks Duration',
        align: 'left',
        field: (row: Exercise) => row.getTrackDuration(),
        sortable: true,
      },
      {
        name: 'trackDistance',
        label: 'Tracks Distance',
        align: 'left',
        field: (row: Exercise) => row.getTrackDistance(),
        sortable: true,
      },
      {
        name: 'trackWeight',
        label: 'Tracks Weight',
        align: 'left',
        field: (row: Exercise) => row.getTrackWeight(),
        sortable: true,
      },
      {
        name: 'trackReps',
        label: 'Tracks Reps',
        align: 'left',
        field: (row: Exercise) => row.getTrackReps(),
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

  getTrackMultipleSets(): TrackBoolean {
    return this.trackMultipleSets
  }

  getTrackDuration(): TrackBoolean {
    return this.trackDuration
  }

  getTrackDistance(): TrackBoolean {
    return this.trackDistance
  }

  getTrackWeight(): TrackBoolean {
    return this.trackWeight
  }

  getTrackReps(): TrackBoolean {
    return this.trackReps
  }
}
