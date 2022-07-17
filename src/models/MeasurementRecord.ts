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
      recordStatus: params.recordStatus,
    })
    this.parentType = params.parentType
    this.value = params.value
  }
}
