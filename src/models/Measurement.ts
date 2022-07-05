import type { TrackBoolean } from '@/constants/types'
import type { MeasurementObject } from '@/constants/interfaces'
import { _Activity } from './_Activity'

/**
 * Measurement Class
 * @param obj MeasurementObject
 */
export class Measurement extends _Activity {
  protected trackLbs: TrackBoolean
  protected trackInches: TrackBoolean
  protected trackFeet: TrackBoolean
  protected trackPercent: TrackBoolean

  constructor({
    id,
    createdAt,
    name = 'My Measurement',
    description,
    trackLbs = false,
    trackInches = false,
    trackFeet = false,
    trackPercent = false,
  }: MeasurementObject = {}) {
    super({ id, createdAt, name, description })
    this.trackLbs = trackLbs
    this.trackInches = trackInches
    this.trackFeet = trackFeet
    this.trackPercent = trackPercent
  }

  static getTableColumns(): any[] {
    return [
      ..._Activity.getTableColumns(),
      {
        name: 'trackMultipleSets',
        label: 'Tracks Multiple Sets',
        align: 'left',
        field: (row: Measurement) => row.getTrackLbs(),
        sortable: true,
      },
      {
        name: 'trackDuration',
        label: 'Tracks Duration',
        align: 'left',
        field: (row: Measurement) => row.getTrackInches(),
        sortable: true,
      },
      {
        name: 'trackDistance',
        label: 'Tracks Distance',
        align: 'left',
        field: (row: Measurement) => row.getTrackFeet(),
        sortable: true,
      },
      {
        name: 'trackWeight',
        label: 'Tracks Weight',
        align: 'left',
        field: (row: Measurement) => row.getTrackPercent(),
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [
      ..._Activity.getVisibleColumns(),
      'trackLbs',
      'trackInches',
      'trackFeet',
      'trackPercent',
    ]
  }

  getTrackLbs(): TrackBoolean {
    return this.trackLbs
  }

  getTrackInches(): TrackBoolean {
    return this.trackInches
  }

  getTrackFeet(): TrackBoolean {
    return this.trackFeet
  }

  getTrackPercent(): TrackBoolean {
    return this.trackPercent
  }
}
