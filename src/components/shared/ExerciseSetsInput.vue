<script setup lang="ts">
import { QBtn, QInput, QIcon } from 'quasar'
import type { ExerciseSet, TrackBoolean } from '@/constants/types'
import { useVModel } from '@vueuse/core'
import { ref, type Ref } from 'vue'

/**
 * @example
 * Script: const exerciseSets: Ref<ExerciseSet[]> = ref([])
 * Template: <ExerciseSetsInput :exerciseSets="exerciseSets" @update:exerciseSets="exerciseSets = $event" />
 */

const props = defineProps<{
  exerciseSets: ExerciseSet[]
  trackMultipleSets: TrackBoolean
  trackDuration: TrackBoolean
  trackDistance: TrackBoolean
  trackWeight: TrackBoolean
  trackReps: TrackBoolean
}>()

const emits = defineEmits<{
  (eventName: 'update:exerciseSets', exerciseSets: ExerciseSet[]): void
}>()

const exerciseSets = useVModel(props, 'exerciseSets', emits)

function addSet() {
  exerciseSets.value.push({
    weight: null,
    reps: null,
    distance: null,
    duration: null,
  } as ExerciseSet)
}

function removeSet() {
  if (exerciseSets.value.length) {
    exerciseSets.value.pop()
  }
}

/**
 * @todo
 * - Booleans control what shows up and if you can add sets
 * - May have to create refs in an array if you add sets
 * - Build an ExerciseSetItemInput.vue component
 * - Figure out how to organize the inputs in the layout
 */

const text: Ref<number> = ref(0)
</script>

<template>
  <QBtn v-if="trackMultipleSets" label="Add Set" color="positive" @click="addSet()" />
  <QBtn v-if="trackMultipleSets" label="Remove Set" color="negative" @click="removeSet()" />

  <div v-for="(set, i) in props.exerciseSets" :key="i">
    <QInput
      v-if="trackDuration"
      v-model.number="text"
      label="Duration"
      type="number"
      dense
      outlined
      color="primary"
      style="max-width: 120px"
    >
      <template v-slot:prepend>
        <QIcon name="event" />
      </template>
    </QInput>
    <QInput
      v-if="trackDistance"
      v-model.number="text"
      label="Distance"
      type="number"
      dense
      outlined
      color="primary"
      style="max-width: 120px"
    >
      <template v-slot:prepend>
        <QIcon name="event" />
      </template>
    </QInput>
    <QInput
      v-if="trackWeight"
      v-model.number="text"
      label="Weight"
      type="number"
      dense
      outlined
      color="primary"
      style="max-width: 120px"
    >
      <template v-slot:prepend>
        <QIcon name="event" />
      </template>
    </QInput>
    <QInput
      v-if="trackReps"
      v-model.number="text"
      label="Reps"
      type="number"
      dense
      outlined
      color="primary"
      style="max-width: 120px"
    >
      <template v-slot:prepend>
        <QIcon name="event" />
      </template>
    </QInput>
  </div>
</template>
