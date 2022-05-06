<script setup lang="ts">
import { QBtn, QTable, QTr, QTh, QTd } from 'quasar'

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
]

const logRows = [
  {
    id: '1',
    createdAt: new Date('2022/01/01').toISOString(),
  },
  {
    id: '2',
    createdAt: new Date('2022/01/02').toISOString(),
  },
  {
    id: '3',
    createdAt: new Date('2022/01/03').toISOString(),
  },
  {
    id: '4',
    createdAt: new Date('2022/01/04').toISOString(),
  },
]

function print(str: string): void {
  console.log(str)
}
</script>

<template>
  <h3>App Logs</h3>

  <div class="q-pa-md">
    <QTable title="App Logs" :rows="logRows" :columns="logCols">
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
            <QBtn flat color="primary" round dense @click="print('edit')" icon="edit" />
            <QBtn flat color="negative" round dense @click="print('delete')" icon="delete" />
          </QTd>
        </QTr>
      </template>
    </QTable>
  </div>
</template>
