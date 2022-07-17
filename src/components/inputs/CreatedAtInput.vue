<script setup lang="ts">
import { QInput, QDate, QBtn, QTime, QPopupProxy } from 'quasar'
import { type Ref, ref, onMounted } from 'vue'
import { dateISOToDisplay } from '@/utils/luxon'
import { FieldName, Icon } from '@/constants/enums'
import { isRequiredDateValid } from '@/utils/validators'
import { useInputInject } from '@/use/useInputInject'

/**
 * @todo
 */

const { createdAtModel, createdAtInputRef, createdAtUpdateModel } = useInputInject(
  FieldName.CREATED_AT
)
const userDisplayedDate: Ref<string> = ref('')
const dateTimePicker: Ref<string> = ref('')

/**
 * @todo
 */
onMounted(() => {
  if (createdAtModel.value) {
    userDisplayedDate.value = dateISOToDisplay(createdAtModel.value as string)
  } else {
    onNowDate()
  }
})

/**
 * @todo
 */
function onNowDate(): void {
  const now = new Date().toISOString()
  createdAtUpdateModel(now)
  userDisplayedDate.value = dateISOToDisplay(now)
}

/**
 * @todo
 */
function onPickerDateTime(): void {
  if (dateTimePicker.value) {
    createdAtUpdateModel(new Date(dateTimePicker.value).toISOString())
    userDisplayedDate.value = dateISOToDisplay(dateTimePicker.value)
  }
}
</script>

<template>
  <QInput
    v-model="userDisplayedDate"
    ref="createdAtInputRef"
    label="Created Date"
    :rules="[
      (val: string) => isRequiredDateValid(val) || 'Date must be of format YYYY-MM-DDTHH:MM:SS.###Z'
    ]"
    dense
    outlined
    disable
    color="primary"
  >
    <template v-slot:after>
      <QBtn :icon="Icon.CALENDAR_DATE" color="primary" class="q-ml-xs q-px-sm">
        <QPopupProxy cover transition-show="scale" transition-hide="scale">
          <QDate v-model="dateTimePicker" mask="YYYY-MM-DDTHH:mm:ss.000Z">
            <div class="row items-center justify-end q-gutter-sm">
              <QBtn label="Cancel" flat v-close-popup />
              <QBtn label="OK" color="primary" flat @click="onPickerDateTime()" v-close-popup />
            </div>
          </QDate>
        </QPopupProxy>
      </QBtn>

      <QBtn :icon="Icon.TIME" color="primary" class="q-ml-sm q-px-sm">
        <QPopupProxy cover transition-show="scale" transition-hide="scale">
          <QTime v-model="dateTimePicker" now-btn mask="YYYY-MM-DDTHH:mm:ss.000Z">
            <div class="row items-center justify-end q-gutter-sm">
              <QBtn label="Cancel" flat v-close-popup />
              <QBtn label="OK" color="primary" flat @click="onPickerDateTime()" v-close-popup />
            </div>
          </QTime>
        </QPopupProxy>
      </QBtn>

      <QBtn
        :icon="Icon.CALENDAR_CHECK"
        color="positive"
        class="q-ml-sm q-px-sm"
        @click="onNowDate()"
      />
    </template>
  </QInput>
</template>
