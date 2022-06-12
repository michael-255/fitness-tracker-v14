import Dexie, { type IndexableType } from 'dexie'
import type { Table } from 'dexie'
// Database Stores
import { Store } from '@/constants'
import type { ActivityStatus } from '@/models/_Activity'
import { Measurement, measurementStoreIndices } from '@/models/Measurement'
import type { IMeasurement, IUpdateMeasurement } from '@/models/Measurement'
import { Exercise, exerciseStoreIndices } from '@/models/Exercise'
import type { IExercise, IUpdateExercise } from '@/models/Exercise'
import { Workout, workoutStoreIndices } from '@/models/Workout'
import type { IWorkout, IUpdateWorkout } from '@/models/Workout'
import { MeasurementRecord, measurementRecordStoreIndices } from '@/models/MeasurementRecord'
import type { IMeasurementRecord, IUpdateMeasurementRecord } from '@/models/MeasurementRecord'
import { ExerciseRecord, exerciseRecordStoreIndices } from '@/models/ExerciseRecord'
import type { IExerciseRecord, IUpdateExerciseRecord } from '@/models/ExerciseRecord'
import { WorkoutRecord, workoutRecordStoreIndices } from '@/models/WorkoutRecord'
import type { IWorkoutRecord, IUpdateWorkoutRecord } from '@/models/WorkoutRecord'
import { AppLog, errorLogStoreIndices } from '@/models/AppLog'
import type { appLogParams } from '@/models/AppLog'
import type { IAppLog } from '@/models/AppLog'

/**
 * Wrapper for Dexie IndexedDB
 * @arg name Database name
 */
export class LocalDatabase extends Dexie {
  // Information for the typing system to help Dexie out
  [Store.MEASUREMENTS]!: Table<IMeasurement>;
  [Store.EXERCISES]!: Table<IExercise>;
  [Store.WORKOUTS]!: Table<IWorkout>;
  [Store.MEASUREMENT_RECORDS]!: Table<IMeasurementRecord>;
  [Store.EXERCISE_RECORDS]!: Table<IExerciseRecord>;
  [Store.WORKOUT_RECORDS]!: Table<IWorkoutRecord>;
  [Store.ACTIVE_EXERCISES]!: Table<IExerciseRecord>;
  [Store.ACTIVE_WORKOUTS]!: Table<IWorkoutRecord>;
  [Store.APP_LOGS]!: Table<IAppLog>

  constructor(name: string) {
    super(name)

    this.version(1).stores({
      ...measurementStoreIndices,
      ...exerciseStoreIndices,
      ...workoutStoreIndices,
      ...measurementRecordStoreIndices,
      ...exerciseRecordStoreIndices,
      ...workoutRecordStoreIndices,
      ...errorLogStoreIndices,
    })

    this[Store.MEASUREMENTS].mapToClass(Measurement)
    this[Store.EXERCISES].mapToClass(Exercise)
    this[Store.WORKOUTS].mapToClass(Workout)
    this[Store.MEASUREMENT_RECORDS].mapToClass(MeasurementRecord)
    this[Store.EXERCISE_RECORDS].mapToClass(ExerciseRecord)
    this[Store.WORKOUT_RECORDS].mapToClass(WorkoutRecord)
    this[Store.ACTIVE_EXERCISES].mapToClass(ExerciseRecord)
    this[Store.ACTIVE_WORKOUTS].mapToClass(WorkoutRecord)
    this[Store.APP_LOGS].mapToClass(AppLog)
  }

  //
  // Shared Methods
  //

  async getAll<T>(store: Store): Promise<T[]> {
    return await this.table(store).toArray()
  }

  async getById<T>(store: Store, id: string): Promise<T | undefined> {
    return await this.table(store).where('id').equalsIgnoreCase(id).first()
  }

  async getByStatus<T>(store: Store, status: ActivityStatus): Promise<T[]> {
    return await this.table(store).where('status').equalsIgnoreCase(status).toArray()
  }

  async getByName(store: Store, name: string): Promise<IExercise[]> {
    return await this.table(store).where('name').equalsIgnoreCase(name).toArray()
  }

  async getByParentId<T>(store: Store, parentId: string): Promise<T[]> {
    return await this.table(store).where('parentId').equalsIgnoreCase(parentId).sortBy('createdAt')
  }

  async getNewestByParentId<T>(store: Store, parentId: string): Promise<T | undefined> {
    return (
      await this.table(store).where('parentId').equalsIgnoreCase(parentId).sortBy('createdAt')
    ).reverse()[0]
  }

  async bulkGetByIds<T>(store: Store, ids: string[]): Promise<T[]> {
    // Filters out falsy values and casts the result type
    return (await this.table(store).bulkGet(ids)).filter(Boolean) as T[]
  }

  async deleteById(store: Store, id: string): Promise<void> {
    return await this.table(store).delete(id)
  }

  async clear(store: Store): Promise<void> {
    return await this.table(store).clear()
  }

  //
  // Measurement
  //

  async addMeasurement(measurement: IMeasurement): Promise<IndexableType> {
    return await this.table(Store.MEASUREMENTS).add(measurement)
  }

  async bulkAddMeasurements(items: IMeasurement[]): Promise<IndexableType> {
    return await this.table(Store.MEASUREMENTS).bulkAdd(items)
  }

  async updateMeasurementById(id: string, properties: IUpdateMeasurement): Promise<IndexableType> {
    return await this.table(Store.MEASUREMENTS).update(id, properties)
  }

  //
  // MeasurementRecord
  //

  async addMeasurementRecord(measurementRecord: IMeasurementRecord): Promise<IndexableType> {
    return await this.table(Store.MEASUREMENT_RECORDS).add(measurementRecord)
  }

  async bulkAddMeasurementRecords(items: IMeasurementRecord[]): Promise<IndexableType> {
    return await this.table(Store.MEASUREMENT_RECORDS).bulkAdd(items)
  }

  async updateMeasurementRecordById(
    id: string,
    properties: IUpdateMeasurementRecord
  ): Promise<IndexableType> {
    return await this.table(Store.MEASUREMENT_RECORDS).update(id, properties)
  }

  //
  // Exercise
  //

  async addExercise(exercise: IExercise): Promise<IndexableType> {
    return await this.table(Store.EXERCISES).add(exercise)
  }

  async bulkAddExercises(items: IExercise[]): Promise<IndexableType> {
    return await this.table(Store.EXERCISES).bulkAdd(items)
  }

  async updateExerciseById(id: string, properties: IUpdateExercise): Promise<IndexableType> {
    return await this.table(Store.EXERCISES).update(id, properties)
  }

  //
  // ExerciseRecord
  //

  async addExerciseRecord(exerciseRecord: IExerciseRecord): Promise<IndexableType> {
    return await this.table(Store.EXERCISE_RECORDS).add(exerciseRecord)
  }

  async bulkAddExerciseRecords(items: IExerciseRecord[]): Promise<IndexableType> {
    return await this.table(Store.EXERCISE_RECORDS).bulkAdd(items)
  }

  async updateExerciseRecordById(
    id: string,
    properties: IUpdateExerciseRecord
  ): Promise<IndexableType> {
    return await this.table(Store.EXERCISE_RECORDS).update(id, properties)
  }

  //
  // Workouts
  //

  async addWorkout(workout: IWorkout): Promise<IndexableType> {
    return await this.table(Store.WORKOUTS).add(workout)
  }

  async bulkAddWorkouts(items: IWorkout[]): Promise<IndexableType> {
    return await this.table(Store.WORKOUTS).bulkAdd(items)
  }

  async updateWorkoutById(id: string, properties: IUpdateWorkout): Promise<IndexableType> {
    return await this.table(Store.WORKOUTS).update(id, properties)
  }

  //
  // WorkoutRecord
  //

  async addWorkoutRecord(workoutRecord: IWorkoutRecord): Promise<IndexableType> {
    return await this.table(Store.WORKOUT_RECORDS).add(workoutRecord)
  }

  async bulkAddWorkoutRecords(items: IWorkoutRecord[]): Promise<IndexableType> {
    return await this.table(Store.WORKOUT_RECORDS).bulkAdd(items)
  }

  async updateWorkoutRecordById(
    id: string,
    properties: IUpdateWorkoutRecord
  ): Promise<IndexableType> {
    return await this.table(Store.WORKOUT_RECORDS).update(id, properties)
  }

  //
  // ActiveExercises (ExerciseRecord)
  //

  async addActiveExercise(activeExercise: IExerciseRecord): Promise<IndexableType> {
    return await this.table(Store.ACTIVE_EXERCISES).add(activeExercise)
  }

  async bulkAddActiveExercises(items: IExerciseRecord[]): Promise<IndexableType> {
    return await this.table(Store.ACTIVE_EXERCISES).bulkAdd(items)
  }

  async updateActiveExerciseById(
    id: string,
    properties: IUpdateExerciseRecord
  ): Promise<IndexableType> {
    return await this.table(Store.ACTIVE_EXERCISES).update(id, properties)
  }

  //
  // ActiveWorkouts (WorkoutRecord)
  //

  async addActiveWorkout(activeWorkout: IWorkoutRecord): Promise<IndexableType> {
    return await this.table(Store.ACTIVE_WORKOUTS).add(activeWorkout)
  }

  async bulkAddActiveWorkouts(items: IWorkoutRecord[]): Promise<IndexableType> {
    return await this.table(Store.ACTIVE_WORKOUTS).bulkAdd(items)
  }

  async updateActiveWorkoutById(
    id: string,
    properties: IUpdateWorkoutRecord
  ): Promise<IndexableType> {
    return await this.table(Store.ACTIVE_WORKOUTS).update(id, properties)
  }

  //
  // AppLogs
  //

  async addAppLog(appLogParams: appLogParams): Promise<IndexableType> {
    return await this.table(Store.APP_LOGS).add(new AppLog(appLogParams))
  }
}

/**
 * Preconfigured LocalDatabase
 */
export const database = new LocalDatabase('FitnessTracker')
