<script setup lang="ts">
import type { FinishedAt } from '@/constants/types'
import { QInput, QDate, QBtn, QTime, QPopupProxy } from 'quasar'
import { type Ref, ref } from 'vue'
import { ValidationMessage, isFinishedAtValid } from '@/utils/validators'
import { useVModel } from '@vueuse/core'
import { useLuxon } from '@/use/useLuxon'

/**
 * @example
 * Script: const finishedAt: Ref<FinishedAt> = ref('')
 * Template: <FinishedAtInput :finishedAt="finishedAt" @update:finishedAt="finishedAt = $event" />
 */

const { dateISOToDisplay } = useLuxon()

const props = defineProps<{
  finishedAt: FinishedAt
}>()

const emits = defineEmits<{
  (eventName: 'update:finishedAt', finishedAt: FinishedAt): void
}>()

const finishedAt = useVModel(props, 'finishedAt', emits)

const dateTimePicker: Ref<string> = ref('')

function changeDate() {
  finishedAt.value = dateISOToDisplay(dateTimePicker.value)
}
</script>

<template>
  <QInput
    disable
    v-model="finishedAt"
    label="Finished At"
    :rules="[(val: string) => isFinishedAtValid(val) || ValidationMessage.DATE]"
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

      <QBtn icon="close" color="negative" class="q-ml-sm q-px-sm" @click="finishedAt = null" />
    </template>
  </QInput>
</template>
