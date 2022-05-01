<script setup lang="ts">
import { QBtn, QFile, QIcon } from 'quasar'
import { defaults } from '@/services/DefaultsGenerator'
import { database } from '@/services/LocalDatabase'
import { logger } from '@/services/Logger'
import { FitnessData } from '@/models/FitnessData'
import { Store } from '@/constants'
import { downloadFile } from '@/utils/common'
import { ref } from 'vue'

let file: any = ref(null)

function onRejectedFile(entries: any) {
  logger.warn('The file upload was rejected.', entries)
  const fileName = entries[0]?.file?.name
  const failedValidation = entries[0]?.failedPropValidation
  database.addAppLog(
    {
      name: fileName,
      message: `failedPropValidation:${failedValidation}`,
    },
    new Error('onRejectedFile')
  )
}

//
// Load Defaults
//

async function loadAllDefaults() {
  try {
    const measurements = await defaults.generateMeasurements()
    const exercises = await defaults.generateExercises()
    const workouts = await defaults.generateWorkouts()
    await database.bulkAddMeasurements(measurements)
    await database.bulkAddExercises(exercises)
    await database.bulkAddWorkouts(workouts)
  } catch (err) {
    logger.error(err)
    database.addAppLog(err, new Error('loadAllDefaults'))
  }
}

async function loadMeasurements() {
  try {
    const measurements = await defaults.generateMeasurements()
    await database.bulkAddMeasurements(measurements)
  } catch (err) {
    logger.error(err)
    database.addAppLog(err, new Error('loadMeasurements'))
  }
}

async function loadExercises() {
  try {
    const exercises = await defaults.generateExercises()
    await database.bulkAddExercises(exercises)
  } catch (err) {
    logger.error(err)
    database.addAppLog(err, new Error('loadExercises'))
  }
}

async function loadWorkouts() {
  try {
    const workouts = await defaults.generateWorkouts()
    await database.bulkAddWorkouts(workouts)
  } catch (err) {
    logger.error(err)
    database.addAppLog(err, new Error('loadWorkouts'))
  }
}

//
// Import Data
//

async function importData() {
  try {
    const fileData = await file.value.text()
    const parsedFileData = JSON.parse(fileData)

    const fitnessData = new FitnessData({
      measurements: parsedFileData?.measurements,
      exercises: parsedFileData?.exercises,
      workouts: parsedFileData?.workouts,
      measurementRecords: parsedFileData?.measurementRecords,
      exerciseRecords: parsedFileData?.exerciseRecords,
      workoutRecords: parsedFileData?.workoutRecords,
      activeExercises: parsedFileData?.activeExercises,
      activeWorkouts: parsedFileData?.activeWorkouts,
      appLogs: parsedFileData?.appLogs, // AppLogs are included, but won't be imported into the database
    })

    logger.log(fitnessData)

    await database.bulkAddMeasurements(fitnessData?.measurements)
    await database.bulkAddExercises(fitnessData?.exercises)
    await database.bulkAddWorkouts(fitnessData?.workouts)
    await database.bulkAddMeasurementRecords(fitnessData?.measurementRecords)
    await database.bulkAddExerciseRecords(fitnessData?.exerciseRecords)
    await database.bulkAddWorkoutRecords(fitnessData?.workoutRecords)
    await database.bulkAddActiveExercises(fitnessData?.activeExercises)
    await database.bulkAddActiveWorkouts(fitnessData?.activeWorkouts)
  } catch (err) {
    logger.error(err)
    database.addAppLog(err, new Error('importData'))
  }
}

//
// Export Data
//

async function exportData() {
  try {
    const fitnessData = new FitnessData({
      measurements: await database.getAll(Store.MEASUREMENTS),
      exercises: await database.getAll(Store.EXERCISES),
      workouts: await database.getAll(Store.WORKOUTS),
      measurementRecords: await database.getAll(Store.MEASUREMENT_RECORDS),
      exerciseRecords: await database.getAll(Store.EXERCISE_RECORDS),
      workoutRecords: await database.getAll(Store.WORKOUT_RECORDS),
      activeExercises: await database.getAll(Store.ACTIVE_EXERCISES),
      activeWorkouts: await database.getAll(Store.ACTIVE_WORKOUTS),
      appLogs: await database.getAll(Store.APP_LOGS),
    })

    logger.log(fitnessData)

    downloadFile({
      fileName: `fitness-data-v14-export-${new Date().toISOString()}`,
      extension: 'json',
      mimeType: 'application/json',
      textContent: JSON.stringify(fitnessData),
    })
  } catch (err) {
    logger.error(err)
    database.addAppLog(err, new Error('exportData'))
  }
}

//
// Clear App Data (TODO: likely moved to other pages?)
//

async function clearAllAppData() {
  try {
    if (confirm('Clear all app data?')) {
      await Promise.all(Object.values(Store).map((store) => database.clear(store as Store)))
    }
  } catch (err) {
    logger.error(err)
    database.addAppLog(err, new Error('clearAllAppData'))
  }
}

async function clearStoreData(store: Store) {
  try {
    if (confirm(`Clear "${store}" table data?`)) {
      database.clear(store)
    }
  } catch (err) {
    logger.error(err)
    database.addAppLog(err, new Error('clearStoreData'))
  }
}
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
    label="Upload Fitness Data"
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
  <QBtn class="q-mb-sm" color="primary" label="Import Data" @click="importData()" :disable="!file" />
  <br />

  <div class="q-mb-sm q-mt-md text-weight-bolder">Export Data</div>

  <QBtn class="q-mb-sm" color="primary" label="Export Data" @click="exportData()" />
  <br />

  <div class="q-mb-sm q-mt-md text-weight-bolder">Clear App Data</div>

  <QBtn class="q-mb-sm" color="negative" label="Clear All App Data" @click="clearAllAppData()" />
  <br />
  <QBtn class="q-mb-sm" color="negative" label="Measurements" @click="clearStoreData(Store.MEASUREMENTS)" />
  <br />
  <QBtn class="q-mb-sm" color="negative" label="Exercises" @click="clearStoreData(Store.EXERCISES)" />
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
  <QBtn class="q-mb-sm" color="negative" label="Exercise Records" @click="clearStoreData(Store.EXERCISE_RECORDS)" />
  <br />
  <QBtn class="q-mb-sm" color="negative" label="Workout Records" @click="clearStoreData(Store.WORKOUT_RECORDS)" />
  <br />
  <QBtn class="q-mb-sm" color="negative" label="Active Exercises" @click="clearStoreData(Store.ACTIVE_EXERCISES)" />
  <br />
  <QBtn class="q-mb-sm" color="negative" label="Active Workouts" @click="clearStoreData(Store.ACTIVE_WORKOUTS)" />
  <br />
  <QBtn class="q-mb-sm" color="negative" label="Error Logs" @click="clearStoreData(Store.APP_LOGS)" />
  <br />
</template>

<style></style>
