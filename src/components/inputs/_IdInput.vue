<script setup lang="ts">
import { QInput } from 'quasar'
import { v4 as createId } from 'uuid'
import { useVModel } from '@vueuse/core'
import { onMounted } from 'vue'
import { isIdValid } from '@/utils/validators'

/**
 * @example
 * Script: const id: Ref<string> = ref('')
 * Template: <IdInput :id="id" @update:id="id = $event" />
 */

const props = defineProps<{
  id: string
}>()
const emits = defineEmits<{
  (event: 'update:id', id: string): void
}>()
const id = useVModel(props, 'id', emits)

/**
 * Defaults
 */
onMounted(() => {
  if (!props.id) {
    id.value = createId()
  }
})
</script>

<template>
  <QInput
    v-model="id"
    label="Id"
    :rules="[(val: string) => isIdValid(val) || 'Id must be between 1 and 40 characters']"
    :maxlength="40"
    dense
    outlined
    color="primary"
    class="q-mb-xs"
  >
    <template v-slot:after>
      <QBtn icon="autorenew" color="primary" class="q-ml-xs q-px-sm" @click="id = createId()" />
    </template>
  </QInput>
</template>
