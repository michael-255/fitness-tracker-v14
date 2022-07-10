<script setup lang="ts">
import { QSelect } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { ValidationMessage, isRequired } from '@/utils/validators'
import { ActivityStatus, RecordStatus } from '@/constants/enums'

/**
 * @example
 * Script: const status: Ref<string> = ref('')
 * Template: <StatusSelect :status="status" @update:status="status = $event" />
 */

const props = defineProps<{
  status: ActivityStatus | RecordStatus
  type: 'ActivityStatus' | 'RecordStatus'
}>()

const emits = defineEmits<{
  (event: 'update:status', status: any): void
}>()

const status = useVModel(props, 'status', emits)

const options: Ref<string[]> = ref([])

onMounted(async () => {
  // Generate the options for the select box based on the type prop
  if (props.type === 'ActivityStatus') {
    options.value = Object.values(ActivityStatus)
  }
  if (props.type === 'RecordStatus') {
    options.value = Object.values(RecordStatus)
  }
})
</script>

<template>
  <QSelect
    v-model="status"
    label="Status"
    :options="options"
    :rules="[
       (val: string) => isRequired(val) || ValidationMessage.REQUIRED,
    ]"
    emit-value
    map-options
    options-dense
    dense
    outlined
    color="primary"
  />
</template>
