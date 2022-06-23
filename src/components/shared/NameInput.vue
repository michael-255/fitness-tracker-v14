<script setup lang="ts">
import { QInput } from 'quasar'
import { ValidationMessage, isNameValid } from '@/utils/validators'
import type { Name } from '@/constants/types'
import { useVModel } from '@vueuse/core'

/**
 * Example Usage:
 * const name: Ref<Name> = ref('Activity')
 * ...
 * <NameInput :name="name" @update:name="name = $event" />
 */

const props = defineProps<{
  name: Name
}>()

const emits = defineEmits<{
  (eventName: 'update:name', name: Name): void
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
