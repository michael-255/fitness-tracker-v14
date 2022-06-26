<script setup lang="ts">
import type { CreatedAt } from '@/constants/types'
import { QInput, QDate, QBtn, QTime, QPopupProxy } from 'quasar'
import { type Ref, ref } from 'vue'
import { ValidationMessage, isCreatedAtValid } from '@/utils/validators'
import { useVModel } from '@vueuse/core'
import { useLuxon } from '@/use/useLuxon'

/**
 * @todo
 * Combine CreatedAtInput and FinishedAtInput somehow (haven't figured it out yet).
 */

/**
 * @example
 * Script: const createdAt: Ref<CreatedAt> = ref(new Date().toISOString())
 * Template: <CreatedAtInput :createdAt="createdAt" @update:createdAt="createdAt = $event" />
 */

const { dateISOToDisplay } = useLuxon()

const props = defineProps<{
  createdAt: CreatedAt
}>()

const emits = defineEmits<{
  (eventName: 'update:createdAt', createdAt: CreatedAt): void
}>()

const createdAt = useVModel(props, 'createdAt', emits)

const dateTimePicker: Ref<string> = ref('')

function changeDate() {
  createdAt.value = dateISOToDisplay(dateTimePicker.value)
}
</script>

<template>
  <QInput
    disable
    v-model="createdAt"
    label="Created At"
    :rules="[
      (val: string) => isCreatedAtValid(val) || ValidationMessage.DATE,
    ]"
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

      <QBtn
        icon="event_available"
        color="positive"
        class="q-ml-sm q-px-sm"
        @click="createdAt = dateISOToDisplay(new Date().toISOString())"
      />
    </template>
  </QInput>
</template>
