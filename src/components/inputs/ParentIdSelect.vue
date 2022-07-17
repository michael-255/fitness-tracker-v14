<script setup lang="ts">
import { QSelect } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'
import { FieldName } from '@/constants/enums'
import { isRequired } from '@/utils/validators'
import { useInputInject } from '@/use/useInputInject'
import { database } from '@/services/LocalDatabase'
import { truncateString } from '@/utils/common'

/**
 * @todo
 */

const { table, parentIdModel, parentIdInputRef } = useInputInject(FieldName.PARENT_ID)
const options: Ref<any[]> = ref([])

/**
 * @todo
 */
onMounted(async () => {
  const parentTableData = await database.getAll(table)

  const alphaSortedData = parentTableData.sort((a: any, b: any) => {
    return a.name.localeCompare(b.name)
  })

  options.value = alphaSortedData.map((a: any) => ({
    value: a.id,
    label: `${a.name} (${truncateString(a.id, 4, '*')})`,
  }))
})
</script>

<template>
  <QSelect
    ref="parentIdInputRef"
    v-model="parentIdModel"
    label="Parent Activity"
    :options="options"
    :rules="[(val: string) => isRequired(val) || '* Required',]"
    emit-value
    map-options
    options-dense
    dense
    outlined
    color="primary"
    class="q-mb-xs"
  />
</template>
