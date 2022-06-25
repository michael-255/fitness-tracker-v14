import type { RecordNumber } from '@/constants/types'
import type { IMeasurementRecord } from '@/constants/interfaces'
import { DBTable } from '@/constants/enums'
import { _Record } from '@/models/_Record'

// Exports for LocalDatabase
export const measurementRecordTableIndices = Object.freeze({
  [DBTable.MEASUREMENT_RECORDS]: '&id, parentId',
})

/**
 * MeasurementRecord Class
 * @arg obj.id (Inherited)
 * @arg obj.createdAt (Inherited)
 * @arg obj.parentId (Inherited)
 * @arg obj.note (Inherited)
 * @arg obj.lbs
 * @arg obj.inches
 */
export class MeasurementRecord extends _Record {
  lbs?: RecordNumber
  inches?: RecordNumber

  constructor({
    id,
    createdAt,
    parentId,
    note,
    lbs = null,
    inches = null,
  }: IMeasurementRecord = {}) {
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
