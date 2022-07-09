<script setup lang="ts">
import { QToggle } from 'quasar'
import type { TrackBoolean } from '@/constants/globals'
import { useVModel } from '@vueuse/core'

/**
 * @example
 * Script: const bool: Ref<TrackBoolean> = ref(false)
 * Template: <TrackBooleanInput :bool="bool" @update:bool="bool = $event" />
 */

const props = defineProps<{
  bool: TrackBoolean
  label: string
}>()

const emits = defineEmits<{
  (eventName: 'update:bool', bool: TrackBoolean): void
}>()

const bool = useVModel(props, 'bool', emits)
</script>

<template>
  <div>
    <QToggle
      v-bind="$attrs"
      v-model="bool"
      :label="label"
      dense
      filled
      color="primary"
      class="q-ma-sm"
    />
  </div>
</template>
