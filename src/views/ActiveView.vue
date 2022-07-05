<script setup lang="ts">
import { Icon } from '@/constants/enums'
import { DBTable } from '@/constants/enums'
import PageTabs from '@/components/PageTabs.vue'
import PageTable from '@/components/PageTable.vue'
import { WorkoutRecord } from '@/models/WorkoutRecord'
import { ExerciseRecord } from '@/models/ExerciseRecord'
</script>

<template>
  <PageTabs
    tab1Name="Workouts"
    :tab1Icon="Icon.WORKOUTS"
    tab2Name="Exercises"
    :tab2Icon="Icon.EXERCISES"
  >
    <template v-slot:tab1>
      <PageTable
        :table="DBTable.ACTIVE_WORKOUTS"
        tableName="Active Workouts"
        :tableColumns="WorkoutRecord.getTableColumns()"
        :columnOptions="WorkoutRecord.getColumnOptions()"
        :visibleColumns="WorkoutRecord.getVisibleColumns()"
        :showCreate="false"
        :showReport="false"
        :showEdit="false"
      />
    </template>

    <template v-slot:tab2>
      <PageTable
        :table="DBTable.ACTIVE_EXERCISES"
        tableName="Active Exercises"
        :tableColumns="ExerciseRecord.getTableColumns()"
        :columnOptions="ExerciseRecord.getColumnOptions()"
        :visibleColumns="ExerciseRecord.getVisibleColumns()"
        :showCreate="false"
        :showReport="false"
        :showEdit="false"
      />
    </template>
  </PageTabs>
</template>
