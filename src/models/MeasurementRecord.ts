import { _Record, type IRecord } from '@/models/_Record'
import type { MeasurementType } from '@/constants/enums'
import { isOptionalNumber, isRequired } from '@/utils/validators'

export interface IMeasurementRecord extends IRecord {
  parentType: MeasurementType
  value: number
}

/**
 * MeasurementRecord Class
 * @param params IMeasurementRecord
 */
export class MeasurementRecord extends _Record {
  protected parentType: MeasurementType
  protected value: number

  constructor(params: IMeasurementRecord) {
    super({
      id: params.id,
      createdAt: params.createdAt,
      parentId: params.parentId,
      note: params.note,
      status: params.status,
    })

    if (isRequired(params.parentType)) {
      this.parentType = params.parentType
    } else {
      throw new Error(`(constructor) Validation failed on parentType << ${params.parentType} >>`)
    }

    if (isRequired(params.value)) {
      this.value = params.value
    } else {
      throw new Error(`(constructor) Validation failed on value << ${params.value} >>`)
    }
  }

  get ParentType(): MeasurementType {
    return this.parentType
  }

  set ParentType(parentType: MeasurementType) {
    if (isRequired(parentType)) {
      this.parentType = parentType
    } else {
      throw new Error(`Validation failed on parentType << ${parentType} >>`)
    }
  }

  get Value(): number {
    return this.value
  }

  set Value(value: number) {
    if (isOptionalNumber(value)) {
      this.value = value
    } else {
      throw new Error(`Validation failed on value << ${value} >>`)
    }
  }

  static getTableColumns(): any[] {
    return [
      ..._Record.getTableColumns(),
      {
        name: 'parentType',
        label: 'Parent Type',
        align: 'left',
        field: (row: MeasurementRecord) => row.ParentType,
        sortable: true,
      },
      {
        name: 'value',
        label: 'Value',
        align: 'left',
        field: (row: MeasurementRecord) => row.Value,
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Record.getVisibleColumns(), 'parentType', 'value']
  }
}
