<script setup lang="ts">
import { QInput, QIcon } from 'quasar'
import { createId } from '@/utils/build-id'
import { ValidationMessage, isIdValid } from '@/utils/validators'
import type { Id } from '@/constants/types'
import { useVModel } from '@vueuse/core'

/**
 * Example Usage:
 * const id: Ref<Id> = ref(createId())
 * ...
 * <IdInput :id="id" @update:id="id = $event" />
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
    mask="XXXX-XXXX-XXXX"
    fill-mask="_"
    :rules="[
      (val: string) => isIdValid(val) || ValidationMessage.ID,
    ]"
    dense
    outlined
    color="primary"
  >
    <template v-slot:append>
      <QIcon color="warning" name="autorenew" @click="id = createId()" class="cursor-pointer" />
    </template>
  </QInput>
</template>
