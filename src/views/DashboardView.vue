<script setup lang="ts">
import { QBtn } from 'quasar'
import { Views } from '@/constants'
import { createId } from '@/utils/build-id'
import { database } from '@/services/LocalDatabase'
import { Store } from '@/constants'
import { ExerciseRecord } from '@/models/ExerciseRecord'
import { Exercise } from '@/models/Exercise'
import { Workout } from '@/models/Workout'
import { ErrorLog } from '@/models/ErrorLog'
import { ActionStatus } from '@/models/_Action'

/*
  async getAll<T>(store: Store): Promise<T[]> {
    return await this.table(store).toArray()
  }

  async getById<T>(store: Store, id: string): Promise<T | undefined> {
    return await this.table(store).where('id').equalsIgnoreCase(id).first()
  }

  async add<T>(store: Store, object: T): Promise<IndexableType> {
    return await this.table(store).add(object)
  }

  async deleteById(store: Store, id: string): Promise<void> {
    return await this.table(store).delete(id)
  }

  async clear(store: Store): Promise<void> {
    return await this.table(store).clear()
  }
*/

async function addThing() {
  try {
    const id = createId()
    console.log(
      await database.addExerciseRecord(
        new ExerciseRecord({
          parentId: 'UI04-JXKJ-VD5N',
        })
      )
    )
    console.log(await database.addExercise(new Exercise({ name: `Test Exercise ${id}` })))
    console.log(await database.addWorkout(new Workout({ name: `Test Workout ${id}` })))
    console.log(await database.addWorkout(new Workout({ name: `Test Workout ${id}`, status: ActionStatus.ARCHIVED })))
    console.log(await database.addExercise(new Exercise({ id: 'UI04-JXKJ-VD5N', name: 'Duplicate Id!' })))
  } catch (err) {
    console.error(err)
    database.addErrorLog(new ErrorLog(err as Error))
  }
}

async function getThings() {
  try {
    console.log(await database.getAll(Store.EXERCISES))
    console.log(await database.getById(Store.ERROR_LOGS, 'W3CE-1UH8-KSUW'))
    console.log(await database.deleteById(Store.EXERCISES, 'UI04-JXKJ-VD5N'))
    console.log(await database.clear(Store.WORKOUTS))
  } catch (err) {
    console.error(err)
    database.addErrorLog(new ErrorLog(err as Error))
  }
}

async function getByStatus() {
  try {
    console.log(await database.getByStatus(Store.WORKOUTS, ActionStatus.ARCHIVED))
    console.log(await database.getByStatus(Store.ERROR_LOGS, ActionStatus.DISABLED))
  } catch (err) {
    console.error(err)
    database.addErrorLog(new ErrorLog(err as Error))
  }
}

async function getNewestByParentId() {
  try {
    console.log(await database.getNewestByParentId(Store.EXERCISE_RECORDS, 'UI04-JXKJ-VD5N'))
    console.log(await database.bulkGetByIds(Store.ERROR_LOGS, ['65JW-C030-UWBZ', 'W3CE-1UH8-KSUW']))
    console.log(await database.bulkGetByIds(Store.ERROR_LOGS, ['bad-id']))
  } catch (err) {
    console.error(err)
    database.addErrorLog(new ErrorLog(err as Error))
  }
}
</script>

<template>
  <h3>Dashboard View</h3>
  <QBtn color="primary" label="add Thing" @click="addThing()" />
  <br />
  <QBtn color="primary" label="get Things" @click="getThings()" />
  <br />
  <QBtn color="primary" label="get by status" @click="getByStatus()" />
  <br />
  <QBtn color="primary" label="getNewestByParentId" @click="getNewestByParentId()" />
  <br />
</template>
