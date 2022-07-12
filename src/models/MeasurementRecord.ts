import { _Record, type IRecord } from '@/models/_Record'
import { isOptionalNumber } from '@/utils/validators'

export interface IMeasurementRecord extends IRecord {
  lbs?: number
  inches?: number
  num?: number
}

/**
 * MeasurementRecord Class
 * @param params IMeasurementRecord
 */
export class MeasurementRecord extends _Record {
  protected lbs?: number
  protected inches?: number
  protected num?: number

  constructor(params: IMeasurementRecord) {
    super({
      id: params.id,
      createdAt: params.createdAt,
      parentId: params.parentId,
      note: params.note,
      status: params.status,
    })

    if (isOptionalNumber(params.lbs)) {
      this.lbs = params.lbs
    } else {
      throw new Error(`(constructor) Validation failed on lbs << ${params.lbs} >>`)
    }

    if (isOptionalNumber(params.inches)) {
      this.inches = params.inches
    } else {
      throw new Error(`(constructor) Validation failed on inches << ${params.inches} >>`)
    }

    if (isOptionalNumber(params.num)) {
      this.num = params.num
    } else {
      throw new Error(`(constructor) Validation failed on num << ${params.num} >>`)
    }
  }

  get Lbs(): number | undefined {
    return this.lbs
  }

  set Lbs(lbs: number | undefined) {
    if (isOptionalNumber(lbs)) {
      this.lbs = lbs
    } else {
      throw new Error(`Validation failed on lbs << ${lbs} >>`)
    }
  }

  get Inches(): number | undefined {
    return this.inches
  }

  set Inches(inches: number | undefined) {
    if (isOptionalNumber(inches)) {
      this.inches = inches
    } else {
      throw new Error(`Validation failed on inches << ${inches} >>`)
    }
  }

  get Num(): number | undefined {
    return this.num
  }

  set Num(num: number | undefined) {
    if (isOptionalNumber(num)) {
      this.num = num
    } else {
      throw new Error(`Validation failed on num << ${num} >>`)
    }
  }

  static getTableColumns(): any[] {
    return [
      ..._Record.getTableColumns(),
      {
        name: 'lbs',
        label: 'Lbs',
        align: 'left',
        field: (row: MeasurementRecord) => row.lbs,
        sortable: true,
      },
      {
        name: 'inches',
        label: 'Inches',
        align: 'left',
        field: (row: MeasurementRecord) => row.inches,
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Record.getVisibleColumns(), 'lbs', 'inches']
  }

  getFeetAndInches(): string {
    if (this.inches) {
      const feet = Math.floor(this.inches / 12)
      const inches = this.inches - feet * 12
      return `${feet}'${inches}"`
    } else {
      return '-'
    }
  }
}
