<script setup lang="ts">
import { QInput } from 'quasar'
import { onMounted } from 'vue'
import { ValidationMaxLength, ValidationMessage, isShortTextValid } from '@/utils/validators'
import { useVModel } from '@vueuse/core'

/**
 * @example
 * Script: const name: Ref<string> = ref('My Activity')
 * Template: <NameInput :name="name" @update:name="name = $event" />
 */

const props = defineProps<{
  name: string
}>()

const emits = defineEmits<{
  (event: 'update:name', name: string): void
}>()

const name = useVModel(props, 'name', emits)

/**
 * Defaults
 */
onMounted(() => {
  if (!props.name) {
    name.value = 'My Activity'
  }
})
</script>

<template>
  <QInput
    v-model="name"
    label="Name"
    :rules="[
      (val: string) => isShortTextValid(val) || ValidationMessage.SHORT_TEXT,
    ]"
    :maxlength="ValidationMaxLength.SHORT"
    dense
    outlined
    color="primary"
  />
</template>
