<script setup lang="ts">
import { QInput } from 'quasar'
import { ValidationMessage, isNoteValid } from '@/utils/validators'
import type { Note } from '@/constants/types'
import { useVModel } from '@vueuse/core'

/**
 * Example Usage:
 * const note: Ref<Note> = ref('')
 * ...
 * <NoteInput :note="note" @update:note="note = $event" />
 */

const props = defineProps<{
  note: Note
}>()

const emits = defineEmits<{
  (eventName: 'update:note', note: Note): void
}>()

const note = useVModel(props, 'note', emits)
</script>

<template>
  <QInput
    v-model="note"
    label="Note"
    :rules="[
      (val: string) => isNoteValid(val) || ValidationMessage.NOTE,
    ]"
    dense
    outlined
    color="primary"
    type="textarea"
    autogrow
  />
</template>
