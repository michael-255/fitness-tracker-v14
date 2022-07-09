import { _Activity, type ActivityParams } from '@/models/_Activity'

export interface ExerciseParams extends ActivityParams {
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
  public trackMultipleSets: boolean
  public trackDuration: boolean
  public trackDistance: boolean
  public trackWeight: boolean
  public trackReps: boolean

  constructor({
    id,
    createdAt,
    name = 'My Exercise',
    description,
    status,
    trackMultipleSets = false,
    trackDuration = false,
    trackDistance = false,
    trackWeight = false,
    trackReps = false,
  }: Partial<ExerciseParams> = {}) {
    super({ id, createdAt, name, description, status })
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
