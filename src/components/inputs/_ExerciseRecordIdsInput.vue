<script setup lang="ts">
import { QSelect, QItem } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { database } from '@/services/LocalDatabase'
import { DBTable } from '@/constants/enums'

/**
 * @example
 * Script: const exerciseRecordIds: Ref<Id[]> = ref([])
 * Template: <ExerciseRecordIdsInput :exerciseRecordIds="exerciseRecordIds" @update:exerciseRecordIds="exerciseRecordIds = $event" />
 */

const props = defineProps<{
  exerciseRecordIds: string[]
}>()

const emits = defineEmits<{
  (event: 'update:exerciseRecordIds', exerciseRecordIds: string[]): void
}>()

const exerciseRecordIds = useVModel(props, 'exerciseRecordIds', emits)

const options: Ref<string[]> = ref([])

onMounted(async () => {
  const activities = await database.getAll(DBTable.EXERCISE_RECORDS)

  options.value = activities.map((a: any) => a.id)
})
</script>

<template>
  <QSelect
    v-model="exerciseRecordIds"
    label="Exercise Record Ids"
    :options="options"
    hint="Optional"
    emit-value
    multiple
    options-dense
    dense
    outlined
    color="primary"
  >
    <template v-slot:option="scope">
      <QItem v-bind="scope.itemProps">
        {{ scope.opt.label }}
      </QItem>
    </template>
  </QSelect>
</template>
