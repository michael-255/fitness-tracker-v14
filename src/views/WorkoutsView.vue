<script setup lang="ts">
import { DBTable } from '@/constants/enums'
import PageTabs from '@/components/PageTabs.vue'
import TabTable from '@/components/TabTable.vue'
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
      <TabTable :table="DBTable.WORKOUTS" />
    </template>

    <template v-slot:tab2>
      <TabTable :table="DBTable.WORKOUT_RECORDS" />
    </template>
  </PageTabs>
</template>
