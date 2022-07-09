import { _Activity, type ActivityParams } from '@/models/_Activity'

interface ExerciseParams extends ActivityParams {
  trackMultipleSets?: boolean
  trackDuration?: boolean
  trackDistance?: boolean
  trackWeight?: boolean
  trackReps?: boolean
}

/**
 * Exercise Class
 * @param obj Partial<ExerciseParams>
 */
export class Exercise extends _Activity {
  protected trackMultipleSets: boolean
  protected trackDuration: boolean
  protected trackDistance: boolean
  protected trackWeight: boolean
  protected trackReps: boolean

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
  }: Partial<ExerciseParams> = {}) {
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

  getTrackMultipleSets(): boolean {
    return this.trackMultipleSets
  }

  getTrackDuration(): boolean {
    return this.trackDuration
  }

  getTrackDistance(): boolean {
    return this.trackDistance
  }

  getTrackWeight(): boolean {
    return this.trackWeight
  }

  getTrackReps(): boolean {
    return this.trackReps
  }
}
