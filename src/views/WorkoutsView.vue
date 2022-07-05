<script setup lang="ts">
import { DBTable } from '@/constants/enums'
import PageTabs from '@/components/PageTabs.vue'
import PageTable from '@/components/PageTable.vue'
import { Workout } from '@/models/Workout'
import { WorkoutRecord } from '@/models/WorkoutRecord'
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
      <PageTable
        :table="DBTable.WORKOUTS"
        tableName="Workouts"
        :tableColumns="Workout.getTableColumns()"
        :columnOptions="Workout.getColumnOptions()"
        :visibleColumns="Workout.getVisibleColumns()"
        :showCreate="true"
        :showReport="false"
        :showEdit="true"
      />
    </template>

    <template v-slot:tab2>
      <PageTable
        :table="DBTable.WORKOUT_RECORDS"
        tableName="Workout Records"
        :tableColumns="WorkoutRecord.getTableColumns()"
        :columnOptions="WorkoutRecord.getColumnOptions()"
        :visibleColumns="WorkoutRecord.getVisibleColumns()"
        :showCreate="true"
        :showReport="true"
        :showEdit="true"
      />
    </template>
  </PageTabs>
</template>
