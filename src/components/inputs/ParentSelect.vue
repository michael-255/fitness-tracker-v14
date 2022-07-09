<script setup lang="ts">
import { QSelect } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { ValidationMessage, isRequired } from '@/utils/validators'
import { database } from '@/services/LocalDatabase'
import type { DBTable } from '@/constants/enums'

/**
 * @example
 * Script: const parentId: Ref<string> = ref('')
 * Template: <ParentSelect :parentId="parentId" @update:parentId="parentId = $event" />
 */

const props = defineProps<{
  parentId: string
  table: DBTable.MEASUREMENTS | DBTable.EXERCISES | DBTable.WORKOUTS
}>()

const emits = defineEmits<{
  (eventName: 'update:parentId', parentId: string): void
}>()

const parentId = useVModel(props, 'parentId', emits)

const options: Ref<any[]> = ref([])

onMounted(async () => {
  // Get activities for the table
  const response = await database.getAll(props.table)
  // Sort those activities by name
  const sortedResponse = response.sort((a: any, b: any) => {
    return a.name.localeCompare(b.name)
  })
  // Generate the options for the select box
  options.value = sortedResponse.map((a: any) => ({
    value: a.id,
    label: a.name,
  }))
})
</script>

<template>
  <QSelect
    v-model="parentId"
    label="Parent Activity"
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
