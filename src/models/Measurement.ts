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
  protected type: MeasurementType

  constructor(params: IMeasurement) {
    super({
      id: params.id,
      createdAt: params.createdAt,
      name: params.name,
      description: params.description,
      status: params.status,
    })

    if (isRequired(params.type)) {
      this.type = params.type
    } else {
      throw new Error(`(constructor) Validation failed on type << ${params.type} >>`)
    }
  }

  get Type(): MeasurementType {
    return this.type
  }

  set Type(type: MeasurementType) {
    if (isShortTextValid(type)) {
      this.type = type
    } else {
      throw new Error(`Validation failed on type << ${type} >>`)
    }
  }

  static getTableColumns(): any[] {
    return [
      ..._Activity.getTableColumns(),
      {
        name: 'type',
        label: 'Type',
        align: 'left',
        field: (row: Measurement) => row.Type,
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Activity.getVisibleColumns()]
  }
}
