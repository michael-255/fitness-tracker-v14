<script setup lang="ts">
import { QSelect } from 'quasar'
import { Status } from '@/constants/enums'
import { useVModel } from '@vueuse/core'
import { ValidationMessage } from '@/utils/validators'

/**
 * Example Usage:
 * const status: Ref<Status> = ref(Status.ENABLED)
 * ...
 * <StatusInput :status="status" @update:status="status = $event" />
 */

const props = defineProps<{
  status: Status
}>()

const emits = defineEmits<{
  (eventName: 'update:status', status: Status): void
}>()

const status = useVModel(props, 'status', emits)

const options: Status[] = Object.values(Status)
</script>

<template>
  <QSelect
    v-model="status"
    label="Status"
    :options="options"
    :rules="[
      (val: string) => !!val || ValidationMessage.REQUIRED,
    ]"
    dense
    outlined
    color="primary"
  />
</template>
