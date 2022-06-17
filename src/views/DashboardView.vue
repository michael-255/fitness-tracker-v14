<script setup lang="ts">
import { QSeparator, QTabs, QTab, QTabPanels, QTabPanel } from 'quasar'
import { Icon } from '@/constants'
import { ref } from 'vue'
import SharedTable from '@/components/shared/SharedTable.vue'

const tab = ref('activities')
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
    <QTabPanel name="activities" class="q-pa-none">
      <!-- <div class="text-h6">Activities</div> -->
      <SharedTable />
    </QTabPanel>

    <QTabPanel name="records">
      <div class="text-h6">Records</div>
    </QTabPanel>
  </QTabPanels>
</template>
