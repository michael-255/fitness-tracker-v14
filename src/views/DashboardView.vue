<script setup lang="ts">
import { QBtn } from 'quasar'
import IdInput from '@/components/shared/IdInput.vue'
import CreatedAtInput from '@/components/shared/CreatedAtInput.vue'
import FinishedAtInput from '@/components/shared/FinishedAtInput.vue'
import NameInput from '@/components/shared/NameInput.vue'
import TextBlockInput from '@/components/shared/TextBlockInput.vue'
import ParentIdInput from '@/components/shared/ParentIdInput.vue'
import ExerciseIdsInput from '@/components/shared/ExerciseIdsInput.vue'
import ExerciseRecordIdsInput from '@/components/shared/ExerciseRecordIdsInput.vue'
import TrackBooleanInput from '@/components/shared/TrackBooleanInput.vue'
import ExerciseSetsInput from '@/components/shared/ExerciseSetsInput.vue'
import { ref, type Ref } from 'vue'
import { v4 as createId } from 'uuid'
import type {
  Id,
  CreatedAt,
  FinishedAt,
  ActivityName,
  TextBlock,
  TrackBoolean,
  ExerciseSet,
} from '@/constants/types'
import { useLuxon } from '@/use/useLuxon'
import { DBTable } from '@/constants/enums'
import { database } from '@/services/LocalDatabase'
import type { Workout } from '@/models/Workout'

const { dateISOToDisplay } = useLuxon()

const id: Ref<Id> = ref(createId())
const createdAt: Ref<CreatedAt> = ref(dateISOToDisplay(new Date().toISOString()))
const finishedAt: Ref<FinishedAt> = ref('')
const name: Ref<ActivityName> = ref('My Activity')
const description: Ref<TextBlock> = ref(null)
const note: Ref<TextBlock> = ref(null)
const parentId: Ref<Id> = ref('')
const exerciseIds: Ref<Id[]> = ref([])
const exerciseRecordIds: Ref<Id[]> = ref([])

const trackMultipleSets: Ref<TrackBoolean> = ref(false)
const trackDuration: Ref<TrackBoolean> = ref(false)
const trackDistance: Ref<TrackBoolean> = ref(false)
const trackWeight: Ref<TrackBoolean> = ref(false)
const trackReps: Ref<TrackBoolean> = ref(false)

const exerciseSets: Ref<ExerciseSet[]> = ref([])

async function test() {
  const res = await database.updateById(DBTable.WORKOUTS, 'test-1234', null)
  console.log('RESPONSE:', res)

  console.log(id.value)
  console.log(createdAt.value)
  console.log(finishedAt.value)
  console.log(name.value)
  console.log(description.value)
  console.log(note.value)
  console.log(parentId.value)
  console.log(exerciseIds.value)
  console.log(trackMultipleSets.value)
  console.log(trackDuration.value)
  console.log(trackWeight.value)
  console.log(trackReps.value)
  console.log(exerciseSets.value)
}
</script>

<template>
  <h3>Dashboard</h3>

  <QBtn color="primary" label="Print" @click="test()" />

  <IdInput :id="id" @update:id="id = $event" />
  <CreatedAtInput :createdAt="createdAt" @update:createdAt="createdAt = $event" />
  <FinishedAtInput :finishedAt="finishedAt" @update:finishedAt="finishedAt = $event" />
  <NameInput :name="name" @update:name="name = $event" />
  <TextBlockInput :text="description" label="Description" @update:text="description = $event" />
  <TextBlockInput :text="note" label="Note" @update:text="note = $event" />
  <ParentIdInput
    :parentId="parentId"
    :table="DBTable.MEASUREMENTS"
    @update:parentId="parentId = $event"
  />
  <ExerciseIdsInput :exerciseIds="exerciseIds" @update:exerciseIds="exerciseIds = $event" />
  <ExerciseRecordIdsInput
    :exerciseRecordIds="exerciseRecordIds"
    @update:exerciseRecordIds="exerciseRecordIds = $event"
  />

  <TrackBooleanInput
    :bool="trackMultipleSets"
    label="Multiple Sets"
    @update:bool="trackMultipleSets = $event"
  />
  <TrackBooleanInput :bool="trackDuration" label="Duration" @update:bool="trackDuration = $event" />
  <TrackBooleanInput :bool="trackDistance" label="Distance" @update:bool="trackDistance = $event" />
  <TrackBooleanInput :bool="trackWeight" label="Weight (lbs)" @update:bool="trackWeight = $event" />
  <TrackBooleanInput :bool="trackReps" label="Reps" @update:bool="trackReps = $event" />

  <ExerciseSetsInput
    :exerciseSets="exerciseSets"
    :trackMultipleSets="trackMultipleSets"
    :trackDuration="trackDuration"
    :trackDistance="trackDistance"
    :trackWeight="trackWeight"
    :trackReps="trackReps"
    @update:exerciseSets="exerciseSets = $event"
  />
</template>
