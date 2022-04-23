import { _Record } from './_Record'

// Exports for LocalDatabase
export const MeasurementRecordStore = Object.freeze({
  measurementRecords: '&id, parentId',
})

export interface IMeasurementRecord {
  id?: string
  createdAt?: string
  parentId: string
  note?: string
  lbs?: number
  inches?: number
}

export interface IUpdateMeasurementRecord {
  note?: string
  lbs?: number
  inches?: number
}

/**
 * MeasurementRecord Class
 * @param {string} obj.id (Inherited, Optional)
 * @param {string} obj.createdAt (Inherited, Optional)
 * @param {string} obj.parentId (Inherited, Required)
 * @param {string} obj.note (Inherited, Optional)
 * @param {number} obj.lbs (Optional)
 * @param {number} obj.inches (Optional)
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
