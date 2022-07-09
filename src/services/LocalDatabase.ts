import Dexie, { type IndexableType, type Table } from 'dexie'
import { databaseTableIndices } from '@/constants/globals'
import { Measurement } from '@/models/Measurement'
import { Exercise } from '@/models/Exercise'
import { Workout } from '@/models/Workout'
import { MeasurementRecord } from '@/models/MeasurementRecord'
import { ExerciseRecord } from '@/models/ExerciseRecord'
import { WorkoutRecord } from '@/models/WorkoutRecord'
import { AppLog } from '@/models/AppLog'
import { ActivityStatus, DBTable, RecordStatus } from '@/constants/enums'

/**
 * Wrapper for Dexie IndexedDB
 * @param name Database name
 */
export class LocalDatabase extends Dexie {
  // Information for the typing system to help Dexie out
  [DBTable.MEASUREMENTS]!: Table<Partial<Measurement>>;
  [DBTable.EXERCISES]!: Table<Partial<Exercise>>;
  [DBTable.WORKOUTS]!: Table<Partial<Workout>>;
  [DBTable.MEASUREMENT_RECORDS]!: Table<Partial<MeasurementRecord>>;
  [DBTable.EXERCISE_RECORDS]!: Table<Partial<ExerciseRecord>>;
  [DBTable.WORKOUT_RECORDS]!: Table<Partial<WorkoutRecord>>;
  [DBTable.APP_LOGS]!: Table<Partial<AppLog>>

  constructor(name: string) {
    super(name)

    this.version(1).stores({ ...databaseTableIndices })

    this[DBTable.MEASUREMENTS].mapToClass(Measurement)
    this[DBTable.EXERCISES].mapToClass(Exercise)
    this[DBTable.WORKOUTS].mapToClass(Workout)
    this[DBTable.MEASUREMENT_RECORDS].mapToClass(MeasurementRecord)
    this[DBTable.EXERCISE_RECORDS].mapToClass(ExerciseRecord)
    this[DBTable.WORKOUT_RECORDS].mapToClass(WorkoutRecord)
    this[DBTable.APP_LOGS].mapToClass(AppLog)
  }

  /**
   * Get all items from table.
   * @param table
   * @returns Array of all table items
   */
  async getAll<Measurement>(table: DBTable.MEASUREMENTS): Promise<Measurement[]>
  async getAll<Exercise>(table: DBTable.EXERCISES): Promise<Exercise[]>
  async getAll<Workout>(table: DBTable.WORKOUTS): Promise<Workout[]>
  async getAll<MeasurementRecord>(table: DBTable.MEASUREMENT_RECORDS): Promise<MeasurementRecord[]>
  async getAll<ExerciseRecord>(table: DBTable.EXERCISE_RECORDS): Promise<ExerciseRecord[]>
  async getAll<WorkoutRecord>(table: DBTable.WORKOUT_RECORDS): Promise<WorkoutRecord[]>
  async getAll<AppLog>(table: DBTable.APP_LOGS): Promise<AppLog[]>
  async getAll<T>(table: DBTable): Promise<T[]> {
    return await this.table(table).toArray()
  }

  /**
   * Get item from table by id.
   * @param table
   * @param id
   * @returns Single item or undefined
   */
  async getById<T>(table: DBTable, id: string): Promise<T | undefined> {
    return await this.table(table).where('id').equalsIgnoreCase(id).first()
  }

  /**
   * Get Activities from table by name.
   * @param table
   * @param name
   * @returns Array of Activities
   */
  async getActivitiesByName<T>(table: DBTable, name: string): Promise<T[]> {
    return await this.table(table).where('name').equalsIgnoreCase(name).toArray()
  }

  /**
   * Get Activities from table by status.
   * @param table
   * @param status
   * @returns Array of Activities
   */
  async getActivitiesByStatus<T>(table: DBTable, status: ActivityStatus): Promise<T[]> {
    return await this.table(table).where('status').equalsIgnoreCase(status).toArray()
  }

  /**
   * Get Records from table by status.
   * @param table
   * @param status
   * @returns Array of Records
   */
  async getRecordsByStatus<T>(table: DBTable, status: RecordStatus): Promise<T[]> {
    return await this.table(table).where('status').equalsIgnoreCase(status).toArray()
  }

  /**
   * Get Records from table by parentId.
   * @param table
   * @param parentId
   * @returns Array of Records
   */
  async getRecordsByParentId<T>(table: DBTable, parentId: string): Promise<T[]> {
    return await this.table(table).where('parentId').equalsIgnoreCase(parentId).sortBy('createdAt')
  }

  /**
   * Get newest Records from table by parentId.
   * @param table
   * @param parentId
   * @returns Newest Record or undefined
   */
  async getNewestRecordByParentId<T>(table: DBTable, parentId: string): Promise<T | undefined> {
    return (
      await this.table(table).where('parentId').equalsIgnoreCase(parentId).sortBy('createdAt')
    ).reverse()[0]
  }

  /**
   * Get items from table by array of ids.
   * @param table
   * @param ids
   * @returns Array of items
   */
  async bulkGetByIds<T>(table: DBTable, ids: string[]): Promise<T[]> {
    // Filters out falsy values
    return (await this.table(table).bulkGet(ids)).filter(Boolean)
  }

  /**
   * Delete item in table by id.
   * @param table
   * @param id
   * @returns undefined even if nothing was deleted
   */
  async deleteById<T>(table: DBTable, id: string): Promise<T | undefined> {
    const itemToDelete: T | undefined = await this.table(table)
      .where('id')
      .equalsIgnoreCase(id)
      .first()

    if (itemToDelete) {
      await this.table(table).delete(id)
      return itemToDelete
    } else {
      return undefined
    }
  }

  /**
   * Clears all items from table.
   * @param table
   * @returns undefined
   */
  async clear(table: DBTable): Promise<void> {
    return await this.table(table).clear()
  }

  /**
   * Add item to table.
   * @param table
   * @param item
   * @returns Id of new item
   */
  async add<T>(table: DBTable, item: T): Promise<IndexableType> {
    return await this.table(table).add(item)
  }

  /**
   * Add items to table.
   * @param table
   * @param items
   * @returns Array of new item ids
   */
  async bulkAdd<T>(table: DBTable, items: T[]): Promise<IndexableType[]> {
    return await this.table(table).bulkAdd(items, { allKeys: true })
  }

  /**
   * Update provided properties on table item by id.
   * @param table
   * @param id
   * @param properties
   * @returns 1 on a successful update
   */
  async updateById<T>(table: DBTable, id: string, props: Partial<T>): Promise<IndexableType> {
    return await this.table(table).update(id, props)
  }
}

/**
 * Preconfigured LocalDatabase
 */
export const database = new LocalDatabase('FitnessTracker')
