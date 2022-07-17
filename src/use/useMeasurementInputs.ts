import { ActivityStatus, FieldName, MeasurementType } from '@/constants/enums'
import type { Measurement } from '@/models/Measurement'
import { useInputProvide } from '@/use/useInputProvide'

export function useMeasurementInputs() {
  const { idModel, idValidate } = useInputProvide(FieldName.ID)
  const { createdAtModel, createdAtValidate } = useInputProvide(FieldName.CREATED_AT)
  const { nameModel, nameValidate } = useInputProvide(FieldName.NAME)
  const { descriptionModel, descriptionValidate } = useInputProvide(FieldName.DESCRIPTION)
  const { activityStatusModel, activityStatusValidate } = useInputProvide(FieldName.ACTIVITY_STATUS)
  const { measurementTypeModel, measurementTypeValidate } = useInputProvide(
    FieldName.MEASUREMENT_TYPE
  )

  function setMeasurement(
    id: string | undefined,
    createdAt: string | undefined,
    name: string | undefined,
    description: string | undefined,
    activityStatus: ActivityStatus | undefined,
    measurementType: MeasurementType | undefined
  ): void {
    idModel.value = id
    createdAtModel.value = createdAt
    nameModel.value = name
    descriptionModel.value = description
    activityStatusModel.value = activityStatus
    measurementTypeModel.value = measurementType
  }

  function getMeasurement(): Partial<Measurement> {
    return {
      id: idModel.value,
      createdAt: createdAtModel.value,
      name: nameModel.value,
      description: descriptionModel.value,
      activityStatus: activityStatusModel.value,
      measurementType: measurementTypeModel.value,
    }
  }

  function isMeasurementValid(): boolean {
    return (
      idValidate() &&
      createdAtValidate() &&
      nameValidate() &&
      descriptionValidate() &&
      activityStatusValidate() &&
      measurementTypeValidate()
    )
  }
  return {
    setMeasurement,
    getMeasurement,
    isMeasurementValid,
  }
}
