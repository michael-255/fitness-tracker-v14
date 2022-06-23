<script setup lang="ts">
import { QBtn } from 'quasar'
import { Measurement } from '@/models/Measurement'
import IdInput from '@/components/shared/IdInput.vue'
import CreatedAtInput from '@/components/shared/CreatedAtInput.vue'
import NameInput from '@/components/shared/NameInput.vue'
import DescriptionInput from '@/components/shared/DescriptionInput.vue'
import NoteInput from '@/components/shared/NoteInput.vue'
import StatusInput from '@/components/shared/StatusInput.vue'
import TrackBooleanInput from '@/components/shared/TrackBooleanInput.vue'
import { ref, type Ref } from 'vue'
import { Status } from '@/constants/enums'
import { createId } from '@/utils/build-id'
import type { Description, Id, Name, Note } from '@/constants/types'

const id: Ref<Id> = ref(createId())
const name: Ref<Name> = ref('Activity')
const description: Ref<Description> = ref('')
const note: Ref<Note> = ref('')
const status: Ref<Status> = ref(Status.ENABLED)

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
</script>

<template>
  <h3>Dashboard</h3>

  <QBtn color="primary" label="Print" @click="sayit()" />

  <IdInput :id="id" @update:id="id = $event" />
  <CreatedAtInput />
  <NameInput :name="name" @update:name="name = $event" />
  <DescriptionInput :description="description" @update:description="description = $event" />
  <NoteInput :note="note" @update:note="note = $event" />
  <StatusInput :status="status" @update:status="status = $event" />
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
