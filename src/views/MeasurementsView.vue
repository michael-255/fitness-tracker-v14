<script setup lang="ts">
import { DBTable } from '@/constants/enums'
import { Icon } from '@/constants/enums'
import PageTabs from '@/components/PageTabs.vue'
import TabContent from '@/components/TabContent.vue'
</script>

<template>
  <PageTabs
    tab1Name="Activities"
    :tab1Icon="Icon.ACTIVITIES"
    tab2Name="Records"
    :tab2Icon="Icon.RECORDS"
  >
    <template v-slot:tab1>
      <TabContent :table="DBTable.MEASUREMENTS" />
    </template>

    <template v-slot:tab2>
      <TabContent :table="DBTable.MEASUREMENT_RECORDS" />
    </template>
  </PageTabs>
</template>
