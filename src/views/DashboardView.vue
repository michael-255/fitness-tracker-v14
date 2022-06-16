<script setup lang="ts">
import { QSeparator, QTabs, QTab, QTabPanels, QTabPanel, QBtn } from 'quasar'
import { Icon } from '@/constants'
import { ref } from 'vue'
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue'

const dialog = ref(false)
const tab = ref('activities')

function toggleDialog() {
  dialog.value = !dialog.value
}

function confirmedDialog() {
  console.log('Action confirmed!')
}
</script>

<template>
  <QTabs
    v-model="tab"
    class="bg-grey-2 text-blue-grey"
    align="justify"
    active-color="primary"
    indicator-color="primary"
    inline-label
  >
    <QTab name="activities" :icon="Icon.ACTIVITIES" label="Activities" />
    <QTab name="records" :icon="Icon.RECORDS" label="Records" />
  </QTabs>

  <QSeparator />

  <QTabPanels v-model="tab" animated>
    <QTabPanel name="activities">
      <div class="text-h6">Activities</div>
    </QTabPanel>

    <QTabPanel name="records">
      <div class="text-h6">Records</div>
      <div>
        <QBtn flat label="Dialog" color="primary" @click="dialog = !dialog" />
        <ConfirmDialog
          title="Test"
          :icon="Icon.APPLOGS"
          message="Testing this with a larger message to see how the dialog box will be formatted. Who knows what this will end up looking like."
          color="primary"
          :dialog="dialog"
          @toggle:dialog="toggleDialog()"
          @confirm:dialog="confirmedDialog()"
        />
      </div>
    </QTabPanel>
  </QTabPanels>
</template>
