import { _Activity, type IActivity } from './_Activity'
import type { MeasurementType } from '@/constants/enums'
import { isRequired, isShortTextValid } from '@/utils/validators'

export interface IMeasurement extends IActivity {
  type: MeasurementType
}

/**
 * Measurement Class
 * @param params IMeasurement
 */
export class Measurement extends _Activity {
  type: MeasurementType

  constructor(params: IMeasurement) {
    super({
      id: params.id,
      createdAt: params.createdAt,
      name: params.name,
      description: params.description,
      status: params.status,
    })
    this.type = params.type
  }

  static getTableColumns(): any[] {
    return [
      ..._Activity.getTableColumns(),
      {
        name: 'type',
        label: 'Type',
        align: 'left',
        field: (row: Measurement) => row.type,
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Activity.getVisibleColumns()]
  }
}
