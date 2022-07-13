import { DBTable } from '@/constants/enums'
import { AppLog } from '@/models/AppLog'
import { Exercise } from '@/models/Exercise'
import { ExerciseRecord } from '@/models/ExerciseRecord'
import { Measurement } from '@/models/Measurement'
import { MeasurementRecord } from '@/models/MeasurementRecord'
import { Workout } from '@/models/Workout'
import { WorkoutRecord } from '@/models/WorkoutRecord'

export function useTableType() {
  /**
   * Returns true if the table type inherts from Activity.
   */
  function isActivityTable(table: DBTable): boolean {
    return (
      table === DBTable.MEASUREMENTS || table === DBTable.EXERCISES || table === DBTable.WORKOUTS
    )
  }

  /**
   * Returns true if the table type inherts from Record.
   */
  function isRecordTable(table: DBTable): boolean {
    return (
      table === DBTable.MEASUREMENT_RECORDS ||
      table === DBTable.EXERCISE_RECORDS ||
      table === DBTable.WORKOUT_RECORDS
    )
  }

  function isNotAppLogTable(table: DBTable): boolean {
    return table !== DBTable.APP_LOGS
  }

  /**
   * Text label of the type of database item in the table.
   */
  function getTableLabel(table: DBTable, plural = true): string {
    let label = ''

    switch (table) {
      case DBTable.MEASUREMENTS:
        label = 'Measurement'
        break
      case DBTable.MEASUREMENT_RECORDS:
        label = 'Measurement Record'
        break
      case DBTable.EXERCISES:
        label = 'Exercise'
        break
      case DBTable.EXERCISE_RECORDS:
        label = 'Exercise Record'
        break
      case DBTable.WORKOUTS:
        label = 'Workout'
        break
      case DBTable.WORKOUT_RECORDS:
        label = 'Workout Record'
        break
      case DBTable.APP_LOGS:
        label = 'App Log'
        break
      default:
        throw new Error(`Invalid table passed to getTableLabel << ${table} >>`)
    }

    if (plural) {
      return label + 's'
    } else {
      return label
    }
  }

  function getTableColumns(table: DBTable): any[] {
    switch (table) {
      case DBTable.MEASUREMENTS:
        return Measurement.getTableColumns()
      case DBTable.MEASUREMENT_RECORDS:
        return MeasurementRecord.getTableColumns()
      case DBTable.EXERCISES:
        return Exercise.getTableColumns()
      case DBTable.EXERCISE_RECORDS:
        return ExerciseRecord.getTableColumns()
      case DBTable.WORKOUTS:
        return Workout.getTableColumns()
      case DBTable.WORKOUT_RECORDS:
        return WorkoutRecord.getTableColumns()
      case DBTable.APP_LOGS:
        return AppLog.getTableColumns()
      default:
        throw new Error(`Invalid table passed to getTableColumns << ${table} >>`)
    }
  }

  function getTableColumnOptions(table: DBTable): any[] {
    switch (table) {
      case DBTable.MEASUREMENTS:
        return Measurement.getColumnOptions()
      case DBTable.MEASUREMENT_RECORDS:
        return MeasurementRecord.getColumnOptions()
      case DBTable.EXERCISES:
        return Exercise.getColumnOptions()
      case DBTable.EXERCISE_RECORDS:
        return ExerciseRecord.getColumnOptions()
      case DBTable.WORKOUTS:
        return Workout.getColumnOptions()
      case DBTable.WORKOUT_RECORDS:
        return WorkoutRecord.getColumnOptions()
      case DBTable.APP_LOGS:
        return AppLog.getColumnOptions()
      default:
        throw new Error(`Invalid table passed to getTableColumnOptions << ${table} >>`)
    }
  }

  function getTableVisibleColumn(table: DBTable): any[] {
    switch (table) {
      case DBTable.MEASUREMENTS:
        return Measurement.getVisibleColumns()
      case DBTable.MEASUREMENT_RECORDS:
        return MeasurementRecord.getVisibleColumns()
      case DBTable.EXERCISES:
        return Exercise.getVisibleColumns()
      case DBTable.EXERCISE_RECORDS:
        return ExerciseRecord.getVisibleColumns()
      case DBTable.WORKOUTS:
        return Workout.getVisibleColumns()
      case DBTable.WORKOUT_RECORDS:
        return WorkoutRecord.getVisibleColumns()
      case DBTable.APP_LOGS:
        return AppLog.getVisibleColumns()
      default:
        throw new Error(`Invalid table passed to getTableVisibleColumn << ${table} >>`)
    }
  }

  return {
    isActivityTable,
    isRecordTable,
    isNotAppLogTable,
    getTableLabel,
    getTableColumns,
    getTableColumnOptions,
    getTableVisibleColumn,
  }
}
