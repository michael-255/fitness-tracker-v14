<script setup lang="ts">
import { QSelect } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'
import { FieldName, RecordStatus } from '@/constants/enums'
import { isRequired } from '@/utils/validators'
import { useInputInject } from '@/use/useInputInject'

/**
 * @todo
 */

const { recordStatusModel, recordStatusInputRef, recordStatusUpdateModel } = useInputInject(
  FieldName.RECORD_STATUS
)
const options: Ref<string[]> = ref([])

/**
 * @todo
 */
onMounted(async () => {
  options.value = Object.values(RecordStatus)

  if (!recordStatusModel.value) {
    recordStatusUpdateModel(RecordStatus.COMPLETED)
  }
})
</script>

<template>
  <QSelect
    v-model="recordStatusModel"
    ref="recordStatusInputRef"
    label="Activity Status"
    :options="options"
    :rules="[(val: RecordStatus) => isRequired(val) || '* Required']"
    emit-value
    map-options
    options-dense
    dense
    outlined
    color="primary"
    class="q-mb-xs"
  />
</template>
