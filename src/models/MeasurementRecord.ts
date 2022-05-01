import { _Record } from '@/models/_Record'
import type { IRecord, IUpdateRecord } from '@/models/_Record'
import { Store } from '@/constants'

// Exports for LocalDatabase
export const measurementRecordStoreIndices = Object.freeze({ [Store.MEASUREMENT_RECORDS]: '&id, parentId' })

export interface IMeasurementRecord extends IRecord, IMeasurementRecordFields {}

export interface IUpdateMeasurementRecord extends IUpdateRecord, IMeasurementRecordFields {}

interface IMeasurementRecordFields {
  lbs?: number
  inches?: number
}

/**
 * MeasurementRecord Class
 * @arg obj.id (Inherited, Optional)
 * @arg obj.createdAt (Inherited, Optional)
 * @arg obj.parentId (Inherited, Required)
 * @arg obj.note (Inherited, Optional)
 * @arg obj.lbs (Optional)
 * @arg obj.inches (Optional)
 */
export class MeasurementRecord extends _Record {
  lbs?: number
  inches?: number

  constructor({ id, createdAt, parentId, note, lbs, inches }: IMeasurementRecord) {
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
