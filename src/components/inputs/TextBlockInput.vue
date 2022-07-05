<script setup lang="ts">
import { QInput } from 'quasar'
import { ValidationLimit, ValidationMessage, isTextBlockValid } from '@/utils/validators'
import type { TextBlock } from '@/constants/types'
import { useVModel } from '@vueuse/core'

/**
 * @example
 * Script: const note: Ref<TextBlock> = ref(null)
 * Template: <TextBlockInput :text="note" label="Note"  @update:text="note = $event" />
 */

type TextBlockLabel = 'Description' | 'Note'

const props = defineProps<{
  text: TextBlock
  label: TextBlockLabel
}>()

const emits = defineEmits<{
  (eventName: 'update:text', description: TextBlock): void
}>()

const text = useVModel(props, 'text', emits)
</script>

<template>
  <QInput
    v-model="text"
    :label="label"
    :rules="[
      (val: string) => isTextBlockValid(val) || ValidationMessage.TEXTBLOCK,
    ]"
    :maxlength="ValidationLimit.TEXTBLOCK"
    :hint="`${props.text?.length || '0'}/${ValidationLimit.TEXTBLOCK}`"
    dense
    outlined
    color="primary"
    type="textarea"
    autogrow
  />
</template>
