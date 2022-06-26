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
import { ref, type Ref } from 'vue'
import { createId } from '@/utils/build-id'
import type {
  Id,
  CreatedAt,
  FinishedAt,
  ActivityName,
  TextBlock,
  TrackBoolean,
} from '@/constants/types'
import { useLuxon } from '@/use/useLuxon'
import { DBTable } from '@/constants/enums'

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
const bool1: Ref<TrackBoolean> = ref(false)
const bool2: Ref<TrackBoolean> = ref(false)

async function test() {
  console.log(id.value)
  console.log(createdAt.value)
  console.log(finishedAt.value)
  console.log(name.value)
  console.log(description.value)
  console.log(note.value)
  console.log(parentId.value)
  console.log(exerciseIds.value)
  console.log(bool1.value)
  console.log(bool2.value)
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
  <TrackBooleanInput :bool="bool1" label="Track Multiple Sets" @update:bool="bool1 = $event" />
  <TrackBooleanInput :bool="bool2" label="Track Lbs" @update:bool="bool2 = $event" />
</template>
