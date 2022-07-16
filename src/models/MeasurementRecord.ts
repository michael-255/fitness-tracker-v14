import { _Record, type IRecord } from '@/models/_Record'
import type { MeasurementType } from '@/constants/enums'

export interface IMeasurementRecord extends IRecord {
  parentType: MeasurementType
  value: number
}

/**
 * MeasurementRecord Class
 * @param params IMeasurementRecord
 */
export class MeasurementRecord extends _Record {
  parentType: MeasurementType
  value: number

  constructor(params: IMeasurementRecord) {
    super({
      id: params.id,
      createdAt: params.createdAt,
      parentId: params.parentId,
      note: params.note,
      status: params.status,
    })
    this.parentType = params.parentType
    this.value = params.value
  }

  static getTableColumns(): any[] {
    return [
      ..._Record.getTableColumns(),
      {
        name: 'parentType',
        label: 'Parent Type',
        align: 'left',
        field: (row: MeasurementRecord) => row.parentType,
        sortable: true,
      },
      {
        name: 'value',
        label: 'Value',
        align: 'left',
        field: (row: MeasurementRecord) => row.value,
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Record.getVisibleColumns(), 'parentType', 'value']
  }
}
