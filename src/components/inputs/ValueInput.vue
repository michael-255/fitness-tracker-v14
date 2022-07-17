<script setup lang="ts">
import { QInput } from 'quasar'
import { FieldName } from '@/constants/enums'
import { isRequiredNumber } from '@/utils/validators'
import { useInputInject } from '@/use/useInputInject'

/**
 * @todo
 */

const { valueModel, valueInputRef } = useInputInject(FieldName.VALUE)
</script>

<template>
  <QInput
    v-model.number="valueModel"
    ref="valueInputRef"
    label="Value"
    :rules="[(val: string) => isRequiredNumber(val) || 'Number value is required']"
    :maxlength="20"
    dense
    outlined
    autogrow
    type="number"
    color="primary"
    class="q-mb-xs"
  />
</template>
