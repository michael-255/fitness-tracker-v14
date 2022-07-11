import { ActivityStatus } from '@/constants/enums'
import type { Nullable } from '@/constants/globals'
import { type Ref, ref } from 'vue'
import { useValidators } from '@/use/useValidators'
import { useEntityRefs } from '@/use/useEntityRefs'

export function useActivityRefs() {
  const { id, createdAt, resetEntityRefs, areEntityRefsValid } = useEntityRefs()
  const { isNameValid, isTextAreaValid, isStatusValid } = useValidators()

  const name: Ref<string> = ref('My Activity')
  const description: Ref<Nullable<string>> = ref(null)
  const status: Ref<ActivityStatus> = ref(ActivityStatus.ENABLED)

  function resetActivityRefs(): void {
    resetEntityRefs()
    name.value = 'My Activity'
    description.value = null
    status.value = ActivityStatus.ENABLED
  }

  function areActivityRefsValid(): boolean {
    return (
      areEntityRefsValid() &&
      isNameValid(name.value) &&
      isTextAreaValid(description.value) &&
      isStatusValid(status.value)
    )
  }

  return {
    id,
    createdAt,
    name,
    description,
    status,
    resetActivityRefs,
    areActivityRefsValid,
  }
}
