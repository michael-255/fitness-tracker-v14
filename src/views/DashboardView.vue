<script setup lang="ts">
import { QSeparator, QBtn } from 'quasar'
import { ref, type Ref } from 'vue'
import { ActivityStatus, DBTable } from '@/constants/enums'
import IdInput from '@/components/inputs/IdInput.vue'
import DateInput from '@/components/inputs/DateInput.vue'
import NameInput from '@/components/inputs/NameInput.vue'
import TextAreaInput from '@/components/inputs/TextAreaInput.vue'
import EnumSelect from '@/components/inputs/EnumSelect.vue'
import ParentSelect from '@/components/inputs/ParentSelect.vue'

//
// Refs for the various test inputs (Measurements)
//
const id: Ref<string> = ref('')
const createdAt: Ref<string> = ref('')
const finishedAt: Ref<string> = ref('')
const name: Ref<string> = ref('')
const description: Ref<string> = ref('')
const note: Ref<string> = ref('')
const value: Ref<ActivityStatus> = ref(ActivityStatus.ENABLED)
const parentId: Ref<string> = ref('')

async function test() {
  console.log('id ==', id.value)
  console.log('createdAt ==', createdAt.value)
  console.log('finishedAt ==', finishedAt.value)
  console.log('name ==', name.value)
  console.log('description ==', description.value)
  console.log('note ==', note.value)
  console.log('value ==', value.value)
  console.log('parentId ==', parentId.value)
}
</script>

<template>
  <h3>Dashboard</h3>

  <!-- Test Buttons -->
  <div class="q-my-sm">
    <QSeparator />
    <span>Testing:</span>
    <QBtn color="primary" label="Print" class="q-ma-sm" @click="test()" />
    <QSeparator />
  </div>

  <!-- Input Testing -->
  <IdInput :id="id" @update:id="id = $event" />
  <DateInput :date="createdAt" label="Created At" @update:date="createdAt = $event" />
  <DateInput :date="finishedAt" label="Finished At" @update:date="finishedAt = $event" />
  <NameInput :name="name" @update:name="name = $event" />
  <TextAreaInput :text="description" label="Description" @update:text="description = $event" />
  <TextAreaInput :text="note" label="Note" @update:text="note = $event" />
  <EnumSelect label="Activity Status" :value="value" @update:value="value = $event" />
  <ParentSelect
    :parentId="parentId"
    :table="DBTable.MEASUREMENTS"
    @update:parentId="parentId = $event"
  />
</template>
