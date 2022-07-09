import { _Activity, type ActivityParams } from './_Activity'

interface MeasurementParams extends ActivityParams {
  trackLbs?: boolean
  trackInches?: boolean
  trackFeet?: boolean
  trackPercent?: boolean
}

/**
 * Measurement Class
 * @param obj Partial<MeasurementParams>
 */
export class Measurement extends _Activity {
  protected trackLbs: boolean
  protected trackInches: boolean
  protected trackFeet: boolean
  protected trackPercent: boolean

  constructor({
    id,
    createdAt,
    name = 'My Measurement',
    description,
    trackLbs = false,
    trackInches = false,
    trackFeet = false,
    trackPercent = false,
  }: Partial<MeasurementParams> = {}) {
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
        name: 'trackLbs',
        label: 'Track Lbs',
        align: 'left',
        field: (row: Measurement) => row.getTrackLbs(),
        sortable: true,
      },
      {
        name: 'trackInches',
        label: 'Track Inches',
        align: 'left',
        field: (row: Measurement) => row.getTrackInches(),
        sortable: true,
      },
      {
        name: 'trackFeet',
        label: 'Track Feet',
        align: 'left',
        field: (row: Measurement) => row.getTrackFeet(),
        sortable: true,
      },
      {
        name: 'trackPercent',
        label: 'Track Percent',
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

  getTrackLbs(): boolean {
    return this.trackLbs
  }

  getTrackInches(): boolean {
    return this.trackInches
  }

  getTrackFeet(): boolean {
    return this.trackFeet
  }

  getTrackPercent(): boolean {
    return this.trackPercent
  }
}
