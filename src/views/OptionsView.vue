<script setup lang="ts">
import { QBtn, QFile, QIcon } from 'quasar'
import { Store } from '@/constants'
import { useDefaults } from '@/use/useDefaults'
import { useImportExport } from '@/use/useImportExport'
import { useClearData } from '@/use/useClearData'

const { loadAllDefaults, loadMeasurements, loadExercises, loadWorkouts } = useDefaults()
const { file, onRejectedFile, importData, exportData } = useImportExport()
const { clearAllAppData, clearStoreData } = useClearData()
</script>

<template>
  <h3>Options</h3>

  <div class="q-mb-sm text-weight-bolder">Load Defaults</div>

  <QBtn class="q-mb-sm" color="primary" label="Load All Defaults" @click="loadAllDefaults()" />
  <br />
  <QBtn class="q-mb-sm" color="primary" label="Measurements" @click="loadMeasurements()" />
  <br />
  <QBtn class="q-mb-sm" color="primary" label="Exercises" @click="loadExercises()" />
  <br />
  <QBtn class="q-mb-sm" color="primary" label="Workouts" @click="loadWorkouts()" />
  <br />

  <div class="q-mb-sm q-mt-md text-weight-bolder">Import Data</div>

  <QFile
    filled
    dense
    bottom-slots
    v-model="file"
    accept="application/json"
    max-file-size="10485760"
    @rejected="onRejectedFile"
    label="Import Fitness Data"
    counter
  >
    <template v-slot:prepend>
      <QIcon name="cloud_upload" @click.stop />
    </template>
    <template v-slot:append>
      <QIcon name="cancel" @click.stop="file = null" class="cursor-pointer" />
    </template>
    <template v-slot:hint>Requires JSON</template>
  </QFile>

  <br />
  <QBtn
    class="q-mb-sm"
    color="primary"
    label="Import Data"
    @click="importData()"
    :disable="!file"
  />
  <br />

  <div class="q-mb-sm q-mt-md text-weight-bolder">Export Data</div>

  <QBtn class="q-mb-sm" color="primary" label="Export Data" @click="exportData()" />
  <br />

  <div class="q-mb-sm q-mt-md text-weight-bolder">Clear App Data</div>

  <QBtn class="q-mb-sm" color="negative" label="Clear All App Data" @click="clearAllAppData()" />
  <br />
  <QBtn
    class="q-mb-sm"
    color="negative"
    label="Measurements"
    @click="clearStoreData(Store.MEASUREMENTS)"
  />
  <br />
  <QBtn
    class="q-mb-sm"
    color="negative"
    label="Exercises"
    @click="clearStoreData(Store.EXERCISES)"
  />
  <br />
  <QBtn class="q-mb-sm" color="negative" label="Workouts" @click="clearStoreData(Store.WORKOUTS)" />
  <br />
  <QBtn
    class="q-mb-sm"
    color="negative"
    label="Measurement Records"
    @click="clearStoreData(Store.MEASUREMENT_RECORDS)"
  />
  <br />
  <QBtn
    class="q-mb-sm"
    color="negative"
    label="Exercise Records"
    @click="clearStoreData(Store.EXERCISE_RECORDS)"
  />
  <br />
  <QBtn
    class="q-mb-sm"
    color="negative"
    label="Workout Records"
    @click="clearStoreData(Store.WORKOUT_RECORDS)"
  />
  <br />
  <QBtn
    class="q-mb-sm"
    color="negative"
    label="Active Exercises"
    @click="clearStoreData(Store.ACTIVE_EXERCISES)"
  />
  <br />
  <QBtn
    class="q-mb-sm"
    color="negative"
    label="Active Workouts"
    @click="clearStoreData(Store.ACTIVE_WORKOUTS)"
  />
  <br />
  <QBtn
    class="q-mb-sm"
    color="negative"
    label="Error Logs"
    @click="clearStoreData(Store.APP_LOGS)"
  />
  <br />
</template>

<style></style>
