<script setup lang="ts">
import { QInput, QDate, QBtn, QTime, QPopupProxy } from 'quasar'
import { type Ref, ref, onMounted } from 'vue'
import { ValidationMessage, isCreatedAtValid, isFinishedAtValid } from '@/utils/validators'
import { useVModel } from '@vueuse/core'
import { useLuxon } from '@/use/useLuxon'
import type { Nullable } from '@/constants/globals'

/**
 * @example
 * Script: const date: Ref<string> = ref('')
 * Template: <DateInput :date="date" @update:date="date = $event" />
 */

const { dateISOToDisplay } = useLuxon()

const props = defineProps<{
  date: string | Nullable<string>
  label: 'Created At' | 'Finished At'
}>()

const emits = defineEmits<{
  // Event returns any to make it easier to deal with on the component side
  (eventName: 'update:date', date: any): void
}>()

const date = useVModel(props, 'date', emits)

const dateTimePicker: Ref<string> = ref('')
const rules: Ref<any[]> = ref([])

onMounted(async () => {
  // Setup the rules for each date input type
  if (props.label === 'Created At') {
    rules.value = [(val: string) => isCreatedAtValid(val) || ValidationMessage.DATE]
    // Default the created date to now if it's empty
    if (!props.date) {
      date.value = dateISOToDisplay(new Date().toISOString())
    }
  }
  if (props.label === 'Finished At') {
    rules.value = [(val: string) => isFinishedAtValid(val) || ValidationMessage.DATE]
  }
})

function changeDate() {
  date.value = dateISOToDisplay(dateTimePicker.value)
}
</script>

<template>
  <QInput disable v-model="date" :label="label" :rules="rules" dense outlined color="primary">
    <template v-slot:after>
      <QBtn icon="event" color="primary" class="q-ml-xs q-px-sm">
        <QPopupProxy cover transition-show="scale" transition-hide="scale">
          <QDate v-model="dateTimePicker" mask="YYYY-MM-DDTHH:mm:ss.000Z">
            <div class="row items-center justify-end q-gutter-sm">
              <QBtn label="Cancel" flat v-close-popup />
              <QBtn label="OK" color="primary" flat @click="changeDate()" v-close-popup />
            </div>
          </QDate>
        </QPopupProxy>
      </QBtn>

      <QBtn icon="access_time" color="primary" class="q-ml-sm q-px-sm">
        <QPopupProxy cover transition-show="scale" transition-hide="scale">
          <QTime v-model="dateTimePicker" now-btn mask="YYYY-MM-DDTHH:mm:ss.000Z">
            <div class="row items-center justify-end q-gutter-sm">
              <QBtn label="Cancel" flat v-close-popup />
              <QBtn label="OK" color="primary" flat @click="changeDate()" v-close-popup />
            </div>
          </QTime>
        </QPopupProxy>
      </QBtn>

      <QBtn
        v-if="label === 'Created At'"
        icon="event_available"
        color="positive"
        class="q-ml-sm q-px-sm"
        @click="date = dateISOToDisplay(new Date().toISOString())"
      />
      <QBtn
        v-if="label === 'Finished At'"
        icon="close"
        color="negative"
        class="q-ml-sm q-px-sm"
        @click="date = null"
      />
    </template>
  </QInput>
</template>
