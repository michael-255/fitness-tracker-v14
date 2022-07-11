import { type Ref, ref } from 'vue'
import { v4 as createId } from 'uuid'
import { useValidators } from '@/use/useValidators'

export function useEntityRefs() {
  const { isIdValid, isCreatedAtValid } = useValidators()

  const id: Ref<string> = ref(createId())
  const createdAt: Ref<string> = ref(new Date().toISOString())

  function resetEntityRefs(): void {
    id.value = createId()
    createdAt.value = new Date().toISOString()
  }

  function areEntityRefsValid(): boolean {
    return isIdValid(id.value) && isCreatedAtValid(createdAt.value)
  }

  return {
    id,
    createdAt,
    resetEntityRefs,
    areEntityRefsValid,
  }
}
