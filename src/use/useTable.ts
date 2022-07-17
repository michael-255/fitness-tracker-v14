import { DBTable, FieldName } from '@/constants/enums'
import { AppLog } from '@/models/AppLog'
import { Exercise } from '@/models/Exercise'
import { ExerciseRecord } from '@/models/ExerciseRecord'
import type { Measurement } from '@/models/Measurement'
import type { MeasurementRecord } from '@/models/MeasurementRecord'
import { Workout } from '@/models/Workout'
import { WorkoutRecord } from '@/models/WorkoutRecord'
import type { _Activity } from '@/models/_Activity'
import type { _Entity } from '@/models/_Entity'
import type { _Record } from '@/models/_Record'
import { truncateString } from '@/utils/common'
import { DateTime } from 'luxon'

/**
 * @todo
 * @returns
 */
export function useTable() {
  /**
   * @todo
   */
  function getEntityColumns(): { [x: string]: any }[] {
    return [
      {
        name: FieldName.ID,
        label: 'Id',
        align: 'left',
        required: true,
        field: (row: _Entity) => row.id,
        sortable: true,
      },
      {
        name: FieldName.CREATED_AT,
        label: 'Created Date',
        align: 'left',
        field: (row: _Entity) => row.createdAt,
        format: (val: string) => DateTime.fromISO(val).toFormat('ccc LLL d yyyy ttt'),
        sortable: true,
      },
    ]
  }

  /**
   * @todo
   */
  function getActivityColumns(): { [x: string]: any }[] {
    return [
      ...getEntityColumns(),
      {
        name: FieldName.NAME,
        label: 'Name',
        align: 'left',
        field: (row: _Activity) => row.name,
        format: (val: string) => truncateString(val),
        sortable: true,
      },
      {
        name: FieldName.DESCRIPTION,
        label: 'Description',
        align: 'left',
        field: (row: _Activity) => row.description,
        format: (val: string) => truncateString(val),
        sortable: true,
      },
      {
        name: 'activityStatus',
        label: 'Status',
        align: 'left',
        field: (row: _Activity) => row.activityStatus,
        sortable: true,
      },
    ]
  }

  /**
   * @todo
   */
  function getRecordColumns(): { [x: string]: any }[] {
    return [
      ...getEntityColumns(),
      {
        name: 'parentId',
        label: 'Parent Id',
        align: 'left',
        field: (row: _Record) => row.parentId,
        sortable: true,
      },
      {
        name: 'note',
        label: 'Note',
        align: 'left',
        field: (row: _Record) => row.note,
        format: (val: string) => truncateString(val),
        sortable: true,
      },
      {
        name: 'recordStatus',
        label: 'Status',
        align: 'left',
        field: (row: _Record) => row.recordStatus,
        sortable: true,
      },
    ]
  }

  /**
   * @todo
   */
  function getMeasurementColumns(): { [x: string]: any }[] {
    return [
      ...getActivityColumns(),
      {
        name: FieldName.MEASUREMENT_TYPE,
        label: 'Type',
        align: 'left',
        field: (row: Measurement) => row.measurementType,
        sortable: true,
      },
    ]
  }

  /**
   * @todo
   */
  function getMeasurementRecordColumns(): { [x: string]: any }[] {
    return [
      ...getRecordColumns(),
      {
        name: 'parentType',
        label: 'Parent Type',
        align: 'left',
        field: (row: MeasurementRecord) => row.parentType,
        sortable: true,
      },
      {
        name: 'value',
        label: 'Value',
        align: 'left',
        field: (row: MeasurementRecord) => row.value,
        sortable: true,
      },
    ]
  }

  /**
   * Determines the default fields that are visible on a table.
   */
  function getEntityVisibleColumns(): string[] {
    return []
  }
  function getActivityVisibleColumns(): string[] {
    return [...getEntityVisibleColumns(), FieldName.NAME]
  }
  function getRecordVisibleColumns(): string[] {
    return [...getEntityVisibleColumns()]
  }
  function getMeasurementVisibleColumns(): string[] {
    return [...getActivityVisibleColumns()]
  }
  function getMeasurementRecordVisibleColumns(): string[] {
    return [...getRecordVisibleColumns(), 'parentType', 'value']
  }

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
  function getTableLabel(table: DBTable, plural = true): string {
    const pluralize = (): 's' | '' => (plural ? 's' : '')

    switch (table) {
      case DBTable.MEASUREMENTS:
        return 'Measurement' + pluralize()
      case DBTable.MEASUREMENT_RECORDS:
        return 'Measurement Record' + pluralize()
      case DBTable.EXERCISES:
        return 'Exercise' + pluralize()
      case DBTable.EXERCISE_RECORDS:
        return 'Exercise Record' + pluralize()
      case DBTable.WORKOUTS:
        return 'Workout' + pluralize()
      case DBTable.WORKOUT_RECORDS:
        return 'Workout Record' + pluralize()
      case DBTable.APP_LOGS:
        return 'App Log' + pluralize()
    }
  }

  /**
   * @todo
   */
  function getTableColumns(table: DBTable): any[] | undefined {
    switch (table) {
      case DBTable.MEASUREMENTS:
        return getMeasurementColumns()
      case DBTable.MEASUREMENT_RECORDS:
        return getMeasurementRecordColumns()
      // case DBTable.EXERCISES:
      //   return Exercise.getTableColumns()
      // case DBTable.EXERCISE_RECORDS:
      //   return ExerciseRecord.getTableColumns()
      // case DBTable.WORKOUTS:
      //   return Workout.getTableColumns()
      // case DBTable.WORKOUT_RECORDS:
      //   return WorkoutRecord.getTableColumns()
      // case DBTable.APP_LOGS:
      //   return AppLog.getTableColumns()
    }
  }

  /**
   * @todo
   */
  function getTableColumnOptions(table: DBTable): any[] | undefined {
    switch (table) {
      case DBTable.MEASUREMENTS:
        return getMeasurementColumns().filter((i: any) => i.name !== FieldName.ID)
      case DBTable.MEASUREMENT_RECORDS:
        return getMeasurementRecordColumns().filter((i: any) => i.name !== FieldName.ID)
      // case DBTable.EXERCISES:
      //   return Exercise.getColumnOptions()
      // case DBTable.EXERCISE_RECORDS:
      //   return ExerciseRecord.getColumnOptions()
      // case DBTable.WORKOUTS:
      //   return Workout.getColumnOptions()
      // case DBTable.WORKOUT_RECORDS:
      //   return WorkoutRecord.getColumnOptions()
      // case DBTable.APP_LOGS:
      //   return AppLog.getColumnOptions()
    }
  }

  /**
   * @todo
   */
  function getTableVisibleColumns(table: DBTable): string[] | undefined {
    switch (table) {
      case DBTable.MEASUREMENTS:
        return getMeasurementVisibleColumns()
      case DBTable.MEASUREMENT_RECORDS:
        return getMeasurementRecordVisibleColumns()
      // case DBTable.EXERCISES:
      //   return Exercise.getVisibleColumns()
      // case DBTable.EXERCISE_RECORDS:
      //   return ExerciseRecord.getVisibleColumns()
      // case DBTable.WORKOUTS:
      //   return Workout.getVisibleColumns()
      // case DBTable.WORKOUT_RECORDS:
      //   return WorkoutRecord.getVisibleColumns()
      // case DBTable.APP_LOGS:
      //   return AppLog.getVisibleColumns()
    }
  }

  return {
    isActivityTable,
    isRecordTable,
    getTableLabel,
    getTableColumns,
    getTableColumnOptions,
    getTableVisibleColumns,
  }
}
