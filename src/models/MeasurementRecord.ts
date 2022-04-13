import { _Record } from './_Record'

// Exports for LocalDatabase
export const MeasurementRecordStore = Object.freeze({
  measurementRecords: '&id, createdAt, parentId',
})

export interface IMeasurementRecord {
  id?: string
  createdAt?: string
  parentId: string
  note?: string
  lbs?: number
  inches?: number
}

/**
 * MeasurementRecord Class
 * @param id
 * @param createdAt
 * @param note
 * @param lbs
 * @param inches
 */
export class MeasurementRecord extends _Record {
  lbs?: number
  inches?: number

  constructor({ id, createdAt, parentId, note, lbs, inches }: IMeasurementRecord) {
    super({ id, createdAt, parentId, note })
    this.lbs = lbs
    this.inches = inches
  }
}
