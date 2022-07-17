<script setup lang="ts">
import { DBTable } from '@/constants/enums'
import PageTabs from '@/components/PageTabs.vue'
import TabContent from '@/components/TabContent.vue'
import { Icon } from '@/constants/enums'
</script>

<template>
  <PageTabs
    tab1Name="Activities"
    :tab1Icon="Icon.ACTIVITIES"
    tab2Name="Records"
    :tab2Icon="Icon.RECORDS"
  >
    <template v-slot:tab1>
      <TabContent :table="DBTable.EXERCISES" />
    </template>

    <template v-slot:tab2>
      <TabContent :table="DBTable.EXERCISE_RECORDS" />
    </template>
  </PageTabs>
</template>
