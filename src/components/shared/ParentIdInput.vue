<script setup lang="ts">
import { QSelect, QItem, QItemSection, QItemLabel } from 'quasar'
import type { Id } from '@/constants/types'
import { onMounted, ref, type Ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { ValidationMessage } from '@/utils/validators'
import { database } from '@/services/LocalDatabase'
import type { DBTable } from '@/constants/enums'

/**
 * Example Usage:
 * const parentId: Ref<Id> = ref('')
 * ...
 * <ParentIdInput :parentId="parentId" :table="DBTable.XXX" @update:parentId="parentId = $event" />
 */

const props = defineProps<{
  parentId: Id
  table: DBTable
}>()

const emits = defineEmits<{
  (eventName: 'update:parentId', parentId: Id): void
}>()

const parentId = useVModel(props, 'parentId', emits)

const options: Ref<any[]> = ref([])

onMounted(async () => {
  const activities = await database.getAll(props.table)

  const loadedOptions = activities.map((a: any) => ({
    label: `${a.name} -- ${a.id}`,
    id: a.id,
  }))

  options.value = loadedOptions
})
</script>
<!-- :rules="[
      (val: string) => !!val || ValidationMessage.REQUIRED,
    ]" -->

<template>
  <QSelect
    v-model="parentId"
    label="Parent Id"
    :options="options"
    :option-value="(opt) => (Object(opt) === opt && 'id' in opt ? opt.id : null)"
    :option-label="(opt) => (Object(opt) === opt && 'label' in opt ? opt.label : '')"
    dense
    outlined
    color="primary"
  />
</template>
