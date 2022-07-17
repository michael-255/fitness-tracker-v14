<script setup lang="ts">
import { QSelect } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'
import { FieldName, MeasurementType } from '@/constants/enums'
import { isRequired } from '@/utils/validators'
import { useInputInject } from '@/use/useInputInject'

/**
 * @todo
 */

const { parentTypeModel, parentTypeInputRef, parentTypeUpdateModel } = useInputInject(
  FieldName.PARENT_TYPE
)
const options: Ref<string[]> = ref([])

/**
 * @todo
 */
onMounted(async () => {
  options.value = Object.values(MeasurementType)

  if (!parentTypeModel.value) {
    parentTypeUpdateModel(MeasurementType.INCHES)
  }
})
</script>

<template>
  <QSelect
    v-model="parentTypeModel"
    ref="parentTypeInputRef"
    label="Measurement Type"
    :options="options"
    :rules="[(val: MeasurementType) => isRequired(val) || '* Required']"
    emit-value
    map-options
    options-dense
    dense
    outlined
    color="primary"
    class="q-mb-xs"
  />
</template>
