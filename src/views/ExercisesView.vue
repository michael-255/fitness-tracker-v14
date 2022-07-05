<script setup lang="ts">
import { DBTable } from '@/constants/enums'
import PageTabs from '@/components/PageTabs.vue'
import PageTable from '@/components/PageTable.vue'
import { Exercise } from '@/models/Exercise'
import { ExerciseRecord } from '@/models/ExerciseRecord'
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
        :table="DBTable.EXERCISES"
        tableName="Exercises"
        :tableColumns="Exercise.getTableColumns()"
        :columnOptions="Exercise.getColumnOptions()"
        :visibleColumns="Exercise.getVisibleColumns()"
        :showCreate="true"
        :showReport="false"
        :showEdit="true"
      />
    </template>

    <template v-slot:tab2>
      <PageTable
        :table="DBTable.EXERCISE_RECORDS"
        tableName="Exercise Records"
        :tableColumns="ExerciseRecord.getTableColumns()"
        :columnOptions="ExerciseRecord.getColumnOptions()"
        :visibleColumns="ExerciseRecord.getVisibleColumns()"
        :showCreate="true"
        :showReport="true"
        :showEdit="true"
      />
    </template>
  </PageTabs>
</template>
