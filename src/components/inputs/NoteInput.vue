<script setup lang="ts">
import { QInput } from 'quasar'
import { FieldName } from '@/constants/enums'
import { isTextValid } from '@/utils/validators'
import { useInputInject } from '@/use/useInputInject'

/**
 * @todo
 */

const { noteModel, noteInputRef } = useInputInject(FieldName.NOTE)
const maxLength = 500
</script>

<template>
  <QInput
    v-model="noteModel"
    ref="noteInputRef"
    label="Note"
    :rules="[(val: string) => isTextValid(val) || 'Note is limited to 500 characters']"
    :maxlength="maxLength"
    :hint="`${noteModel?.length || '0'}/${maxLength}`"
    dense
    outlined
    autogrow
    type="textarea"
    color="primary"
    class="q-mb-xs"
  />
</template>
