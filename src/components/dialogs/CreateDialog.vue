<script setup lang="ts">
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { type Ref, ref } from 'vue'
import { ActivityStatus, DBTable, Icon } from '@/constants/enums'
import { useVModel } from '@vueuse/core'
import { useQuasar } from 'quasar'
import { useConfirmDialog } from '@/use/useConfirmDialog'
import IdInput from '@/components/inputs/IdInput.vue'
import DateInput from '@/components/inputs/DateInput.vue'
import NameInput from '@/components/inputs/NameInput.vue'
import TextAreaInput from '@/components/inputs/TextAreaInput.vue'
import StatusSelect from '@/components/inputs/StatusSelect.vue'
import BooleanToggle from '@/components/inputs/BooleanToggle.vue'
import type { Nullable } from '@/constants/globals'
import {
  isShortTextValid,
  isRequiredDateValid,
  isLongTextValid,
  isRequired,
} from '@/utils/validators'

const $q = useQuasar()
// const { notify } = useNotify($q)
const { confirmDialog } = useConfirmDialog($q)

const props = defineProps<{
  table: DBTable
  dialog: boolean
}>()

const emits = defineEmits<{
  (event: 'update:dialog', bool: boolean): void
}>()

const dialog = useVModel(props, 'dialog', emits)

// Entity Refs
const id: Ref<string> = ref('')
const createdAt: Ref<string> = ref('')
// Activity Refs
const name: Ref<string> = ref('')
const description: Ref<Nullable<string>> = ref(null)
const status: Ref<ActivityStatus> = ref(ActivityStatus.ENABLED)
// Measurement Refs
const trackLbs: Ref<boolean> = ref(false)
const trackInches: Ref<boolean> = ref(false)
const trackFeet: Ref<boolean> = ref(false)
const trackPercent: Ref<boolean> = ref(false)

function isActivity() {
  return (
    props.table === DBTable.MEASUREMENTS ||
    props.table === DBTable.EXERCISES ||
    props.table === DBTable.WORKOUTS
  )
}

function creationType(): string {
  switch (props.table) {
    case DBTable.MEASUREMENTS:
      return 'Measurement'
    case DBTable.MEASUREMENT_RECORDS:
      return 'Measurement Record'
    default:
      return ''
  }
}

function resetRefs(): void {
  // Entity Refs
  id.value = ''
  createdAt.value = ''
  // Activity Refs
  name.value = ''
  description.value = null
  status.value = ActivityStatus.ENABLED
  // Measurement Refs
  trackLbs.value = false
  trackInches.value = false
  trackFeet.value = false
  trackPercent.value = false
}

function validateRefs(): boolean {
  let areEntityRefsValid = true
  let areActivityRefsValid = true

  // Entity Refs
  const isIdValid = isShortTextValid(id.value)
  const isCreatedAtValid = isRequiredDateValid(createdAt.value) //new Date(createdAt.value).toISOString()
  areEntityRefsValid = isIdValid && isCreatedAtValid

  console.log(isIdValid)
  console.log(isCreatedAtValid)

  // Activity Refs
  if (isActivity()) {
    const isNameValid = isShortTextValid(name.value)
    const isDescriptionValid = isLongTextValid(description.value)
    const isStatusValid = isRequired(status.value)
    areActivityRefsValid = isNameValid && isDescriptionValid && isStatusValid

    console.log(isNameValid)
    console.log(isDescriptionValid)
    console.log(isStatusValid)
  }

  return areEntityRefsValid && areActivityRefsValid
}

/**
 * @todo How do I check the validation status of the inputs?
 */
function saveAction(): void {
  if (validateRefs()) {
    console.log('Saving...')
    dialog.value = false
    resetRefs()
  } else {
    console.log('Validation failed...')
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
        <div class="q-table__title text-weight-bold">Create</div>
        <QSpace />
        <QBtn outline :icon="Icon.SAVE" label="Save" @click="saveAction()" />
        <QBtn outline :icon="Icon.CLOSE" label="Close" v-close-popup />
      </QCardActions>

      <QCardSection class="q-table__title text-weight-bold">{{ creationType() }}</QCardSection>

      <QCardSection>
        <!-- Entity Fields -->
        <IdInput :id="id" @update:id="id = $event" />
        <DateInput :date="createdAt" label="Created At" @update:date="createdAt = $event" />
        <!-- Activity Fields -->
        <div v-if="isActivity()">
          <NameInput :name="name" @update:name="name = $event" />
          <TextAreaInput
            :text="description"
            label="Description"
            @update:text="description = $event"
          />
          <StatusSelect :status="status" type="ActivityStatus" @update:status="status = $event" />
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
