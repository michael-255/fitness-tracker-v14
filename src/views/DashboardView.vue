<script setup lang="ts">
import { QSeparator, QBtn } from 'quasar'
import IdInput from '@/components/inputs/IdInput.vue'
import DateInput from '@/components/inputs/DateInput.vue'
import NameInput from '@/components/inputs/NameInput.vue'
import TextAreaInput from '@/components/inputs/TextAreaInput.vue'
import StatusSelect from '@/components/inputs/StatusSelect.vue'
import ParentSelect from '@/components/inputs/ParentSelect.vue'
import BooleanToggle from '@/components/inputs/BooleanToggle.vue'
import { ref, type Ref } from 'vue'
import { v4 as createId } from 'uuid'
import { ActivityStatus, DBTable, Icon } from '@/constants/enums'
import type { Nullable } from '@/constants/globals'
import { useQuasar } from 'quasar'
import { useNotify } from '@/use/useNotify'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'

const $q = useQuasar()

const { notify } = useNotify($q)
const { confirmDialog } = useSimpleDialogs($q)

function confirmDialogTest(id: string) {
  confirmDialog(`Delete`, `Permanetly delete '${id}' from the database?`, () => {
    console.log('Database call goes here...')
    notify(`Deleted Measurement Record '${id}'`, Icon.DELETE)
  })
}

//
// Refs for the various test inputs (Measurements)
//
const id: Ref<string> = ref(createId())
const createdAt: Ref<string> = ref('')
const finishedAt: Ref<Nullable<string>> = ref(null)
const name: Ref<string> = ref('My Measurement')
const description: Ref<Nullable<string>> = ref(null)
const note: Ref<Nullable<string>> = ref(null)
const status: Ref<ActivityStatus> = ref(ActivityStatus.ENABLED)
const parentId: Ref<string> = ref('')
const trackLbs: Ref<boolean> = ref(false)
const trackInches: Ref<boolean> = ref(false)
const trackFeet: Ref<boolean> = ref(false)
const trackPercent: Ref<boolean> = ref(false)

async function test() {
  console.log('id ==', id.value)
  console.log('createdAt ==', createdAt.value)
  console.log('finishedAt ==', finishedAt.value)
  console.log('name ==', name.value)
  console.log('description ==', description.value)
  console.log('note ==', note.value)
  console.log('status ==', status.value)
  console.log('parentId ==', parentId.value)
  console.log('trackLbs ==', trackLbs.value)
  console.log('trackInches ==', trackInches.value)
  console.log('trackFeet ==', trackFeet.value)
  console.log('trackPercent ==', trackPercent.value)
}
</script>

<template>
  <h3>Dashboard</h3>

  <!-- Test Buttons -->
  <div class="q-my-sm">
    <QSeparator />
    <span>Testing:</span>
    <QBtn color="primary" label="Print" class="q-ma-sm" @click="test()" />
    <QBtn
      color="primary"
      label="Dialog"
      class="q-ma-sm"
      @click="confirmDialogTest('aed890f6-5445-436e-b8ec-3a93d89ba366')"
    />
    <QSeparator />
  </div>

  <!-- Input Testing -->
  <IdInput :id="id" @update:id="id = $event" />
  <DateInput :date="createdAt" label="Created At" @update:date="createdAt = $event" />
  <DateInput :date="finishedAt" label="Finished At" @update:date="finishedAt = $event" />
  <NameInput :name="name" @update:name="name = $event" />
  <TextAreaInput :text="description" label="Description" @update:text="description = $event" />
  <TextAreaInput :text="note" label="Note" @update:text="note = $event" />
  <StatusSelect :status="status" type="ActivityStatus" @update:status="status = $event" />
  <ParentSelect
    :parentId="parentId"
    :table="DBTable.MEASUREMENTS"
    @update:parentId="parentId = $event"
  />
  <BooleanToggle :bool="trackLbs" label="Track Lbs" @update:bool="trackLbs = $event" />
  <BooleanToggle :bool="trackInches" label="Track Inches" @update:bool="trackInches = $event" />
  <BooleanToggle :bool="trackFeet" label="Track Feet" @update:bool="trackFeet = $event" />
  <BooleanToggle
    :bool="trackPercent"
    label="Track Percentage Value"
    @update:bool="trackPercent = $event"
  />
</template>
