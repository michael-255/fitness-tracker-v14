<script setup lang="ts">
import { QInput } from 'quasar'
import { useVModel } from '@vueuse/core'
import { useValidators } from '@/use/useValidators'

/**
 * @example
 * Script: const note: Ref<Nullable<string>> = ref(null)
 * Template: <TextAreaInput :text="note" label="Note"  @update:text="note = $event" />
 */

const props = defineProps<{
  text: string
  label: 'Description' | 'Note'
}>()

const emits = defineEmits<{
  (event: 'update:text', text: string): void
}>()

const text = useVModel(props, 'text', emits)
const { isTextAreaValid } = useValidators()
const maxLength = 500
</script>

<template>
  <QInput
    v-model="text"
    :label="label"
    :rules="[(val: string) => isTextAreaValid(val) || 'Input is limited to 500 characters']"
    :maxlength="maxLength"
    :hint="`${props.text?.length || '0'}/${maxLength}`"
    dense
    outlined
    color="primary"
    type="textarea"
    autogrow
  />
</template>
