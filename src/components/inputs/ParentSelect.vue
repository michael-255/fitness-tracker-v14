<script setup lang="ts">
import { QSelect } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'
import type { DBTable } from '@/constants/enums'
import { useVModel } from '@vueuse/core'
import { database } from '@/services/LocalDatabase'
import { isRequired } from '@/utils/validators'

/**
 * @example
 * Script: const parentId: Ref<string> = ref('')
 * Template: <ParentSelect :parentId="parentId" @update:parentId="parentId = $event" />
 */

const props = defineProps<{
  parentId: string
  parentTable: DBTable.MEASUREMENTS | DBTable.EXERCISES | DBTable.WORKOUTS
}>()

const emits = defineEmits<{
  (event: 'update:parentId', parentId: string): void
}>()

const parentId = useVModel(props, 'parentId', emits)

const options: Ref<any[]> = ref([])

onMounted(async () => {
  // Get activities for the table
  const response = await database.getAll(props.parentTable)
  // Sort those activities by name
  const sortedResponse = response.sort((a: any, b: any) => {
    return a.name.localeCompare(b.name)
  })
  // Generate the options for the select box
  options.value = sortedResponse.map((a: any) => ({
    value: a.id,
    label: `${a.name} (${getFirstIdChars(a.id)})`,
  }))
})

function getFirstIdChars(id: string): string {
  if (id.length > 4) {
    return id.slice(0, 4) + '*'
  } else {
    return id
  }
}
</script>

<template>
  <QSelect
    class="q-mb-xs"
    v-model="parentId"
    label="Parent Activity"
    :options="options"
    :rules="[
       (val: string) => isRequired(val) || '* Required',
    ]"
    emit-value
    map-options
    options-dense
    dense
    outlined
    color="primary"
  />
</template>
