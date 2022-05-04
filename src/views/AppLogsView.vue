<script setup lang="ts">
import { QBtn, QTable, QTr, QTh, QTd } from 'quasar'

interface IRow {
  name: string
  calories: number
  fat: number
  carbs: number
  protein: number
  sodium: number
  calcium: string
  iron: string
}

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: (row: IRow) => row.name,
    format: (val: IRow) => `${val}`,
    sortable: true,
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  {
    name: 'calcium',
    label: 'Calcium (%)',
    field: 'calcium',
    sortable: true,
    // sort: (a: any, b: any) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: 'iron',
    label: 'Iron (%)',
    field: 'iron',
    sortable: true,
    // sort: (a: any, b: any) => parseInt(a, 10) - parseInt(b, 10),
  },
]
const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%',
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%',
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%',
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%',
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%',
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

const logCols = [
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
  <h3>App Logs</h3>

  <div class="q-pa-md">
    <QTable title="App Logs" :rows="logRows" :columns="logCols"> </QTable>
  </div>

  <div class="q-pa-md">
    <QTable title="Treats" :rows="rows" :columns="columns" row-key="name">
      <!-- Column Headers -->
      <template v-slot:header="props">
        <QTr :props="props">
          <QTh auto-width />
          <QTh v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </QTh>
        </QTr>
      </template>

      <template v-slot:body="props">
        <QTr :props="props">
          <QTd auto-width>
            <QBtn
              size="sm"
              color="accent"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            />
          </QTd>
          <QTd v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </QTd>
        </QTr>
        <QTr v-show="props.expand" :props="props">
          <QTd colspan="100%">
            <div class="text-left">This is expand slot for row above: {{ props.row.name }}.</div>
          </QTd>
        </QTr>
      </template>
    </QTable>
  </div>
</template>
