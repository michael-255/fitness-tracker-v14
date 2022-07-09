import type { Nullable } from '@/constants/types'
import { _Record, type RecordParams } from '@/models/_Record'

interface MeasurementRecordParams extends RecordParams {
  lbs?: Nullable<number>
  inches?: Nullable<number>
}

/**
 * MeasurementRecord Class
 * @param obj Partial<MeasurementRecordParams>
 */
export class MeasurementRecord extends _Record {
  protected lbs: Nullable<number>
  protected inches: Nullable<number>

  constructor({
    id,
    createdAt,
    parentId,
    note,
    lbs = null,
    inches = null,
  }: Partial<MeasurementRecordParams> = {}) {
    super({ id, createdAt, parentId, note })
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
        field: (row: MeasurementRecord) => row.getLbs(),
        sortable: true,
      },
      {
        name: 'inches',
        label: 'Inches',
        align: 'left',
        field: (row: MeasurementRecord) => row.getInches(),
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Record.getVisibleColumns(), 'lbs', 'inches']
  }

  getLbs(): Nullable<number> {
    return this.lbs
  }

  getInches(): Nullable<number> {
    return this.inches
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
