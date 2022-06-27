<script setup lang="ts">
import type { ExerciseSet, TrackBoolean } from '@/constants/types'
import { useVModel } from '@vueuse/core'

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

/**
 * @todo
 * Booleans control what shows up and if you can add sets!
 */
</script>

<template>
  <div v-if="trackMultipleSets">trackMultipleSets</div>
  <div v-if="trackDuration">trackDuration</div>
  <div v-if="trackDistance">trackDistance</div>
  <div v-if="trackWeight">trackWeight</div>
  <div v-if="trackReps">trackReps</div>
</template>
