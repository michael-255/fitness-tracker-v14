<script setup lang="ts">
import { QInput } from 'quasar'
import { ValidationMaxLength, ValidationMessage, isLongTextValid } from '@/utils/validators'
import { useVModel } from '@vueuse/core'
import type { Nullable } from '@/constants/globals'

/**
 * @example
 * Script: const note: Ref<Nullable<string>> = ref(null)
 * Template: <TextAreaInput :text="note" label="Note"  @update:text="note = $event" />
 */

const props = defineProps<{
  text: Nullable<string>
  label: 'Description' | 'Note'
}>()

const emits = defineEmits<{
  (event: 'update:text', text: Nullable<string>): void
}>()

const text = useVModel(props, 'text', emits)
</script>

<template>
  <QInput
    v-model="text"
    :label="label"
    :rules="[
      (val: string) => isLongTextValid(val) || ValidationMessage.LONG_TEXT,
    ]"
    :maxlength="ValidationMaxLength.LONG"
    :hint="`${props.text?.length || '0'}/${ValidationMaxLength.LONG}`"
    dense
    outlined
    color="primary"
    type="textarea"
    autogrow
  />
</template>
