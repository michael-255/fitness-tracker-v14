import { _Activity, type IActivity } from './_Activity'
import type { MeasurementType } from '@/constants/enums'

export interface IMeasurement extends IActivity {
  measurementType: MeasurementType
}

/**
 * Measurement Class
 * @param params IMeasurement
 */
export class Measurement extends _Activity {
  measurementType: MeasurementType

  constructor(params: IMeasurement) {
    super({
      id: params.id,
      createdAt: params.createdAt,
      name: params.name,
      description: params.description,
      activityStatus: params.activityStatus,
    })
    this.measurementType = params.measurementType
  }

  static getTableColumns(): any[] {
    return [
      ..._Activity.getTableColumns(),
      {
        name: 'measurementType',
        label: 'Type',
        align: 'left',
        field: (row: Measurement) => row.measurementType,
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Activity.getVisibleColumns()]
  }
}
