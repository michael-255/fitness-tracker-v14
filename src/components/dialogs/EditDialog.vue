<script setup lang="ts">
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { DBTable, Icon } from '@/constants/enums'
import { useVModel } from '@vueuse/core'
import { useQuasar } from 'quasar'
import { useNotify } from '@/use/useNotify'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { useLogger } from '@/use/useLogger'
import IdInput from '@/components/inputs/IdInput.vue'
import DateInput from '@/components/inputs/DateInput.vue'
import NameInput from '@/components/inputs/NameInput.vue'
import TextAreaInput from '@/components/inputs/TextAreaInput.vue'
import StatusSelect from '@/components/inputs/StatusSelect.vue'
import BooleanToggle from '@/components/inputs/BooleanToggle.vue'
import { database } from '@/services/LocalDatabase'
import { Measurement } from '@/models/Measurement'
import { useTableType } from '@/use/useTableType'
import { useInputRefs } from '@/use/useInputRefs'
import { onMounted } from 'vue'

const $q = useQuasar()
const { notify } = useNotify($q)
const { confirmDialog, dismissDialog } = useSimpleDialogs($q)
const { log } = useLogger()
const { getTableTypeLabel, isActivityTable } = useTableType()

const props = defineProps<{
  table: DBTable
  dialog: boolean
  editId: string
}>()

const emits = defineEmits<{
  (event: 'update:dialog', bool: boolean): void
}>()

const dialog = useVModel(props, 'dialog', emits)
const {
  id,
  createdAt,
  name,
  description,
  activityStatus,
  trackLbs,
  trackInches,
  trackFeet,
  trackPercent,
  loadIdItem,
  resetInputRefs,
  areInputRefsValid,
} = useInputRefs(props.table, '577462c9-f931-4b34-b228-d886e32ad1c3')

onMounted(async () => {
  await loadIdItem()
})

async function saveAction(): Promise<void> {
  if (!areInputRefsValid()) {
    dismissDialog(
      'Validation Failed',
      'Please ensure all form entires are completed with valid information.'
    )
  } else {
    confirmDialog(`Save`, `Would you like to save these changes?`, async () => {
      switch (props.table) {
        case DBTable.MEASUREMENTS:
          await database.add(
            props.table,
            new Measurement({
              id: id.value,
              createdAt: createdAt.value,
              name: name.value,
              description: description.value,
              status: activityStatus.value,
              trackLbs: trackLbs.value,
              trackInches: trackInches.value,
              trackFeet: trackFeet.value,
              trackPercent: trackPercent.value,
            })
          )
          notify('Measurement Updated', Icon.MEASUREMENTS)
          break
        case DBTable.MEASUREMENT_RECORDS:
          // create item
          // notify
          break
      }

      dialog.value = false
      resetInputRefs()
    })
  }
}
</script>

<template>
  <QDialog
    v-model="dialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <QCard>
      <QCardActions class="bg-primary text-white">
        <div class="q-table__title text-weight-bold">Edit</div>
        <QSpace />
        <QBtn outline :icon="Icon.SAVE" label="Save" @click="saveAction()" />
        <QBtn outline :icon="Icon.CLOSE" label="Close" v-close-popup />
      </QCardActions>

      <QCardSection class="q-table__title text-weight-bold">
        {{ getTableTypeLabel(table) }}
      </QCardSection>

      <QCardSection>
        <!-- Entity Fields -->
        <IdInput :id="id" @update:id="id = $event" />
        <DateInput :date="createdAt" label="Created At" @update:date="createdAt = $event" />

        <!-- Activity Fields -->
        <div v-if="isActivityTable(table)">
          <NameInput :name="name" @update:name="name = $event" />
          <TextAreaInput
            :text="description"
            label="Description"
            @update:text="description = $event"
          />
          <StatusSelect
            :status="activityStatus"
            type="ActivityStatus"
            @update:status="activityStatus = $event"
          />
        </div>

        <!-- Measurement Fields -->
        <div v-if="table === DBTable.MEASUREMENTS">
          <BooleanToggle :bool="trackLbs" label="Track Lbs" @update:bool="trackLbs = $event" />
          <BooleanToggle
            :bool="trackInches"
            label="Track Inches"
            @update:bool="trackInches = $event"
          />
          <BooleanToggle :bool="trackFeet" label="Track Feet" @update:bool="trackFeet = $event" />
          <BooleanToggle
            :bool="trackPercent"
            label="Track Percentage Value"
            @update:bool="trackPercent = $event"
          />
        </div>
      </QCardSection>
    </QCard>
  </QDialog>
</template>
