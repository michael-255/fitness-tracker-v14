<script setup lang="ts">
import { QBtn } from 'quasar'
import { DoughnutChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { Views } from '@/constants'
import { createId } from '@/utils/build-id'
import { defaults } from '@/services/DefaultsGenerator'
import { database } from '@/services/LocalDatabase'
import { ErrorRecord } from '@/models/ErrorRecord'

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

async function addError() {
  const otherError = new Error('Other Error!')
  const error1 = new ErrorRecord(otherError)
  const error2 = new ErrorRecord(`Test Error: ${createId()}.`)
  const error3 = new ErrorRecord(undefined)
  await database.addErrorRecord(error1)
  await database.addErrorRecord(error2)
  await database.addErrorRecord(error3)

  try {
    throw new Error('Testing throw with normal Error.')
  } catch (error) {
    console.error(error)
    const errorRecord = new ErrorRecord(error as Error)
    await database.addErrorRecord(errorRecord)
  }
}

async function getErrors() {
  console.log(await database.getAllErrorRecords())
}

async function getDefaults() {
  console.log(await defaults.generateMeasurements())
  console.log(await defaults.generateExercises())
  console.log(await defaults.generateWorkouts())
}

function ids() {
  const ids = []

  for (let i = 0; i < 30; i++) {
    ids.push(createId())
  }

  console.log(ids)
}
</script>

<template>
  <h3>Dashboard View</h3>
  <QBtn color="primary" label="Active Workout" :to="{ name: Views.ACTIVEWORKOUT, params: { id: 'TEST-1234-IDXX' } }" />
  <QBtn color="primary" label="Add Error" @click="addError()" />
  <QBtn color="primary" label="Get Errors" @click="getErrors()" />
  <br />
  <QBtn label="GET IDS" @click="ids()" />
  <br />
  <QBtn label="GET Defaults" @click="getDefaults()" />
  <br />
  <DoughnutChart :chartData="testData" />
</template>
