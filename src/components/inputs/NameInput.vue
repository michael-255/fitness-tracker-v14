<script setup lang="ts">
import { QInput } from 'quasar'
import { onMounted } from 'vue'
import { FieldName } from '@/constants/enums'
import { isShortTextValid } from '@/utils/validators'
import { useInputInject } from '@/use/useInputInject'

/**
 * @todo
 */

const { nameModel, nameInputRef, nameUpdateModel } = useInputInject(FieldName.NAME)

/**
 * @todo
 */
onMounted(() => {
  if (!nameModel.value) {
    nameUpdateModel('My Activity')
  }
})
</script>

<template>
  <QInput
    v-model="nameModel"
    ref="nameInputRef"
    label="Name"
    :rules="[(val: string) => isShortTextValid(val) || 'Name must be between 1 and 40 characters']"
    :maxlength="40"
    dense
    outlined
    color="primary"
    class="q-mb-xs"
  />
</template>
