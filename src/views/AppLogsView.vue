<script setup lang="ts">
import { QBtn, QTable, QTr, QTh, QTd } from 'quasar'
import { useAppLogs } from '@/use/useAppLogs'

const { appLogs, logColumns, clearAppLogsTableData, deleteAppLogRow } = useAppLogs()

function print(str: string): void {
  console.log(str)
}
</script>

<template>
  <h3>App Logs</h3>

  <QBtn color="negative" label="Clear App Logs" @click="clearAppLogsTableData()" />

  <div class="q-pa-md">
    <QTable title="App Logs" :rows="appLogs" :columns="logColumns">
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
            <QBtn flat color="info" round dense @click="print('details')" icon="manage_search" />
            <!-- <QBtn flat color="primary" round dense @click="print('edit')" icon="edit" /> -->
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
  </div>
</template>
