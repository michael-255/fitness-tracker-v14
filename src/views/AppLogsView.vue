<script setup lang="ts">
import { QBtn, QTable, QTr, QTh, QTd } from 'quasar'
import { Store } from '@/constants'
import { database } from '@/services/LocalDatabase'
import type { IAppLog } from '@/models/AppLog'
import { useAppLogsSetup } from '@/use/useAppLogsSetup'
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'

const { clearAppLogsTableData } = useAppLogsSetup()

let appLogs: Ref<IAppLog[]> = ref([])

onMounted(async () => {
  appLogs.value = await database.getAll(Store.APP_LOGS)
})

const logCols: any[] = [
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
    name: 'message',
    label: 'First Message',
    align: 'left',
    required: true,
    field: (row: any) => row.message[0],
    sortable: true,
  },
  {
    name: 'message',
    label: 'Message Count',
    align: 'left',
    required: true,
    field: (row: any) => row.message.length,
    sortable: true,
  },
  {
    name: 'stack',
    label: 'Stack Count',
    align: 'left',
    required: true,
    field: (row: any) => row.stack.length,
    sortable: true,
  },
]

async function deleteRow(id: string) {
  try {
    if (confirm(`Delete App Log "${id}" from database?`)) {
      await database.deleteById(Store.APP_LOGS, id)
      appLogs.value = await database.getAll(Store.APP_LOGS)
    }
  } catch (err) {
    console.error(err) // @todo - replace with logger.error
    database.addAppLog(err, new Error('clearStoreData'))
  }
}

function print(str: string): void {
  console.log(str)
}
</script>

<template>
  <h3>App Logs</h3>

  <QBtn color="negative" label="Clear App Logs" @click="clearAppLogsTableData" />

  <div class="q-pa-md">
    <QTable title="App Logs" :rows="appLogs" :columns="logCols">
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
              @click="deleteRow(props.cols[0].value)"
              icon="delete"
            />
          </QTd>
        </QTr>
      </template>
    </QTable>
  </div>
</template>
