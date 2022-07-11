<script setup lang="ts">
import { QInput } from 'quasar'
import { onMounted } from 'vue'
import { useVModel } from '@vueuse/core'
import { useValidators } from '@/use/useValidators'

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
const { isNameValid } = useValidators()

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
    :rules="[(val: string) => isNameValid(val) || 'Name must be between 1 and 40 characters']"
    :maxlength="40"
    dense
    outlined
    color="primary"
  />
</template>
