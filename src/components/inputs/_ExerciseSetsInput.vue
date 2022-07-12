<script setup lang="ts">
import { QBtn, QInput, QIcon } from 'quasar'
import { useVModel } from '@vueuse/core'
import { ref, type Ref } from 'vue'
import type { Exercise } from '@/models/Exercise'
import type { ExerciseRecord } from '@/models/ExerciseRecord'

/**
 * @example
 * Script: const exerciseRecord: Ref<ExerciseRecord> = ref(...)
 * Template: <ExerciseSetsInput :exercise="exercise" :exerciseRecord="exerciseRecord" @update:exerciseRecord="exerciseRecord = $event" />
 */

const props = defineProps<{
  exercise: Exercise | null
  exerciseRecord: ExerciseRecord | null
}>()

const emits = defineEmits<{
  (event: 'update:exerciseRecord', exerciseRecord: ExerciseRecord): void
}>()

const exerciseRecord = useVModel(props, 'exerciseRecord', emits)

const weight: Ref<number | null> = ref(null)
const reps: Ref<number | null> = ref(null)
const distance: Ref<number | null> = ref(null)
const duration: Ref<number | null> = ref(null)

// const exerciseSets: Ref<ExerciseSet[]> = ref([])

function updateSet(index: number) {
  props.exerciseRecord?.updateSetByIndex(index, {
    weight: weight.value,
    reps: reps.value,
    distance: distance.value,
    duration: duration.value,
  })
}
</script>

<template>
  <div v-if="exercise?.getTrackMultipleSets()">
    <QBtn label="Add Set" color="positive" @click="exerciseRecord?.addNewSet()" />
    <QBtn label="Remove Set" color="negative" @click="exerciseRecord?.removeLastSet()" />
  </div>

  <div v-for="(set, i) in exerciseRecord?.getSets()" :key="i">
    <QInput
      v-if="exercise?.getTrackWeight()"
      v-model.number="weight"
      label="Weight"
      type="number"
      dense
      outlined
      color="primary"
      style="max-width: 120px"
      @blur="updateSet(i)"
    >
      <template v-slot:prepend>
        <QIcon name="event" />
      </template>
    </QInput>
    <QInput
      v-if="exercise?.getTrackReps()"
      v-model.number="reps"
      label="Reps"
      type="number"
      dense
      outlined
      color="primary"
      style="max-width: 120px"
      @blur="updateSet(i)"
    >
      <template v-slot:prepend>
        <QIcon name="event" />
      </template>
    </QInput>
    <QInput
      v-if="exercise?.getTrackDuration()"
      v-model.number="distance"
      label="Duration"
      type="number"
      dense
      outlined
      color="primary"
      style="max-width: 120px"
      @blur="updateSet(i)"
    >
      <template v-slot:prepend>
        <QIcon name="event" />
      </template>
    </QInput>
    <QInput
      v-if="exercise?.getTrackDistance()"
      v-model.number="duration"
      label="Distance"
      type="number"
      dense
      outlined
      color="primary"
      style="max-width: 120px"
      @blur="updateSet(i)"
    >
      <template v-slot:prepend>
        <QIcon name="event" />
      </template>
    </QInput>
  </div>
</template>
