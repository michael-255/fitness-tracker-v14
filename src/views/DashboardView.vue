<script setup lang="ts">
import { DBTable } from '@/constants/enums'
import { database } from '@/services/LocalDatabase'
import { QSeparator, QBtn } from 'quasar'
import { onMounted, ref, type Ref, computed } from 'vue'
import { LineChart, type ExtractComponentData } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const data: Ref<number[]> = ref([])
const labels: Ref<string[]> = ref([])
const chartRef = ref<ExtractComponentData<typeof LineChart>>()
const options = ref<any>({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Weight',
    },
  },
})
const chartData = computed<any>(() => ({
  labels: labels.value,
  datasets: [
    {
      data: data.value,
      backgroundColor: ['#1976D2'],
    },
  ],
}))

onMounted(async () => {
  const records = await database.getRecordsByParentId(
    DBTable.MEASUREMENT_RECORDS,
    'b4450018-1506-450f-a429-9903aded5c9b'
  )

  const recordLabels = records.map((r: any) => new Date(r?.createdAt).toDateString())
  const recordData = records.map((r: any) => r?.value)

  labels.value = recordLabels
  data.value = recordData
})

function set() {
  console.log('set')
}

function get() {
  console.log('get')
}

function print() {
  console.log('print')
}
</script>

<template>
  <h3>Dashboard</h3>

  <div class="q-my-sm">
    <QSeparator />
    <QBtn color="primary" label="Set" class="q-ma-sm" @click="set()" />
    <QBtn color="primary" label="Get" class="q-ma-sm" @click="get()" />
    <QBtn color="primary" label="Print" class="q-ma-sm" @click="print()" />
    <QSeparator />
  </div>

  <LineChart ref="chartRef" :options="options" :chartData="chartData" />
</template>
