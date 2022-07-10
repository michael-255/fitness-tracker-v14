import { DBTable } from '@/constants/enums'

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

  /**
   * Text label of the type of database item in the table.
   */
  function getTableTypeLabel(table: DBTable): string {
    switch (table) {
      case DBTable.MEASUREMENTS:
        return 'Measurement'
      case DBTable.MEASUREMENT_RECORDS:
        return 'Measurement Record'
      case DBTable.EXERCISES:
        return 'Exercise'
      case DBTable.EXERCISE_RECORDS:
        return 'Exercise Record'
      case DBTable.WORKOUTS:
        return 'Workout'
      case DBTable.WORKOUT_RECORDS:
        return 'Workout Record'
      case DBTable.APP_LOGS:
        return 'App Log'
      default:
        throw new Error('Invalid table passed to getTableTypeLabel')
    }
  }

  return {
    isActivityTable,
    isRecordTable,
    getTableTypeLabel,
  }
}
