<script setup lang="ts">
import { QBtn } from 'quasar'
import { Measurement } from '@/models/Measurement'
import IdInput from '@/components/shared/IdInput.vue'
import CreatedAtInput from '@/components/shared/CreatedAtInput.vue'
import NameInput from '@/components/shared/NameInput.vue'
import DescriptionInput from '@/components/shared/DescriptionInput.vue'
import NoteInput from '@/components/shared/NoteInput.vue'
import ParentIdInput from '@/components/shared/ParentIdInput.vue'
import TrackBooleanInput from '@/components/shared/TrackBooleanInput.vue'
import { DBTable } from '@/constants/enums'
import { ref, type Ref } from 'vue'
import { createId } from '@/utils/build-id'
import type { TextBlock, Id, ActivityName } from '@/constants/types'
import { database } from '@/services/LocalDatabase'

const id: Ref<Id> = ref(createId())
const name: Ref<ActivityName> = ref('Activity')
const description: Ref<TextBlock> = ref('')
const note: Ref<TextBlock> = ref('')
const parentId: Ref<Id> = ref('')

/**
 * @todo
 * These should be compared as part of a test, but not break the component
 * Ensure they are the same length
 * Ensure they have the exact same keys
 *
 * Might want to make an Input component for each key?
 */
const measurementKeys = Measurement.keys()
const inputKeys = [
  'id',
  'createdAt',
  'name',
  'description',
  'status',
  'trackLbs',
  'trackInches',
  'trackFeet',
  'trackPercent',
]

function sayit() {
  console.log(id.value)
}

async function addToDB() {
  const obj = {
    test: '123',
    id: 'test6',
    // createdAt: new Date().toISOString(),
    // name: 'test',
  }

  await database.add(DBTable.MEASUREMENTS, obj)
  await database.add(DBTable.MEASUREMENT_RECORDS, obj)
}
</script>

<template>
  <h3>Dashboard</h3>

  <QBtn color="primary" label="Print" @click="addToDB()" />

  <IdInput :id="id" @update:id="id = $event" />
  <CreatedAtInput />
  <NameInput :name="name" @update:name="name = $event" />
  <DescriptionInput :description="description" @update:description="description = $event" />
  <NoteInput :note="note" @update:note="note = $event" />
  <ParentIdInput
    :parentId="parentId"
    :table="DBTable.MEASUREMENTS"
    @update:parentId="parentId = $event"
  />
  <TrackBooleanInput />

  <h5>Measurement: {{ inputKeys.length }}</h5>

  <div v-for="(value, index) in measurementKeys" :key="index">
    <div v-if="value == 'id'">Key: {{ value }}</div>
    <div v-if="value == 'createdAt'">Key: {{ value }}</div>
    <div v-if="value == 'name'">Key: {{ value }}</div>
    <div v-if="value == 'description'">Key: {{ value }}</div>
    <div v-if="value == 'status'">Key: {{ value }}</div>
    <div v-if="value == 'trackLbs'">Key: {{ value }}</div>
    <div v-if="value == 'trackInches'">Key: {{ value }}</div>
    <div v-if="value == 'trackFeet'">Key: {{ value }}</div>
    <div v-if="value == 'trackPercent'">Key: {{ value }}</div>
  </div>
</template>
