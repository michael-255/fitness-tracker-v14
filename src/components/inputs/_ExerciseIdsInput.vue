<script setup lang="ts">
import { QSelect, QItem } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { isRequired } from '@/utils/validators'
import { database } from '@/services/LocalDatabase'
import { DBTable } from '@/constants/enums'

/**
 * @example
 * Script: const exerciseIds: Ref<Id[]> = ref([])
 * Template: <ExerciseIdsInput :exerciseIds="exerciseIds" @update:exerciseIds="exerciseIds = $event" />
 */

const props = defineProps<{
  exerciseIds: string[]
}>()

const emits = defineEmits<{
  (event: 'update:exerciseIds', exerciseIds: string[]): void
}>()

const exerciseIds = useVModel(props, 'exerciseIds', emits)

const options: Ref<object[]> = ref([])

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
       (val: string) => isRequired(val) || 'error',
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
