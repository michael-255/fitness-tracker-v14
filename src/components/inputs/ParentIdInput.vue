<script setup lang="ts">
import { QSelect } from 'quasar'
import type { Id, IdLabelOption } from '@/constants/globals'
import { onMounted, ref, type Ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { ValidationMessage, isRequired } from '@/utils/validators'
import { database } from '@/services/LocalDatabase'
import type { DBTable } from '@/constants/enums'

/**
 * @example
 * Script: const parentId: Ref<Id> = ref('')
 * Template: <ParentIdInput :parentId="parentId" @update:parentId="parentId = $event" />
 */

const props = defineProps<{
  parentId: Id
  table: DBTable.MEASUREMENTS | DBTable.EXERCISES | DBTable.WORKOUTS
}>()

const emits = defineEmits<{
  (eventName: 'update:parentId', parentId: Id): void
}>()

const parentId = useVModel(props, 'parentId', emits)

const options: Ref<IdLabelOption[]> = ref([])

onMounted(async () => {
  const response: any[] = await database.getAll(props.table)

  options.value = response.map((a: any) => ({
    value: a.id,
    label: `${a.name} -- ${a.id}`,
  }))
})
</script>

<template>
  <QSelect
    v-model="parentId"
    label="Parent Id"
    :options="options"
    :rules="[
       (val: string) => isRequired(val) || ValidationMessage.REQUIRED,
    ]"
    emit-value
    map-options
    options-dense
    dense
    outlined
    color="primary"
  />
</template>
