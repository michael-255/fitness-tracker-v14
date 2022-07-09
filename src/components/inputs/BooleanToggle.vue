<script setup lang="ts">
import { QToggle } from 'quasar'
import { useVModel } from '@vueuse/core'

/**
 * @example
 * Script: const bool: Ref<boolean> = ref(false)
 * Template: <BooleanToggle :bool="bool" @update:bool="bool = $event" />
 */

const props = defineProps<{
  bool: boolean
  label: string
}>()

const emits = defineEmits<{
  (eventName: 'update:bool', bool: boolean): void
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
