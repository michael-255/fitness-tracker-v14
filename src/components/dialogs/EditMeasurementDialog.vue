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
import { onMounted } from 'vue'
import { useMeasurementRefs } from '@/use/useMeasurementRefs'

const $q = useQuasar()
const { notify } = useNotify($q)
const { confirmDialog, dismissDialog } = useSimpleDialogs($q)
const { log } = useLogger()

const props = defineProps<{
  editId: string
  dialog: boolean
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
  status,
  trackLbs,
  trackInches,
  trackFeet,
  trackPercent,
  areMeasurementRefsValid,
  loadRefDataById,
} = useMeasurementRefs()

onMounted(async () => {
  console.log('Mounted Dialog')
  // await loadRefDataById(props.editId)
})

async function saveAction(): Promise<void> {
  if (!areMeasurementRefsValid()) {
    dismissDialog(
      'Validation Failed',
      'Please ensure all form entires are completed with valid information.'
    )
  } else {
    confirmDialog(`Save`, `Would you like to update this Measurement?`, async () => {
      await database.add(
        DBTable.MEASUREMENTS,
        new Measurement({
          id: id.value,
          createdAt: createdAt.value,
          name: name.value,
          description: description.value,
          status: status.value,
          trackLbs: trackLbs.value,
          trackInches: trackInches.value,
          trackFeet: trackFeet.value,
          trackPercent: trackPercent.value,
        })
      )
      notify('Measurement Updated', Icon.MEASUREMENTS)
      dialog.value = false
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

      <QCardSection class="q-table__title text-weight-bold">Measurement</QCardSection>

      <QCardSection>
        <IdInput :id="id" @update:id="id = $event" />
        <DateInput :date="createdAt" label="Created At" @update:date="createdAt = $event" />
        <NameInput :name="name" @update:name="name = $event" />
        <TextAreaInput
          :text="description"
          label="Description"
          @update:text="description = $event"
        />
        <StatusSelect :status="status" type="ActivityStatus" @update:status="status = $event" />
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
      </QCardSection>
    </QCard>
  </QDialog>
</template>
