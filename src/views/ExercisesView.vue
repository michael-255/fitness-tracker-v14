<script setup lang="ts">
import { DBTable } from '@/constants/enums'
import EntityTabs from '@/components/shared/EntityTabs.vue'
import EntityTable from '@/components/shared/EntityTable.vue'

const activityColumns = [
  {
    name: 'id',
    label: 'Id',
    align: 'left',
    required: true,
    field: (row: any) => row.id,
    sortable: true,
  },
  {
    name: 'createdAt',
    label: 'Created At',
    align: 'left',
    required: true,
    field: (row: any) => row.createdAt,
    sortable: true,
  },
]

const recordColumns = [
  {
    name: 'id',
    label: 'Id',
    align: 'left',
    required: true,
    field: (row: any) => row.id,
    sortable: true,
  },
  {
    name: 'createdAt',
    label: 'Created At',
    align: 'left',
    required: true,
    field: (row: any) => row.createdAt,
    sortable: true,
  },
]
</script>

<template>
  <EntityTabs>
    <template v-slot:activities>
      <EntityTable
        tableName="Exercises"
        :table="DBTable.EXERCISES"
        :tableColumns="activityColumns"
      />
    </template>

    <template v-slot:records>
      <EntityTable
        tableName="Exercise Records"
        :table="DBTable.EXERCISE_RECORDS"
        :tableColumns="recordColumns"
      />
    </template>
  </EntityTabs>
</template>
