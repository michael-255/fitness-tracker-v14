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
</script>

<template>
  <div v-if="trackMultipleSets">trackMultipleSets</div>
  <div v-if="trackDuration">trackDuration</div>
  <div v-if="trackDistance">trackDistance</div>
  <div v-if="trackWeight">trackWeight</div>
  <div v-if="trackReps">trackReps</div>
  <!-- <QInput
    v-model="exerciseSets"
    label="Id"
    :rules="[
      (val: string) => isIdValid(val) || ValidationMessage.ID,
    ]"
    :maxlength="ValidationLimit.ID"
    dense
    outlined
    color="primary"
  >
    <template v-slot:after>
      <QBtn icon="autorenew" color="primary" class="q-ml-xs q-px-sm" @click="id = createId()" />
    </template>
  </QInput> -->
</template>
