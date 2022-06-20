<script setup lang="ts">
import { QInput, QIcon } from 'quasar'
import { computed } from 'vue'
import { createId } from '@/utils/build-id'
import { isIdValid } from '@/utils/validators'
import type { Id } from '@/constants/types'

const props = defineProps<{
  id: Id
}>()

const emits = defineEmits<{
  (eventName: 'update:id', id: Id): void
}>()

const id = computed({
  get() {
    return props.id
  },
  set(id: Id) {
    emits('update:id', id)
  },
})

// const id = ref(createId())
/**
 * @todo
 * - Prop using ref from parent instead
 * - Validator
 * - Events
 */
</script>

<template>
  <QInput
    v-model="id"
    :rules="[
      val => !!val || '* Required',
      (val: string) => isIdValid(val) || 'Id must be of the format XXXX-XXXX-XXXX',
    ]"
    dense
    filled
    label="Id"
    color="primary"
  >
    <template v-slot:append>
      <QIcon name="autorenew" @click="id = createId()" class="cursor-pointer" />
    </template>
  </QInput>
</template>
