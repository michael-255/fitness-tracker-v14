<script setup lang="ts">
import { QBtn, QFile } from 'quasar'
import { defaults } from '@/services/DefaultsGenerator'
import { database } from '@/services/LocalDatabase'
import { logger } from '@/services/Logger'
import { Store } from '@/constants'
import { ref } from 'vue'

let file: any = ref(null)

function onRejectedFile(entries: any) {
  logger.warn('The file upload was rejected.', entries)
  database.addErrorLog(
    { name: entries[0]?.file?.name, message: `failedPropValidation:${entries[0]?.failedPropValidation}` },
    new Error('onRejectedFile')
  )
}

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
    database.addErrorLog(err, new Error('loadAllDefaults'))
  }
}

async function loadMeasurements() {
  try {
    const measurements = await defaults.generateMeasurements()
    await database.bulkAddMeasurements(measurements)
  } catch (err) {
    logger.error(err)
    database.addErrorLog(err, new Error('loadMeasurements'))
  }
}

async function loadExercises() {
  try {
    const exercises = await defaults.generateExercises()
    await database.bulkAddExercises(exercises)
  } catch (err) {
    logger.error(err)
    database.addErrorLog(err, new Error('loadExercises'))
  }
}

async function loadWorkouts() {
  try {
    const workouts = await defaults.generateWorkouts()
    await database.bulkAddWorkouts(workouts)
  } catch (err) {
    logger.error(err)
    database.addErrorLog(err, new Error('loadWorkouts'))
  }
}

async function clearAllAppData() {
  try {
    if (confirm('Clear all app data?')) {
      const stores: string[] = []
      let store: keyof typeof Store

      for (store in Store) {
        stores.push(Store[store])
      }

      await Promise.all(stores.map((store) => database.clear(store as Store)))
    }
  } catch (err) {
    logger.error(err)
    database.addErrorLog(err, new Error('clearAllAppData'))
  }
}

async function clearStoreData(store: Store) {
  try {
    if (confirm(`Clear "${store}" table data?`)) {
      database.clear(store)
    }
  } catch (err) {
    logger.error(err)
    database.addErrorLog(err, new Error('clearStoreData'))
  }
}

async function printFile() {
  const fileData = await file.value.text()
  const parsedFileData = JSON.parse(fileData)
  logger.log(parsedFileData)
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

  <div class="q-mb-sm text-weight-bolder">Import Data</div>
  <QFile
    class="q-mb-sm"
    v-model="file"
    accept="application/json"
    max-file-size="10485760"
    label="Upload Fitness Data JSON"
    @rejected="onRejectedFile"
  />
  <br />
  <QBtn class="q-mb-sm" color="primary" label="Print File" @click="printFile()" />
  <br />

  <div class="q-mb-sm text-weight-bolder">Export Data</div>

  <div class="q-mb-sm text-weight-bolder">Convert Data</div>

  <div class="q-mb-sm text-weight-bolder">Clear App Data</div>
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
  <QBtn class="q-mb-sm" color="negative" label="Error Logs" @click="clearStoreData(Store.ERROR_LOGS)" />
  <br />
</template>

<style></style>
