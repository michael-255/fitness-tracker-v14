<script setup lang="ts">
import { QSelect, QItem } from 'quasar'
import type { Id, IdLabelOption } from '@/constants/globals'
import { onMounted, ref, type Ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { ValidationMessage, isRequired } from '@/utils/validators'
import { database } from '@/services/LocalDatabase'
import { DBTable } from '@/constants/enums'

/**
 * @example
 * Script: const exerciseIds: Ref<Id[]> = ref([])
 * Template: <ExerciseIdsInput :exerciseIds="exerciseIds" @update:exerciseIds="exerciseIds = $event" />
 */

const props = defineProps<{
  exerciseIds: Id[]
}>()

const emits = defineEmits<{
  (eventName: 'update:exerciseIds', exerciseIds: Id[]): void
}>()

const exerciseIds = useVModel(props, 'exerciseIds', emits)

const options: Ref<IdLabelOption[]> = ref([])

onMounted(async () => {
  const activities = await database.getAll(DBTable.EXERCISES)

  options.value = activities.map((a: any) => ({
    value: a.id,
    label: `${a.name} -- ${a.id}`,
  }))
})
</script>

<template>
  <QSelect
    v-model="exerciseIds"
    label="Exercise Ids"
    :options="options"
    :rules="[
       (val: string) => isRequired(val) || ValidationMessage.REQUIRED,
    ]"
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
