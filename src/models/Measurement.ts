import { DBTable } from '@/constants/enums'
import { database } from '@/services/LocalDatabase'
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
  public trackLbs: boolean
  public trackInches: boolean
  public trackFeet: boolean
  public trackPercent: boolean

  constructor({
    id,
    createdAt,
    name = 'My Measurement',
    description,
    status,
    trackLbs = false,
    trackInches = false,
    trackFeet = false,
    trackPercent = false,
  }: Partial<MeasurementParams> = {}) {
    super({ id, createdAt, name, description, status })
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
        field: (row: Measurement) => row.trackLbs,
        sortable: true,
      },
      {
        name: 'trackInches',
        label: 'Track Inches',
        align: 'left',
        field: (row: Measurement) => row.trackInches,
        sortable: true,
      },
      {
        name: 'trackFeet',
        label: 'Track Feet',
        align: 'left',
        field: (row: Measurement) => row.trackFeet,
        sortable: true,
      },
      {
        name: 'trackPercent',
        label: 'Track Percent',
        align: 'left',
        field: (row: Measurement) => row.trackPercent,
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

  async update(): Promise<void> {
    await database.updateById(DBTable.MEASUREMENTS, this.id, this)
  }

  async delete(): Promise<void> {
    await database.deleteById(DBTable.MEASUREMENTS, this.id)
  }
}
