<script setup lang="ts">
import { QInput } from 'quasar'
import { createId } from '@/utils/build-id'
import { ValidationLimit, ValidationMessage, isIdValid } from '@/utils/validators'
import type { Id } from '@/constants/types'
import { useVModel } from '@vueuse/core'

/**
 * @example
 * Script: const id: Ref<Id> = ref(createId())
 * Template: <IdInput :id="id" @update:id="id = $event" />
 */

const props = defineProps<{
  id: Id
}>()

const emits = defineEmits<{
  (eventName: 'update:id', id: Id): void
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
