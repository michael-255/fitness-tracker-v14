import type { RecordNumber } from '@/constants/types'
import type { MeasurementRecordObject } from '@/constants/interfaces'
import { _Record } from '@/models/_Record'

/**
 * MeasurementRecord Class
 * @param obj MeasurementRecordObject
 */
export class MeasurementRecord extends _Record {
  protected lbs: RecordNumber
  protected inches: RecordNumber

  constructor({
    id,
    createdAt,
    parentId,
    note,
    lbs = null,
    inches = null,
  }: MeasurementRecordObject = {}) {
    super({ id, createdAt, parentId, note })
    this.lbs = lbs
    this.inches = inches
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
