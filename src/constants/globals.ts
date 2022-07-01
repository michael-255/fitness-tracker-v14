import { DBTable } from './enums'

export const DEBUG = Object.freeze(true)

/**
 * Indices for LocalDatabase (Dexie)
 */
export const databaseTableIndices = Object.freeze({
  [DBTable.MEASUREMENTS]: '&id, name, status',
  [DBTable.EXERCISES]: '&id, name, status',
  [DBTable.WORKOUTS]: '&id, name, status',
  [DBTable.MEASUREMENT_RECORDS]: '&id, parentId',
  [DBTable.EXERCISE_RECORDS]: '&id, parentId',
  [DBTable.WORKOUT_RECORDS]: '&id, parentId',
  [DBTable.ACTIVE_EXERCISES]: '&id, parentId',
  [DBTable.ACTIVE_WORKOUTS]: '&id, parentId',
  [DBTable.APP_LOGS]: '&id, createdAt',
})
