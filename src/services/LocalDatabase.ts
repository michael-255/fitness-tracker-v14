import Dexie, { type IndexableType, type Table } from 'dexie'
import type {
  IActivity,
  IRecord,
  IAppLog,
  IMeasurement,
  IExercise,
  IWorkout,
  IMeasurementRecord,
  IExerciseRecord,
  IWorkoutRecord,
} from '@/constants/interfaces'
import type { Id, AppLogParams, ActivityName } from '@/constants/types'
import { DBTable } from '@/constants/enums'
import { Measurement, measurementTableIndices } from '@/models/Measurement'
import { Exercise, exerciseTableIndices } from '@/models/Exercise'
import { Workout, workoutTableIndices } from '@/models/Workout'
import { MeasurementRecord, measurementRecordTableIndices } from '@/models/MeasurementRecord'
import { ExerciseRecord, exerciseRecordTableIndices } from '@/models/ExerciseRecord'
import { WorkoutRecord, workoutRecordTableIndices } from '@/models/WorkoutRecord'
import { AppLog, appLogTableIndices } from '@/models/AppLog'

/**
 * Wrapper for Dexie IndexedDB
 * @param name Database name
 */
export class LocalDatabase extends Dexie {
  // Information for the typing system to help Dexie out
  [DBTable.MEASUREMENTS]!: Table<IMeasurement>;
  [DBTable.EXERCISES]!: Table<IExercise>;
  [DBTable.WORKOUTS]!: Table<IWorkout>;
  [DBTable.MEASUREMENT_RECORDS]!: Table<IMeasurementRecord>;
  [DBTable.EXERCISE_RECORDS]!: Table<IExerciseRecord>;
  [DBTable.WORKOUT_RECORDS]!: Table<IWorkoutRecord>;
  [DBTable.ACTIVE_EXERCISES]!: Table<IExerciseRecord>;
  [DBTable.ACTIVE_WORKOUTS]!: Table<IWorkoutRecord>;
  [DBTable.APP_LOGS]!: Table<IAppLog>

  constructor(name: string) {
    super(name)

    this.version(1).stores({
      ...measurementTableIndices,
      ...exerciseTableIndices,
      ...workoutTableIndices,
      ...measurementRecordTableIndices,
      ...exerciseRecordTableIndices,
      ...workoutRecordTableIndices,
      ...appLogTableIndices,
    })

    this[DBTable.MEASUREMENTS].mapToClass(Measurement)
    this[DBTable.EXERCISES].mapToClass(Exercise)
    this[DBTable.WORKOUTS].mapToClass(Workout)
    this[DBTable.MEASUREMENT_RECORDS].mapToClass(MeasurementRecord)
    this[DBTable.EXERCISE_RECORDS].mapToClass(ExerciseRecord)
    this[DBTable.WORKOUT_RECORDS].mapToClass(WorkoutRecord)
    this[DBTable.ACTIVE_EXERCISES].mapToClass(ExerciseRecord)
    this[DBTable.ACTIVE_WORKOUTS].mapToClass(WorkoutRecord)
    this[DBTable.APP_LOGS].mapToClass(AppLog)
  }

  //
  // Get
  //

  async getAll<T>(table: DBTable): Promise<T[]> {
    return await this.table(table).toArray()
  }

  async getById<T>(table: DBTable, id: Id): Promise<T | undefined> {
    return await this.table(table).where('id').equalsIgnoreCase(id).first()
  }

  /**
   * @todo Confirm if interface is okay
   */
  async getByName(table: DBTable, name: ActivityName): Promise<IActivity[]> {
    return await this.table(table).where('name').equalsIgnoreCase(name).toArray()
  }

  /**
   * @todo Confirm if interface is okay
   */
  async getByParentId(table: DBTable, parentId: Id): Promise<IRecord[]> {
    return await this.table(table).where('parentId').equalsIgnoreCase(parentId).sortBy('createdAt')
  }

  /**
   * @todo Confirm if interface is okay
   */
  async getNewestByParentId(table: DBTable, parentId: Id): Promise<IRecord | undefined> {
    return (
      await this.table(table).where('parentId').equalsIgnoreCase(parentId).sortBy('createdAt')
    ).reverse()[0]
  }

  /**
   * @todo CONFIRM as T[] still needed
   * @param table
   * @param ids
   * @returns
   */
  async bulkGetByIds<T>(table: DBTable, ids: Id[]): Promise<T[]> {
    // Filters out falsy values and casts the result type
    return (await this.table(table).bulkGet(ids)).filter(Boolean) as T[]
  }

  //
  // Delete
  //

  /**
   * @todo FIX TESTS
   *
   * Delete item in table by id.
   * @param table
   * @param id
   * @returns item that was deleted or undefined
   */
  async deleteById<T>(table: DBTable, id: Id): Promise<T | undefined> {
    const itemToDelete: T | undefined = await database.getById(table, id)

    if (itemToDelete) {
      await database.deleteById<T>(table, id)
      return itemToDelete
    } else {
      return undefined
    }
    // return await this.table(table).delete(id)
  }

  async clear(table: DBTable): Promise<void> {
    return await this.table(table).clear()
  }

  //
  // Add
  //

  /**
   * Add item to database table.
   * @param table
   * @param item
   * @returns id of the new item
   */
  async add<T>(table: DBTable, item: T): Promise<IndexableType> {
    return await this.table(table).add(item)
  }

  async bulkAdd<T>(table: DBTable, items: T[]): Promise<IndexableType> {
    return await this.table(table).bulkAdd(items)
  }

  //
  // Update
  //

  /**
   * Update provided properties on table item by id.
   * @param table
   * @param id
   * @param properties
   * @returns 1 on a successful update
   */
  async updateById<T>(table: DBTable, id: Id, properties: T): Promise<IndexableType> {
    return await this.table(table).update(id, properties)
  }

  //
  // AppLogs
  //

  /**
   * @todo This won't be needed anymore
   */
  async addAppLog(params: AppLogParams): Promise<IndexableType> {
    return await this.table(DBTable.APP_LOGS).add(new AppLog(params))
  }
}

/**
 * Preconfigured LocalDatabase
 */
export const database = new LocalDatabase('FitnessTracker')
