<script setup lang="ts">
import { DBTable } from '@/constants/enums'
import PageTabs from '@/components/PageTabs.vue'
import PageTable from '@/components/PageTable.vue'
import { Measurement } from '@/models/Measurement'
import { MeasurementRecord } from '@/models/MeasurementRecord'
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
        :table="DBTable.MEASUREMENTS"
        tableName="Measurements"
        :tableColumns="Measurement.getTableColumns()"
        :columnOptions="Measurement.getColumnOptions()"
        :visibleColumns="Measurement.getVisibleColumns()"
        :showCreate="true"
        :showReport="false"
        :showEdit="true"
      />
    </template>

    <template v-slot:tab2>
      <PageTable
        :table="DBTable.MEASUREMENT_RECORDS"
        tableName="Measurement Records"
        :tableColumns="MeasurementRecord.getTableColumns()"
        :columnOptions="MeasurementRecord.getColumnOptions()"
        :visibleColumns="MeasurementRecord.getVisibleColumns()"
        :showCreate="true"
        :showReport="true"
        :showEdit="true"
      />
    </template>
  </PageTabs>
</template>
