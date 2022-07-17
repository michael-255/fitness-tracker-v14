<script setup lang="ts">
import { QSelect } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { ActivityStatus, MeasurementType, RecordStatus } from '@/constants/enums'
import { isRequired } from '@/utils/validators'

/**
 * @example
 * Script: const status: Ref<ActivityStatus | RecordStatus> = ref(ActivityStatus.ENABLED)
 * Template: <StatusSelect :status="status" @update:status="status = $event" />
 */

const props = defineProps<{
  label: 'Activity Status' | 'Record Status' | 'Type' | 'Parent Type'
  value: ActivityStatus | RecordStatus | MeasurementType
}>()

const emits = defineEmits<{
  (event: 'update:value', value: any): void
}>()

const value = useVModel(props, 'value', emits)
const options: Ref<string[]> = ref([])

/**
 * Generates defaults and select box options based on type prop
 */
onMounted(async () => {
  if (props.label === 'Activity Status') {
    options.value = Object.values(ActivityStatus)
  } else if (props.label === 'Record Status') {
    options.value = Object.values(RecordStatus)
  } else if (props.label === 'Type' || props.label === 'Parent Type') {
    options.value = Object.values(MeasurementType)
  }
})
</script>

<template>
  <QSelect
    class="q-mb-xs"
    v-model="value"
    :label="label"
    :options="options"
    :rules="[
      (val: ActivityStatus | RecordStatus | MeasurementType) => isRequired(val) || '* Required'
    ]"
    emit-value
    map-options
    options-dense
    dense
    outlined
    color="primary"
  />
</template>
