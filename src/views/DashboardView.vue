<script setup lang="ts">
import { QSeparator, QBtn } from 'quasar'
import IdInput from '@/components/inputs/IdInput.vue'
import DateInput from '@/components/inputs/DateInput.vue'
import NameInput from '@/components/inputs/NameInput.vue'
import TextBlockInput from '@/components/inputs/TextBlockInput.vue'
import ParentIdInput from '@/components/inputs/ParentIdInput.vue'
import ExerciseIdsInput from '@/components/inputs/ExerciseIdsInput.vue'
import ExerciseRecordIdsInput from '@/components/inputs/ExerciseRecordIdsInput.vue'
import TrackBooleanInput from '@/components/inputs/TrackBooleanInput.vue'
import ExerciseSetsInput from '@/components/inputs/ExerciseSetsInput.vue'
import { onMounted, ref, type Ref } from 'vue'
import { v4 as createId } from 'uuid'
import { useLuxon } from '@/use/useLuxon'
import { DBTable } from '@/constants/enums'
import { Exercise } from '@/models/Exercise'
import { ExerciseRecord } from '@/models/ExerciseRecord'
import type { Nullable } from '@/constants/globals'
import { useQuasar } from 'quasar'
import type { ExerciseSet } from '@/models/ExerciseSet'

const $q = useQuasar()
const { dateISOToDisplay } = useLuxon()

function confirmDialog() {
  $q.dialog({
    title: 'Confirm',
    message: 'Would you like to confirm?',
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      console.log('OK')
      showNotification()
    })
    .onCancel(() => {
      console.log('Cancel')
    })
}

function showNotification() {
  $q.notify({
    color: 'negative',
    textColor: 'white',
    icon: 'event',
    message: 'You have confirmed the operation. Good job!',
    caption: `${new Date()}`,
    actions: [
      {
        label: 'Dismiss',
        color: 'white',
      },
    ],
  })
}

// const exercise: Ref<Exercise | null> = ref(null)
// const exerciseRecord: Ref<ExerciseRecord | null> = ref(null)

const id: Ref<string> = ref(createId())
const createdAt: Ref<string> = ref('')
const finishedAt: Ref<Nullable<string>> = ref(null)
// const name: Ref<string> = ref('My Activity')
// const description: Ref<Nullable<string>> = ref(null)
// const note: Ref<Nullable<string>> = ref(null)
// const parentId: Ref<string> = ref('')
// const exerciseIds: Ref<string[]> = ref([])
// const exerciseRecordIds: Ref<string[]> = ref([])

// const trackMultipleSets: Ref<boolean> = ref(false)
// const trackDuration: Ref<boolean> = ref(false)
// const trackDistance: Ref<boolean> = ref(false)
// const trackWeight: Ref<boolean> = ref(false)
// const trackReps: Ref<boolean> = ref(false)

// const exerciseSets: Ref<ExerciseSet[]> = ref([])

// onMounted(async () => {
//   exercise.value = new Exercise({
//     id: 'test-1234',
//     trackMultipleSets: true,
//     trackWeight: true,
//     trackReps: true,
//     trackDistance: true,
//     trackDuration: true,
//   })
//   exerciseRecord.value = new ExerciseRecord({
//     parentId: 'test-1234',
//   })
// })

async function test() {
  console.log(id.value)
  console.log(createdAt.value)
  console.log(finishedAt.value)
  // console.log(name.value)
  // console.log(description.value)
  // console.log(note.value)
  // console.log(parentId.value)
  // console.log(exerciseIds.value)
  // console.log(trackMultipleSets.value)
  // console.log(trackDuration.value)
  // console.log(trackWeight.value)
  // console.log(trackReps.value)
  // console.log(exerciseSets.value)
}
</script>

<template>
  <h3>Dashboard</h3>

  <!-- Test Buttons -->
  <div class="q-my-sm">
    <QSeparator />
    <QBtn color="primary" label="Print" class="q-ma-sm" @click="test()" />
    <QBtn color="primary" label="Dialog" class="q-ma-sm" @click="confirmDialog()" />
    <QSeparator />
  </div>

  <!-- Input Testing -->

  <IdInput :id="id" @update:id="id = $event" />

  <DateInput :date="createdAt" label="Created At" @update:date="createdAt = $event" />

  <DateInput :date="finishedAt" label="Finished At" @update:date="finishedAt = $event" />

  <!-- <NameInput :name="name" @update:name="name = $event" /> -->

  <!-- <TextBlockInput :text="description" label="Description" @update:text="description = $event" /> -->

  <!-- <TextBlockInput :text="note" label="Note" @update:text="note = $event" /> -->

  <!-- <ParentIdInput
    :parentId="parentId"
    :table="DBTable.MEASUREMENTS"
    @update:parentId="parentId = $event"
  /> -->

  <!-- <ExerciseIdsInput :exerciseIds="exerciseIds" @update:exerciseIds="exerciseIds = $event" /> -->

  <!-- <ExerciseRecordIdsInput
    :exerciseRecordIds="exerciseRecordIds"
    @update:exerciseRecordIds="exerciseRecordIds = $event"
  /> -->

  <!-- <TrackBooleanInput
    :bool="trackMultipleSets"
    label="Multiple Sets"
    @update:bool="trackMultipleSets = $event"
  /> -->

  <!-- <TrackBooleanInput :bool="trackDuration" label="Duration" @update:bool="trackDuration = $event" /> -->

  <!-- <TrackBooleanInput :bool="trackDistance" label="Distance" @update:bool="trackDistance = $event" /> -->

  <!-- <TrackBooleanInput :bool="trackWeight" label="Weight (lbs)" @update:bool="trackWeight = $event" /> -->

  <!-- <TrackBooleanInput :bool="trackReps" label="Reps" @update:bool="trackReps = $event" /> -->

  <!-- <ExerciseSetsInput
    :exercise="exercise"
    :exerciseRecord="exerciseRecord"
    @update:exerciseRecord="exerciseRecord = $event"
  /> -->
</template>
