import { DBTable } from './enums'

export const DEBUG: Readonly<boolean> = true

/**
 * Indices for LocalDatabase (Dexie)
 */
export const databaseTableIndices: Readonly<object> = {
  [DBTable.MEASUREMENTS]: '&id, name, status',
  [DBTable.EXERCISES]: '&id, name, status',
  [DBTable.WORKOUTS]: '&id, name, status',
  [DBTable.MEASUREMENT_RECORDS]: '&id, parentId, status',
  [DBTable.EXERCISE_RECORDS]: '&id, parentId, status',
  [DBTable.WORKOUT_RECORDS]: '&id, parentId, status',
  [DBTable.APP_LOGS]: '&id',
}
