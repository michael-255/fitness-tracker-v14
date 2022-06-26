<script setup lang="ts">
import { QInput } from 'quasar'
import { ValidationMessage, isNameValid } from '@/utils/validators'
import type { ActivityName } from '@/constants/types'
import { useVModel } from '@vueuse/core'

/**
 * @example
 * Script: const name: Ref<ActivityName> = ref('My Activity')
 * Template: <NameInput :name="name" @update:name="name = $event" />
 */

const props = defineProps<{
  name: ActivityName
}>()

const emits = defineEmits<{
  (eventName: 'update:name', name: ActivityName): void
}>()

const name = useVModel(props, 'name', emits)
</script>

<template>
  <QInput
    v-model="name"
    label="Name"
    :rules="[
      (val: string) => isNameValid(val) || ValidationMessage.NAME,
    ]"
    dense
    outlined
    color="primary"
  />
</template>
