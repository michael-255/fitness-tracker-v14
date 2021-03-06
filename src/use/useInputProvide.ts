import type { DBTable, FieldName } from '@/constants/enums'
import { type Ref, ref, provide } from 'vue'

export function useInputProvide(injectionKey: FieldName, table?: DBTable): { [x: string]: any } {
  const model: Ref<any> = ref(null)
  const inputRef: Ref<any> = ref(null)

  function updateModel(value: any) {
    model.value = value
  }

  function validate(): boolean {
    return !!inputRef?.value?.validate()
  }

  provide(injectionKey, {
    table,
    model,
    inputRef,
    updateModel,
  })

  return {
    [injectionKey + 'Model']: model,
    [injectionKey + 'Validate']: validate,
  }
}
