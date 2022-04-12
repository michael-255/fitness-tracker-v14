import { _Record } from './_Record'

// Exports for LocalDatabase
export const MeasurementRecordStore = Object.freeze({
  measurementRecords: '&id, createdAt, parentId',
})
export interface IMeasurementRecord {
  id: string
  createdAt: string
  parentId: string
  note: string
  data: object
}

type MeasurementRecordParams = {
  id?: string
  createdAt?: string
  parentId?: string
  note?: string
  data?: object
}

/**
 * MeasurementRecord Class
 * @param id
 * @param createdAt
 * @param note
 * @param data lbs and inches
 */
export class MeasurementRecord extends _Record {
  constructor({ id, createdAt, parentId, note, data }: MeasurementRecordParams = {}) {
    super({ id, createdAt, parentId, note, data })
  }
}
