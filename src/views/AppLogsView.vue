<script setup lang="ts">
import {
  QBtn,
  QTable,
  QTr,
  QTh,
  QTd,
  QDialog,
  QCard,
  QCardSection,
  QTooltip,
  QBar,
  QSpace,
} from 'quasar'
import { useAppLogs } from '@/use/useAppLogs'

const {
  tableColumns,
  tableRows,
  rowDetails,
  dialog,
  clearAppLogsTableData,
  deleteAppLogRow,
  getAppLogDetails,
} = useAppLogs()
</script>

<template>
  <QTable :rows="tableRows" :columns="tableColumns" :rows-per-page-options="[10]">
    <!-- Table Header -->
    <template v-slot:top>
      <div class="q-table__title text-weight-bold">App Logs</div>
      <QSpace />
      <div>
        <QBtn color="negative" label="Clear App Logs" @click="clearAppLogsTableData()" />
      </div>
    </template>
    <!-- Column Headers -->
    <template v-slot:header="props">
      <QTr :props="props">
        <QTh v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </QTh>
        <QTh auto-width />
      </QTr>
    </template>
    <!-- Rows -->
    <template v-slot:body="props">
      <QTr :props="props">
        <QTd v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </QTd>
        <QTd auto-width>
          <QBtn
            flat
            color="info"
            round
            dense
            @click="getAppLogDetails(props.cols[0].value)"
            icon="manage_search"
          />
          <QBtn
            flat
            color="negative"
            round
            dense
            @click="deleteAppLogRow(props.cols[0].value)"
            icon="delete"
          />
        </QTd>
      </QTr>
    </template>
  </QTable>

  <!-- Fullscreen Dialog-->
  <QDialog
    v-model="dialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <QCard class="bg-primary text-white">
      <QBar>
        <QSpace />

        <QBtn dense flat icon="close" v-close-popup>
          <QTooltip class="bg-white text-primary">Close</QTooltip>
        </QBtn>
      </QBar>

      <QCardSection>
        <div class="text-h6">App Log Details</div>
      </QCardSection>

      <QCardSection class="q-pt-none">
        <div v-for="(item, key, i) in rowDetails" :key="i">
          <div class="text-weight-bold">{{ key }}</div>
          <div>{{ item || '-' }}</div>
          <br />
        </div>
      </QCardSection>
    </QCard>
  </QDialog>
</template>
