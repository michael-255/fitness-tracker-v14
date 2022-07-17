import type { FieldName } from '@/constants/enums'
import { type Ref, ref, provide } from 'vue'

export function useInputProvide(injectionKey: FieldName): { [x: string]: any } {
  const model: Ref<any> = ref(null)
  const inputRef: Ref<any> = ref(null)

  function updateModel(value: any) {
    model.value = value
  }

  function validate(): boolean {
    return !!inputRef?.value?.validate()
  }

  provide(injectionKey, {
    model,
    inputRef,
    updateModel,
  })

  return {
    [injectionKey + 'Model']: model,
    [injectionKey + 'Validate']: validate,
  }
}
