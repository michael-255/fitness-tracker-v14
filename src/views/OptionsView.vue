<script setup lang="ts">
import { QBtn, QFile, QIcon } from 'quasar'
import { DBTable } from '@/constants/enums'
import { useDefaults } from '@/use/useDefaults'
import { useImportExport } from '@/use/useImportExport'
import { useClearData } from '@/use/useClearData'

const { loadAllDefaults, loadMeasurements, loadExercises, loadWorkouts } = useDefaults()
const { file, onRejectedFile, importData, exportData } = useImportExport()
const { clearAllAppData, clearTableData } = useClearData()
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
      <QIcon name="cloud_upload" @click.stop="" />
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
    @click="clearTableData(DBTable.MEASUREMENTS)"
  />
  <br />
  <QBtn
    class="q-mb-sm"
    color="negative"
    label="Exercises"
    @click="clearTableData(DBTable.EXERCISES)"
  />
  <br />
  <QBtn
    class="q-mb-sm"
    color="negative"
    label="Workouts"
    @click="clearTableData(DBTable.WORKOUTS)"
  />
  <br />
  <QBtn
    class="q-mb-sm"
    color="negative"
    label="Measurement Records"
    @click="clearTableData(DBTable.MEASUREMENT_RECORDS)"
  />
  <br />
  <QBtn
    class="q-mb-sm"
    color="negative"
    label="Exercise Records"
    @click="clearTableData(DBTable.EXERCISE_RECORDS)"
  />
  <br />
  <QBtn
    class="q-mb-sm"
    color="negative"
    label="Workout Records"
    @click="clearTableData(DBTable.WORKOUT_RECORDS)"
  />
  <br />
  <QBtn
    class="q-mb-sm"
    color="negative"
    label="Active Exercises"
    @click="clearTableData(DBTable.ACTIVE_EXERCISES)"
  />
  <br />
  <QBtn
    class="q-mb-sm"
    color="negative"
    label="Active Workouts"
    @click="clearTableData(DBTable.ACTIVE_WORKOUTS)"
  />
  <br />
  <QBtn
    class="q-mb-sm"
    color="negative"
    label="Error Logs"
    @click="clearTableData(DBTable.APP_LOGS)"
  />
  <br />
</template>

<style></style>
