import type { FieldName } from '@/constants/enums'
import { inject } from 'vue'

export function useInputInject(injectionKey: FieldName): { [x: string]: any } {
  const { inputRef, model, updateModel } = inject(injectionKey) as any

  return {
    [injectionKey + 'Model']: model,
    [injectionKey + 'InputRef']: inputRef,
    [injectionKey + 'UpdateModel']: updateModel,
  }
}
