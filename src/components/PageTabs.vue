<script setup lang="ts">
import { QSeparator, QTabs, QTab, QTabPanels, QTabPanel } from 'quasar'
import type { Icon } from '@/constants/enums'
import { ref } from 'vue'

const props = defineProps<{
  tab1Name: string
  tab1Icon: Icon
  tab2Name: string
  tab2Icon: Icon
}>()

const tab = ref('tab1')
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
    <QTab name="tab1" :icon="props.tab1Icon" :label="props.tab1Name" />
    <QTab name="tab2" :icon="props.tab2Icon" :label="props.tab2Name" />
  </QTabs>

  <QSeparator />

  <QTabPanels v-model="tab" animated>
    <QTabPanel name="tab1" class="q-pa-none">
      <slot name="tab1"></slot>
    </QTabPanel>

    <QTabPanel name="tab2" class="q-pa-none">
      <slot name="tab2"></slot>
    </QTabPanel>
  </QTabPanels>
</template>
