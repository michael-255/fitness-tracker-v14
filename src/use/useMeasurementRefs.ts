import { type Ref, ref } from 'vue'
import { useValidators } from '@/use/useValidators'
import { useActivityRefs } from '@/use/useActivityRefs'
import { database } from '@/services/LocalDatabase'
import { DBTable } from '@/constants/enums'
import type { Measurement } from '@/models/Measurement'

export function useMeasurementRefs(editId?: string) {
  const { id, createdAt, name, description, status, resetActivityRefs, areActivityRefsValid } =
    useActivityRefs()
  const { isBoolean } = useValidators()

  const trackLbs: Ref<boolean> = ref(false)
  const trackInches: Ref<boolean> = ref(false)
  const trackFeet: Ref<boolean> = ref(false)
  const trackPercent: Ref<boolean> = ref(false)

  if (editId) {
    loadRefDataById(editId)
  }

  function resetMeasurementRefs(): void {
    resetActivityRefs()
    trackLbs.value = false
    trackInches.value = false
    trackFeet.value = false
    trackPercent.value = false
  }

  function areMeasurementRefsValid(): boolean {
    return (
      areActivityRefsValid() &&
      isBoolean(trackLbs.value) &&
      isBoolean(trackInches.value) &&
      isBoolean(trackFeet.value) &&
      isBoolean(trackPercent.value)
    )
  }

  async function loadRefDataById(editId: string): Promise<void> {
    console.log('editId:', editId) // TEMP

    const measurement = await database.getById<Measurement>(DBTable.MEASUREMENTS, editId)

    if (measurement) {
      id.value = measurement.id
      createdAt.value = measurement.createdAt
      name.value = measurement.name
      description.value = measurement.description
      status.value = measurement.status
      trackLbs.value = measurement.trackLbs
      trackInches.value = measurement.trackInches
      trackFeet.value = measurement.trackFeet
      trackPercent.value = measurement.trackPercent
    } else {
      throw new Error('Function loadRefDataById failed because the editId is invalid.')
    }
  }

  return {
    id,
    createdAt,
    name,
    description,
    status,
    trackLbs,
    trackInches,
    trackFeet,
    trackPercent,
    resetMeasurementRefs,
    areMeasurementRefsValid,
    loadRefDataById,
  }
}
