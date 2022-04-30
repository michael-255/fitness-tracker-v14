import Dexie, { type IndexableType } from 'dexie'
import type { Table } from 'dexie'
// Database Stores
import { Store } from '@/constants'
import type { ActionStatus } from '@/models/_Action'
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
import { ErrorLog, errorLogStoreIndices } from '@/models/ErrorLog'
import type { IErrorLog } from '@/models/ErrorLog'

/**
 * Wrapper for Dexie IndexedDB
 * @param name Database name
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
  [Store.ERROR_LOGS]!: Table<IErrorLog>

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
    this[Store.ERROR_LOGS].mapToClass(ErrorLog)
  }

  //
  // Shared Functions
  //

  async getAll<T>(store: Store): Promise<T[]> {
    return await this.table(store).toArray()
  }

  async getById<T>(store: Store, id: string): Promise<T | undefined> {
    return await this.table(store).where('id').equalsIgnoreCase(id).first()
  }

  async getByStatus<T>(store: Store, status: ActionStatus): Promise<T[]> {
    return await this.table(store).where('status').equalsIgnoreCase(status).toArray()
  }

  async getByName(store: Store, name: string): Promise<IExercise[]> {
    return await this.table(store).where('name').equalsIgnoreCase(name).toArray()
  }

  async getByParentId<T>(store: Store, parentId: string): Promise<T[]> {
    return await this.table(store).where('parentId').equalsIgnoreCase(parentId).sortBy('createdAt')
  }

  async getNewestByParentId<T>(store: Store, parentId: string): Promise<T | undefined> {
    return (await this.table(store).where('parentId').equalsIgnoreCase(parentId).sortBy('createdAt')).reverse()[0]
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
    return await this.measurements.add(measurement)
  }

  async updateMeasurementById(id: string, properties: IUpdateMeasurement): Promise<IndexableType> {
    return await this.measurements.update(id, properties)
  }

  //
  // MeasurementRecord
  //

  async addMeasurementRecord(measurementRecord: IMeasurementRecord): Promise<IndexableType> {
    return await this.measurementRecords.add(measurementRecord)
  }

  async updateMeasurementRecordById(id: string, properties: IUpdateMeasurementRecord): Promise<IndexableType> {
    return await this.measurementRecords.update(id, properties)
  }

  //
  // Exercise
  //

  async addExercise(exercise: IExercise): Promise<IndexableType> {
    return await this.exercises.add(exercise)
  }

  async updateExerciseById(id: string, properties: IUpdateExercise): Promise<IndexableType> {
    return await this.exercises.update(id, properties)
  }

  //
  // ExerciseRecord
  //

  async addExerciseRecord(exerciseRecord: IExerciseRecord): Promise<IndexableType> {
    return await this.exerciseRecords.add(exerciseRecord)
  }

  async updateExerciseRecordById(id: string, properties: IUpdateExerciseRecord): Promise<IndexableType> {
    return await this.exerciseRecords.update(id, properties)
  }

  //
  // Workouts
  //

  async addWorkout(workout: IWorkout): Promise<IndexableType> {
    return await this.workouts.add(workout)
  }

  async updateWorkoutById(id: string, properties: IUpdateWorkout): Promise<IndexableType> {
    return await this.workouts.update(id, properties)
  }

  //
  // WorkoutRecord
  //

  async addWorkoutRecord(workoutRecord: IWorkoutRecord): Promise<IndexableType> {
    return await this.workoutRecords.add(workoutRecord)
  }

  async updateWorkoutRecordById(id: string, properties: IUpdateWorkoutRecord): Promise<IndexableType> {
    return await this.workoutRecords.update(id, properties)
  }

  //
  // ActiveExercises (Records)
  //

  async addActiveExercise(activeExercise: IExerciseRecord): Promise<IndexableType> {
    return await this.activeExercises.add(activeExercise)
  }

  async updateActiveExerciseById(id: string, properties: IUpdateExerciseRecord): Promise<IndexableType> {
    return await this.activeExercises.update(id, properties)
  }

  //
  // ActiveWorkouts (Records)
  //

  async addActiveWorkout(activeWorkout: IWorkoutRecord): Promise<IndexableType> {
    return await this.activeWorkouts.add(activeWorkout)
  }

  async updateActiveWorkoutById(id: string, properties: IUpdateWorkoutRecord): Promise<IndexableType> {
    return await this.activeWorkouts.update(id, properties)
  }

  //
  // ErrorLogs
  //

  async addErrorLog(errorLog: IErrorLog): Promise<IndexableType> {
    return await this.errorLogs.add(errorLog)
  }
}

/**
 * Preconfigured LocalDatabase
 */
export const database = new LocalDatabase('FitnessTracker')
