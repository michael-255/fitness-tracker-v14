<script setup lang="ts">
import { QInput } from 'quasar'
import { ValidationMessage, isDescriptionValid } from '@/utils/validators'
import type { Description } from '@/constants/types'
import { useVModel } from '@vueuse/core'

/**
 * Example Usage:
 * const description: Ref<Description> = ref('')
 * ...
 * <DescriptionInput :description="description" @update:description="description = $event" />
 */

const props = defineProps<{
  description: Description
}>()

const emits = defineEmits<{
  (eventName: 'update:description', description: Description): void
}>()

const description = useVModel(props, 'description', emits)
</script>

<template>
  <QInput
    v-model="description"
    label="Description"
    :rules="[
      (val: string) => isDescriptionValid(val) || ValidationMessage.DESCRIPTION,
    ]"
    dense
    outlined
    color="primary"
    type="textarea"
    autogrow
  />
</template>
