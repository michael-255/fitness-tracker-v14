<script setup lang="ts">
import { QInput } from 'quasar'
import { v4 as createId } from 'uuid'
import { ValidationLimit, ValidationMessage, isIdValid } from '@/utils/validators'
import { useVModel } from '@vueuse/core'

/**
 * @example
 * Script: const id: Ref<string> = ref('')
 * Template: <IdInput :id="id" @update:id="id = $event" />
 */

const props = defineProps<{
  id: string
}>()

const emits = defineEmits<{
  (eventName: 'update:id', id: string): void
}>()

const id = useVModel(props, 'id', emits)
</script>

<template>
  <QInput
    v-model="id"
    label="Id"
    :rules="[
      (val: string) => isIdValid(val) || ValidationMessage.ID,
    ]"
    :maxlength="ValidationLimit.ID"
    dense
    outlined
    color="primary"
  >
    <template v-slot:after>
      <QBtn icon="autorenew" color="primary" class="q-ml-xs q-px-sm" @click="id = createId()" />
    </template>
  </QInput>
</template>
