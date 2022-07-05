<script setup lang="ts">
import { DBTable } from '@/constants/enums'
import { AppLog } from '@/models/AppLog'
import PageTable from '@/components/PageTable.vue'
</script>

<template>
  <PageTable
    :table="DBTable.APP_LOGS"
    tableName="App Logs"
    :tableColumns="AppLog.getTableColumns()"
    :columnOptions="AppLog.getColumnOptions()"
    :visibleColumns="AppLog.getVisibleColumns()"
    :showCreate="false"
    :showReport="false"
    :showEdit="false"
  />
</template>
