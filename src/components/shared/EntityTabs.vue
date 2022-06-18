<script setup lang="ts">
import { QSeparator, QTabs, QTab, QTabPanels, QTabPanel } from 'quasar'
import { Icon } from '@/constants'
import { ref } from 'vue'

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
      <slot name="activities"></slot>
    </QTabPanel>

    <QTabPanel name="records" class="q-pa-none">
      <slot name="records"></slot>
    </QTabPanel>
  </QTabPanels>
</template>
