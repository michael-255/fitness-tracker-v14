<script setup lang="ts">
import { QInput } from 'quasar'
import { v4 as createId } from 'uuid'
import { ValidationMaxLength, ValidationMessage, isShortTextValid } from '@/utils/validators'
import { useVModel } from '@vueuse/core'
import { onMounted } from 'vue'

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
    :rules="[
      (val: string) => isShortTextValid(val) || ValidationMessage.SHORT_TEXT,
    ]"
    :maxlength="ValidationMaxLength.SHORT"
    dense
    outlined
    color="primary"
  >
    <template v-slot:after>
      <QBtn icon="autorenew" color="primary" class="q-ml-xs q-px-sm" @click="id = createId()" />
    </template>
  </QInput>
</template>
