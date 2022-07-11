<script setup lang="ts">
import { QSelect } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { ActivityStatus, RecordStatus } from '@/constants/enums'
import { useValidators } from '@/use/useValidators'

/**
 * @example
 * Script: const status: Ref<ActivityStatus | RecordStatus> = ref(ActivityStatus.ENABLED)
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
const { isStatusValid } = useValidators()
const options: Ref<string[]> = ref([])

/**
 * Generates defaults and select box options based on type prop
 */
onMounted(async () => {
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
    :rules="[(val: ActivityStatus | RecordStatus) => isStatusValid(val) || 'Status is Required']"
    emit-value
    map-options
    options-dense
    dense
    outlined
    color="primary"
  />
</template>
