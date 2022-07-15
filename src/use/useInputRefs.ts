import { DBTable, ActivityStatus } from '@/constants/enums'
import type { Nullable } from '@/constants/globals'
import { type Ref, ref } from 'vue'
import { v4 as createId } from 'uuid'
import { useTableType } from '@/use/useTableType'
import { useValidators } from '@/use/useValidators'
import { database } from '@/services/LocalDatabase'

export function useInputRefs(table: DBTable, loadId?: string) {
  const { isActivityTable, isRecordTable } = useTableType()
  const { isIdValid, isCreatedAtValid, isShortTextValid, isTextAreaValid, isStatusValid } =
    useValidators()

  // Entity Refs
  const id: Ref<string> = ref(createId())
  const createdAt: Ref<string> = ref(new Date().toISOString())
  // Activity Refs
  const name: Ref<string> = ref('My Activity')
  const description: Ref<Nullable<string>> = ref(null)
  const activityStatus: Ref<ActivityStatus> = ref(ActivityStatus.ENABLED)
  // Measurement Refs
  const trackLbs: Ref<boolean> = ref(false)
  const trackInches: Ref<boolean> = ref(false)
  const trackFeet: Ref<boolean> = ref(false)
  const trackPercent: Ref<boolean> = ref(false)

  async function loadIdItem(): Promise<void> {
    const loadedItem: any = await database.getById(table, loadId as string)

    console.log(table, loadId, loadedItem)

    // Entity Refs
    id.value = loadedItem.id || createId()
    createdAt.value = loadedItem.createdAt || new Date().toISOString()
    // Activity Refs
    name.value = loadedItem.name || 'My Activity'
    description.value = loadedItem.description || null
    activityStatus.value = loadedItem.activityStatus || ActivityStatus.ENABLED
    // Measurement Refs
    trackLbs.value = loadedItem.trackLbs || false
    trackInches.value = loadedItem.trackInches || false
    trackFeet.value = loadedItem.trackFeet || false
    trackPercent.value = loadedItem.trackPercent || false
  }

  /**
   * Sets all refs to starting default values.
   */
  function resetInputRefs(): void {
    // Entity Refs
    id.value = createId()
    createdAt.value = new Date().toISOString()
    // Activity Refs
    name.value = 'My Activity'
    description.value = null
    activityStatus.value = ActivityStatus.ENABLED
    // Measurement Refs
    trackLbs.value = false
    trackInches.value = false
    trackFeet.value = false
    trackPercent.value = false
  }

  /**
   * Validate all the ref values.
   */
  function areInputRefsValid(): boolean {
    let areEntityRefsValid = true
    let areActivityRefsValid = true
    let areRecordRefsValid = true

    // Entity Refs
    areEntityRefsValid = isIdValid(id.value) && isCreatedAtValid(createdAt.value)

    // Activity Refs
    if (isActivityTable(table)) {
      areActivityRefsValid =
        isShortTextValid(name.value) &&
        isTextAreaValid(description.value) &&
        isStatusValid(activityStatus.value)
    }

    // Record Refs
    if (isRecordTable(table)) {
      areRecordRefsValid = true
    }

    // Other Refs

    return areEntityRefsValid && areActivityRefsValid && areRecordRefsValid
  }

  return {
    id,
    createdAt,
    name,
    description,
    activityStatus,
    trackLbs,
    trackInches,
    trackFeet,
    trackPercent,
    loadIdItem,
    resetInputRefs,
    areInputRefsValid,
  }
}
