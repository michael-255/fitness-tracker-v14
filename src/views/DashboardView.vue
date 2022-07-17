<script setup lang="ts">
import { QSeparator, QBtn } from 'quasar'
import { ActivityStatus, MeasurementType } from '@/constants/enums'
import { useMeasurementInputs } from '@/use/useMeasurementInputs'
import MeasurementInputs from '@/components/input_groups/MeasurementInputs.vue'

const { setMeasurement, getMeasurement, isMeasurementValid } = useMeasurementInputs()

function set() {
  setMeasurement(
    'test-1234',
    'XXXXX',
    'Test',
    'Hellow world!',
    ActivityStatus.ARCHIVED,
    MeasurementType.PERCENT
  )
}

function get() {
  console.log(getMeasurement())
}

function print() {
  console.log('Are inputs valid?', isMeasurementValid())
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

  <MeasurementInputs />
</template>
