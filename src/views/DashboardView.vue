<script setup lang="ts">
import { QBtn } from 'quasar'
import { DoughnutChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { Views } from '@/constants'

Chart.register(...registerables)

const testData = {
  labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
  datasets: [
    {
      data: [30, 40, 60, 70, 5],
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    },
  ],
}
</script>

<template>
  <h3>Dashboard View</h3>
  <QBtn
    color="primary"
    label="Active Workout"
    :to="{ name: Views.ACTIVEWORKOUT, params: { id: 'TEST-1234-IDXX' } }"
  />
  <DoughnutChart :chartData="testData" />
</template>
