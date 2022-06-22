<script setup lang="ts">
import { QInput, QIcon } from 'quasar'
import { createId } from '@/utils/build-id'
import { isIdValid } from '@/utils/validators'
import type { Id } from '@/constants/types'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  id: Id
}>()

const emits = defineEmits<{
  (eventName: 'update:id', id: Id): void
}>()

const id = useVModel(props, 'id', emits)

/**
 * @todo - NOTES
 * - Create validator functions for your fields and types in `utils/validators.ts`
 * - Consider having constant validator strings stored as well?
 */
</script>

<template>
  <QInput
    v-model="id"
    label="Id"
    mask="XXXX-XXXX-XXXX"
    maxlength="14"
    fill-mask="_"
    :rules="[
      val => !!val || '* Required',
      (val: string) => isIdValid(val) || 'Id must be of the format XXXX-XXXX-XXXX',
    ]"
    dense
    outlined
    color="primary"
  >
    <template v-slot:append>
      <QIcon color="warning" name="autorenew" @click="id = createId()" class="cursor-pointer" />
    </template>
  </QInput>
</template>
