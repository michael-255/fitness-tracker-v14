import { DBTable, FieldName, MeasurementType, RecordStatus } from '@/constants/enums'
import type { MeasurementRecord } from '@/models/MeasurementRecord'
import { useInputProvide } from '@/use/useInputProvide'

export function useMeasurementRecordInputs() {
  const { idModel, idValidate } = useInputProvide(FieldName.ID)
  const { createdAtModel, createdAtValidate } = useInputProvide(FieldName.CREATED_AT)
  const { parentIdModel, parentIdValidate } = useInputProvide(
    FieldName.PARENT_ID,
    DBTable.MEASUREMENTS
  )
  const { noteModel, noteValidate } = useInputProvide(FieldName.NOTE)
  const { recordStatusModel, recordStatusValidate } = useInputProvide(FieldName.RECORD_STATUS)
  const { parentTypeModel, parentTypeValidate } = useInputProvide(FieldName.PARENT_TYPE)
  const { valueModel, valueValidate } = useInputProvide(FieldName.VALUE)

  function setMeasurementRecord(
    id: string | undefined,
    createdAt: string | undefined,
    parentId: string | undefined,
    note: string | undefined,
    recordStatus: RecordStatus | undefined,
    parentType: MeasurementType | undefined,
    value: number | undefined
  ): void {
    idModel.value = id
    createdAtModel.value = createdAt
    parentIdModel.value = parentId
    noteModel.value = note
    recordStatusModel.value = recordStatus
    parentTypeModel.value = parentType
    valueModel.value = value
  }

  function getMeasurementRecord(): Partial<MeasurementRecord> {
    return {
      id: idModel.value,
      createdAt: createdAtModel.value,
      parentId: parentIdModel.value,
      note: noteModel.value,
      recordStatus: recordStatusModel.value,
      parentType: parentTypeModel.value,
      value: valueModel.value,
    }
  }

  function isMeasurementRecordValid(): boolean {
    return (
      idValidate() &&
      createdAtValidate() &&
      parentIdValidate() &&
      noteValidate() &&
      recordStatusValidate() &&
      parentTypeValidate() &&
      valueValidate()
    )
  }
  return {
    setMeasurementRecord,
    getMeasurementRecord,
    isMeasurementRecordValid,
  }
}
