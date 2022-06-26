<script setup lang="ts">
import type { FinishedAt } from '@/constants/types'
import { QInput, QIcon, QDate, QBtn, QTime, QPopupProxy } from 'quasar'
import { type Ref, ref, onMounted } from 'vue'
import { ValidationMessage, isFinishedAtValid } from '@/utils/validators'
import { useVModel } from '@vueuse/core'

/**
 * @example
 * Script: const finishedAt: Ref<FinishedAt> = ref('')
 * Template: <FinishedAtInput :finishedAt="finishedAt" @update:finishedAt="finishedAt = $event" />
 */

const props = defineProps<{
  finishedAt: FinishedAt
}>()

const emits = defineEmits<{
  (eventName: 'update:finishedAt', finishedAt: FinishedAt): void
}>()

const finishedAt = useVModel(props, 'finishedAt', emits)

const datePick: Ref<string> = ref('')
const timePick: Ref<string> = ref('')

onMounted(() => {
  let dateParts: string[] = []

  if (finishedAt.value) {
    dateParts = finishedAt.value.split('T')
  } else {
    dateParts = new Date().toISOString().split('T')
  }

  datePick.value = dateParts[0]
  timePick.value = dateParts[1].split('.')[0]
})

function changeFinishedAt() {
  finishedAt.value = `${datePick.value}T${timePick.value}.000Z`
}
</script>

<template>
  <QInput
    v-model="finishedAt"
    label="Finished At"
    :rules="[(val: string) => isFinishedAtValid(val) || ValidationMessage.DATE]"
    dense
    outlined
    color="primary"
  >
    <template v-slot:append>
      <QIcon name="event" color="primary" class="cursor-pointer">
        <QPopupProxy cover transition-show="scale" transition-hide="scale">
          <QDate v-model="datePick" mask="YYYY-MM-DD">
            <div class="row items-center justify-end q-gutter-sm">
              <QBtn label="Cancel" flat v-close-popup />
              <QBtn label="OK" color="primary" flat @click="changeFinishedAt()" v-close-popup />
            </div>
          </QDate>
        </QPopupProxy>
      </QIcon>

      <QIcon name="access_time" color="primary" class="cursor-pointer">
        <QPopupProxy cover transition-show="scale" transition-hide="scale">
          <QTime v-model="timePick" mask="HH:mm:00">
            <div class="row items-center justify-end q-gutter-sm">
              <QBtn label="Cancel" flat v-close-popup />
              <QBtn label="OK" color="primary" flat @click="changeFinishedAt()" v-close-popup />
            </div>
          </QTime>
        </QPopupProxy>
      </QIcon>
    </template>
  </QInput>
</template>
