<script setup lang="ts">
import { QSelect } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'
import { FieldName, ActivityStatus } from '@/constants/enums'
import { isRequired } from '@/utils/validators'
import { useInputInject } from '@/use/useInputInject'

/**
 * @todo
 */

const { activityStatusModel, activityStatusInputRef, activityStatusUpdateModel } = useInputInject(
  FieldName.ACTIVITY_STATUS
)
const options: Ref<string[]> = ref([])

/**
 * @todo
 */
onMounted(async () => {
  options.value = Object.values(ActivityStatus)

  if (!activityStatusModel.value) {
    activityStatusUpdateModel(ActivityStatus.ENABLED)
  }
})
</script>

<template>
  <QSelect
    v-model="activityStatusModel"
    ref="activityStatusInputRef"
    label="Activity Status"
    :options="options"
    :rules="[(val: ActivityStatus) => isRequired(val) || '* Required']"
    emit-value
    map-options
    options-dense
    dense
    outlined
    color="primary"
    class="q-mb-xs"
  />
</template>
