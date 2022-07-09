import { DBTable } from '@/constants/enums'
import type { Nullable } from '@/constants/globals'
import { _Record, type RecordParams } from '@/models/_Record'
import { database } from '@/services/LocalDatabase'

interface MeasurementRecordParams extends RecordParams {
  lbs?: Nullable<number>
  inches?: Nullable<number>
}

/**
 * MeasurementRecord Class
 * @param obj Partial<MeasurementRecordParams>
 */
export class MeasurementRecord extends _Record {
  public lbs: Nullable<number>
  public inches: Nullable<number>

  constructor({
    id,
    createdAt,
    parentId,
    note,
    status,
    lbs = null,
    inches = null,
  }: Partial<MeasurementRecordParams> = {}) {
    super({ id, createdAt, parentId, note, status })
    this.lbs = lbs
    this.inches = inches
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

  async add(): Promise<void> {
    await database.add(DBTable.MEASUREMENT_RECORDS, this)
  }

  async update(): Promise<void> {
    await database.updateById(DBTable.MEASUREMENT_RECORDS, this.id, this)
  }

  async delete(): Promise<void> {
    await database.deleteById(DBTable.MEASUREMENT_RECORDS, this.id)
  }
}
