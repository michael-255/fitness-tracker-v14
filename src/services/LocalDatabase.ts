import Dexie, { type IndexableType, type Table } from 'dexie'
import type {
  IEntity,
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
 * @arg name Database name
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

  /**
   * @todo
   * Gets
   * - Return empty object if nothing found
   * - Log info that nothing was found
   * Deletes
   * - Return deleted object if found
   * - Log info what was deleted
   * - Return something if no object was found to delete?
   * - Log info that delete object was not found
   */

  //
  // Get
  //

  async getAll<T>(table: DBTable): Promise<T[]> {
    return await this.table(table).toArray()
  }

  async getById<T>(table: DBTable, id: Id): Promise<T | undefined> {
    return await this.table(table).where('id').equalsIgnoreCase(id).first()
  }

  async getByName(table: DBTable, name: ActivityName): Promise<IActivity[]> {
    return await this.table(table).where('name').equalsIgnoreCase(name).toArray()
  }

  async getByParentId(table: DBTable, parentId: Id): Promise<IRecord[]> {
    return await this.table(table).where('parentId').equalsIgnoreCase(parentId).sortBy('createdAt')
  }

  async getNewestByParentId(table: DBTable, parentId: Id): Promise<IRecord | undefined> {
    return (
      await this.table(table).where('parentId').equalsIgnoreCase(parentId).sortBy('createdAt')
    ).reverse()[0]
  }

  async bulkGetByIds<T>(table: DBTable, ids: Id[]): Promise<T[]> {
    // Filters out falsy values and casts the result type
    return (await this.table(table).bulkGet(ids)).filter(Boolean) as T[]
  }

  //
  // Delete
  //

  async deleteById(table: DBTable, id: Id): Promise<void> {
    return await this.table(table).delete(id)
  }

  async clear(table: DBTable): Promise<void> {
    return await this.table(table).clear()
  }

  //
  // Add
  //

  async add(table: DBTable, item: IEntity): Promise<IndexableType> {
    return await this.table(table).add(item)
  }

  async bulkAdd(table: DBTable, items: IEntity[]): Promise<IndexableType> {
    return await this.table(table).bulkAdd(items)
  }

  //
  // Update
  //

  async updateById(table: DBTable, id: Id, properties: IEntity): Promise<IndexableType> {
    return await this.table(table).update(id, properties)
  }

  //
  // AppLogs
  //

  async addAppLog(params: AppLogParams): Promise<IndexableType> {
    return await this.table(DBTable.APP_LOGS).add(new AppLog(params))
  }
}

/**
 * Preconfigured LocalDatabase
 */
export const database = new LocalDatabase('FitnessTracker')
