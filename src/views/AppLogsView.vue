<script setup lang="ts">
import { Store } from '@/constants'
import EntityTable from '@/components/shared/EntityTable.vue'

const tableColumns = [
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
  {
    name: 'callerName',
    label: 'Caller Name',
    align: 'left',
    required: true,
    field: (row: any) => row.callerName,
    sortable: true,
  },
  {
    name: 'details',
    label: 'Details',
    align: 'left',
    required: true,
    field: (row: any) => row.details,
    sortable: true,
  },
  {
    name: 'errorName',
    label: 'Error Name',
    align: 'left',
    required: true,
    field: (row: any) => row.errorName,
    sortable: true,
  },
]
</script>

<template>
  <EntityTable tableName="App Logs" :store="Store.APP_LOGS" :tableColumns="tableColumns" />
</template>
