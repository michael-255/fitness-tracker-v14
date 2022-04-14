<script setup lang="ts">
import { QBtn } from 'quasar'
import { database } from '@/services/LocalDatabase'
import { Exercise } from '@/models/Exercise'
import { ExerciseRecord } from '@/models/ExerciseRecord'

async function addExercise() {
  const result = await database.addExercise(new Exercise({ name: 'New Exercise' }))
  console.log(result)
}

async function addDupeExercise() {
  try {
    const exercise = new Exercise({
      id: '1RN4-R3FN-4DJ5',
      name: 'Dupelicate Exercise?',
    })
    const result = await database.addExercise(exercise)
    console.log(result)
  } catch (error) {
    console.error('Failed to add Exercise into database:', error)
  }
}

function addExerciseRecord() {
  database.addExerciseRecord(new ExerciseRecord({ parentId: '1RN4-R3FN-4DJ5' }))
}

async function printNewestExerciseRecord() {
  console.log(await database.getNewestExerciseRecordByParentId('K4X9-FK36-TMAW'))
}

async function printExerciseRecordsByParentId() {
  console.log(await database.getExerciseRecordsByParentId('K4X9-FK36-TMAW'))
}

async function printGetExerciseRecords() {
  console.log(await database.getExerciseRecords())
}

async function getWorkoutExercises() {
  console.log(await database.getWorkoutExercises(['1RN4-R3FN-4DJ5', '7SQD-JM5S-0DY3', '1234']))
  console.log(await database.getWorkoutExercises(['1234', 'abcd']))
}

async function printUpdateExercise() {
  console.log(
    await database.updateExercise('YHV2-L3HO-OWW1', {
      name: 'Testing',
      trackConfirm: true,
      trackDistance: true,
    })
  )
}
</script>

<template>
  <h3>About View</h3>
  <QBtn color="primary" label="Add Exercise" @click="addExercise()" />
  <QBtn color="primary" label="Add ExerciseRecord" @click="addExerciseRecord()" />
  <QBtn color="primary" label="print Newest ExerciseRecord" @click="printNewestExerciseRecord()" />
  <QBtn color="primary" label="get Workout Exercises" @click="getWorkoutExercises()" />
  <QBtn
    color="primary"
    label="print ExerciseRecords ByParentId"
    @click="printExerciseRecordsByParentId()"
  />
  <QBtn color="primary" label="print Get ExerciseRecords" @click="printGetExerciseRecords()" />
  <QBtn color="warning" label="add Dupe Exercise" @click="addDupeExercise()" />
  <QBtn color="negative" label="print Update Exercise" @click="printUpdateExercise()" />
</template>
