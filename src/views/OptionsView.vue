<script setup lang="ts">
import { QBtn, QFile, QIcon } from 'quasar'
import { useDefaults } from '@/use/useDefaults'
import { useImportExport } from '@/use/useImportExport'
import { useClearData } from '@/use/useClearData'

const { loadAllDefaults, loadMeasurements, loadExercises, loadWorkouts } = useDefaults()
const { file, onRejectedFile, importData, exportData } = useImportExport()
const { clearAllAppData } = useClearData()
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
</template>

<style></style>
