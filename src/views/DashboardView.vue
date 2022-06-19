<script setup lang="ts">
import { QBtn } from 'quasar'
import { database } from '@/services/LocalDatabase'
// import type { Store } from '@/constants/enums'

async function updateExercise() {
  const id = 'TEST-TEST-TEST'
  let result = null
  try {
    result = await database.updateExerciseById(id, {
      id: 'TEST-TEST-TES1',
    })
  } catch (e) {
    console.error(e)
  }
  console.log(result)
}
</script>

<template>
  <h1>Dashboard</h1>
  <QBtn color="primary" label="Update Exercise" @click="updateExercise()" />
</template>
