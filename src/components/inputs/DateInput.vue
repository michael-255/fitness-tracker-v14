<script setup lang="ts">
import { QInput, QDate, QBtn, QTime, QPopupProxy } from 'quasar'
import { type Ref, ref, onMounted } from 'vue'
import { useVModel } from '@vueuse/core'
import { useLuxon } from '@/use/useLuxon'
import { useValidators } from '@/use/useValidators'

/**
 * @example
 * Script: const date: Ref<string> = ref('')
 * Template: <DateInput :date="date" @update:date="date = $event" />
 */

const { dateISOToDisplay } = useLuxon()

const props = defineProps<{
  date: string // isoDate
  label: 'Created At' | 'Finished At'
}>()

const emits = defineEmits<{
  // Event returns any to make it easier to deal with on the component side
  (event: 'update:date', date: any): void
}>()

const isoDate = useVModel(props, 'date', emits)
const { isCreatedAtValid, isFinishedAtValid } = useValidators()
const displayDate: Ref<string> = ref('')
const dateTimePicker: Ref<string> = ref('')
const rules: Ref<any[]> = ref([])

/**
 * Defaults and date rules
 */
onMounted(async () => {
  const dateMessage = 'Date must be of format YYYY-MM-DDTHH:MM:SS.###Z'

  if (props.label === 'Created At') {
    rules.value = [(val: string) => isCreatedAtValid(val) || dateMessage]

    if (!props.date) {
      nowDate()
    } else {
      displayDate.value = dateISOToDisplay(isoDate.value as string)
    }
  }

  if (props.label === 'Finished At') {
    rules.value = [(val: string) => isFinishedAtValid(val) || dateMessage]

    if (!props.date) {
      clearDate()
    } else {
      displayDate.value = ''
    }
  }
})

function pickerDate() {
  isoDate.value = new Date(dateTimePicker.value).toISOString()
  displayDate.value = dateISOToDisplay(dateTimePicker.value)
}

function nowDate(): void {
  const now = new Date().toISOString()
  isoDate.value = now
  displayDate.value = dateISOToDisplay(now)
}

function clearDate(): void {
  isoDate.value = ''
  displayDate.value = ''
}
</script>

<template>
  <QInput
    disable
    v-model="displayDate"
    :label="label"
    :rules="rules"
    dense
    outlined
    color="primary"
  >
    <template v-slot:after>
      <QBtn icon="event" color="primary" class="q-ml-xs q-px-sm">
        <QPopupProxy cover transition-show="scale" transition-hide="scale">
          <QDate v-model="dateTimePicker" mask="YYYY-MM-DDTHH:mm:ss.000Z">
            <div class="row items-center justify-end q-gutter-sm">
              <QBtn label="Cancel" flat v-close-popup />
              <QBtn label="OK" color="primary" flat @click="pickerDate()" v-close-popup />
            </div>
          </QDate>
        </QPopupProxy>
      </QBtn>

      <QBtn icon="access_time" color="primary" class="q-ml-sm q-px-sm">
        <QPopupProxy cover transition-show="scale" transition-hide="scale">
          <QTime v-model="dateTimePicker" now-btn mask="YYYY-MM-DDTHH:mm:ss.000Z">
            <div class="row items-center justify-end q-gutter-sm">
              <QBtn label="Cancel" flat v-close-popup />
              <QBtn label="OK" color="primary" flat @click="pickerDate()" v-close-popup />
            </div>
          </QTime>
        </QPopupProxy>
      </QBtn>

      <QBtn
        v-if="label === 'Created At'"
        icon="event_available"
        color="positive"
        class="q-ml-sm q-px-sm"
        @click="nowDate()"
      />
      <QBtn
        v-if="label === 'Finished At'"
        icon="close"
        color="negative"
        class="q-ml-sm q-px-sm"
        @click="clearDate()"
      />
    </template>
  </QInput>
</template>
