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
import { useMeasurements } from '@/use/useMeasurements'
import { logger } from '@/services/Logger'

const {
  tableRows,
  tableColumns,
  dialog,
  details,
  clearMeasurementsTableData,
  deleteMeasurementRow,
  getMeasurementDetails,
} = useMeasurements()

// TEMP FUNCTION
function editThisClicked(value: any) {
  logger.log(`Edit this: ${value}`)
}
</script>

<template>
  <QTable :rows="tableRows" :columns="tableColumns" :rows-per-page-options="[10]">
    <!-- Table Header -->
    <template v-slot:top>
      <div class="q-table__title text-weight-bold">App Logs</div>
      <QSpace />
      <div>
        <QBtn color="negative" label="Clear Measurements" @click="clearMeasurementsTableData()" />
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
            @click="getMeasurementDetails(props.cols[0].value)"
            icon="manage_search"
          />
          <QBtn
            flat
            color="primary"
            round
            dense
            @click="editThisClicked(props.cols[0].value)"
            icon="edit"
          />
          <QBtn
            flat
            color="negative"
            round
            dense
            @click="deleteMeasurementRow(props.cols[0].value)"
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
        <div class="text-h6">Measurement Details</div>
      </QCardSection>

      <QCardSection class="q-pt-none">
        <div v-for="(item, key, i) in details" :key="i">
          <div class="text-uppercase text-weight-bold">{{ key }}</div>
          <div>{{ item || '-' }}</div>
          <br />
        </div>
      </QCardSection>
    </QCard>
  </QDialog>
</template>
