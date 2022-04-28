import Dexie, { type IndexableType } from 'dexie'
import type { Table } from 'dexie'
// Database Stores
import type { ActionStatus } from '@/models/_Action'
import { Measurement, MeasurementStore } from '@/models/Measurement'
import type { IMeasurement, IUpdateMeasurement } from '@/models/Measurement'
import { Exercise, ExerciseStore } from '@/models/Exercise'
import type { IExercise, IUpdateExercise } from '@/models/Exercise'
import { Workout, WorkoutStore } from '@/models/Workout'
import type { IWorkout, IUpdateWorkout } from '@/models/Workout'
import { MeasurementRecord, MeasurementRecordStore } from '@/models/MeasurementRecord'
import type { IMeasurementRecord, IUpdateMeasurementRecord } from '@/models/MeasurementRecord'
import { ExerciseRecord, ExerciseRecordStore, ActiveExerciseStore } from '@/models/ExerciseRecord'
import type { IExerciseRecord, IUpdateExerciseRecord } from '@/models/ExerciseRecord'
import { WorkoutRecord, WorkoutRecordStore, ActiveWorkoutStore } from '@/models/WorkoutRecord'
import type { IWorkoutRecord, IUpdateWorkoutRecord } from '@/models/WorkoutRecord'

/**
 * Wrapper for Dexie IndexedDB
 * @param name Database name
 */
export class LocalDatabase extends Dexie {
  // Information for the typing system to help Dexie out
  measurements!: Table<IMeasurement>
  exercises!: Table<IExercise>
  workouts!: Table<IWorkout>
  measurementRecords!: Table<IMeasurementRecord>
  exerciseRecords!: Table<IExerciseRecord>
  workoutRecords!: Table<IWorkoutRecord>
  activeExercises!: Table<IExerciseRecord>
  activeWorkouts!: Table<IWorkoutRecord>

  constructor(name: string) {
    super(name)

    this.version(1).stores({
      ...MeasurementStore,
      ...ExerciseStore,
      ...WorkoutStore,
      ...MeasurementRecordStore,
      ...ExerciseRecordStore,
      ...WorkoutRecordStore,
      ...ActiveExerciseStore,
      ...ActiveWorkoutStore,
    })

    this.measurements.mapToClass(Measurement)
    this.exercises.mapToClass(Exercise)
    this.workouts.mapToClass(Workout)
    this.measurementRecords.mapToClass(MeasurementRecord)
    this.exerciseRecords.mapToClass(ExerciseRecord)
    this.workoutRecords.mapToClass(WorkoutRecord)
    this.activeExercises.mapToClass(ExerciseRecord)
    this.activeWorkouts.mapToClass(WorkoutRecord)
  }

  //
  // Get All
  //

  async getAllMeasurements(): Promise<IMeasurement[]> {
    return await this.measurements.toArray()
  }

  async getAllExercises(): Promise<IExercise[]> {
    return await this.exercises.toArray()
  }

  async getAllWorkouts(): Promise<IWorkout[]> {
    return await this.workouts.toArray()
  }

  async getAllMeasurementRecords(): Promise<IMeasurementRecord[]> {
    return await this.measurementRecords.toArray()
  }

  async getAllExerciseRecords(): Promise<IExerciseRecord[]> {
    return await this.exerciseRecords.toArray()
  }

  async getAllWorkoutRecords(): Promise<IWorkoutRecord[]> {
    return await this.workoutRecords.toArray()
  }

  async getAllActiveExercises(): Promise<IExerciseRecord[]> {
    return await this.activeExercises.toArray()
  }

  async getAllActiveWorkouts(): Promise<IWorkoutRecord[]> {
    return await this.activeWorkouts.toArray()
  }

  //
  // Get
  //

  async getMeasurementById(id: string): Promise<IMeasurement | undefined> {
    return await this.measurements.where('id').equalsIgnoreCase(id).first()
  }

  async getExerciseById(id: string): Promise<IExercise | undefined> {
    return await this.exercises.where('id').equalsIgnoreCase(id).first()
  }

  async getWorkoutById(id: string): Promise<IWorkout | undefined> {
    return await this.workouts.where('id').equalsIgnoreCase(id).first()
  }

  async getMeasurementRecordById(id: string): Promise<IMeasurementRecord | undefined> {
    return await this.measurementRecords.where('id').equalsIgnoreCase(id).first()
  }

  async getExerciseRecordById(id: string): Promise<IExerciseRecord | undefined> {
    return await this.exerciseRecords.where('id').equalsIgnoreCase(id).first()
  }

  async getWorkoutRecordById(id: string): Promise<IWorkoutRecord | undefined> {
    return await this.workoutRecords.where('id').equalsIgnoreCase(id).first()
  }

  async getActiveExerciseById(id: string): Promise<IExerciseRecord | undefined> {
    return await this.activeExercises.where('id').equalsIgnoreCase(id).first()
  }

  async getActiveWorkoutById(id: string): Promise<IWorkoutRecord | undefined> {
    return await this.activeWorkouts.where('id').equalsIgnoreCase(id).first()
  }

  async getExercisesByName(name: string): Promise<IExercise[]> {
    return await this.exercises.where('name').equalsIgnoreCase(name).toArray()
  }

  async getWorkoutExercises(exerciseIds: string[]): Promise<IExercise[]> {
    // Filters out falsy values and casts the result type
    return (await this.exercises.bulkGet(exerciseIds)).filter(Boolean) as IExercise[]
  }

  async getWorkoutActiveExercises(activeExerciseIds: string[]): Promise<IExerciseRecord[]> {
    // Filters out falsy values and casts the result type
    return (await this.activeExercises.bulkGet(activeExerciseIds)).filter(Boolean) as IExerciseRecord[]
  }

  async getMeasurementRecordsByParentId(parentId: string): Promise<IMeasurementRecord[]> {
    return await this.measurementRecords.where('parentId').equalsIgnoreCase(parentId).sortBy('createdAt')
  }

  async getExerciseRecordsByParentId(parentId: string): Promise<IExerciseRecord[]> {
    return await this.exerciseRecords.where('parentId').equalsIgnoreCase(parentId).sortBy('createdAt')
  }

  async getWorkoutRecordsByParentId(parentId: string): Promise<IWorkoutRecord[]> {
    return await this.workoutRecords.where('parentId').equalsIgnoreCase(parentId).sortBy('createdAt')
  }

  async getNewestMeasurementRecordByParentId(parentId: string): Promise<IMeasurementRecord | undefined> {
    const parentRecords = await this.measurementRecords.where('parentId').equalsIgnoreCase(parentId).sortBy('createdAt')

    if (parentRecords.length) {
      return parentRecords[parentRecords.length - 1] // Last record (newest)
    } else {
      return undefined
    }
  }

  async getNewestExerciseRecordByParentId(parentId: string): Promise<IExerciseRecord | undefined> {
    const parentRecords = await this.exerciseRecords.where('parentId').equalsIgnoreCase(parentId).sortBy('createdAt')

    if (parentRecords.length) {
      return parentRecords[parentRecords.length - 1] // Last record (newest)
    } else {
      return undefined
    }
  }

  async getNewestWorkoutRecordByParentId(parentId: string): Promise<IWorkoutRecord | undefined> {
    const parentRecords = await this.workoutRecords.where('parentId').equalsIgnoreCase(parentId).sortBy('createdAt')

    if (parentRecords.length) {
      return parentRecords[parentRecords.length - 1] // Last record (newest)
    } else {
      return undefined
    }
  }

  async getMeasurementsByStatus(status: ActionStatus): Promise<IMeasurement[]> {
    return await this.measurements.where('status').equalsIgnoreCase(status).toArray()
  }

  async getExercisesByStatus(status: ActionStatus): Promise<IExercise[]> {
    return await this.exercises.where('status').equalsIgnoreCase(status).toArray()
  }

  async getWorkoutsByStatus(status: ActionStatus): Promise<IWorkout[]> {
    return await this.workouts.where('status').equalsIgnoreCase(status).toArray()
  }

  //
  // Add
  //

  async addMeasurement(measurement: IMeasurement): Promise<IndexableType> {
    return await this.measurements.add(measurement)
  }

  async addExercise(exercise: IExercise): Promise<IndexableType> {
    return await this.exercises.add(exercise)
  }

  async addWorkout(workout: IWorkout): Promise<IndexableType> {
    return await this.workouts.add(workout)
  }

  async addMeasurementRecord(measurementRecord: IMeasurementRecord): Promise<IndexableType> {
    return await this.measurementRecords.add(measurementRecord)
  }

  async addExerciseRecord(exerciseRecord: IExerciseRecord): Promise<IndexableType> {
    return await this.exerciseRecords.add(exerciseRecord)
  }

  async addWorkoutRecord(workoutRecord: IWorkoutRecord): Promise<IndexableType> {
    return await this.workoutRecords.add(workoutRecord)
  }

  async addActiveExercise(activeExercise: IExerciseRecord): Promise<IndexableType> {
    return await this.activeExercises.add(activeExercise)
  }

  async addActiveWorkout(activeWorkout: IWorkoutRecord): Promise<IndexableType> {
    return await this.activeWorkouts.add(activeWorkout)
  }

  //
  // Update
  //

  async updateMeasurement(id: string, properties: IUpdateMeasurement): Promise<IndexableType> {
    return await this.measurements.update(id, properties)
  }

  async updateExercise(id: string, properties: IUpdateExercise): Promise<IndexableType> {
    return await this.exercises.update(id, properties)
  }

  async updateWorkout(id: string, properties: IUpdateWorkout): Promise<IndexableType> {
    return await this.workouts.update(id, properties)
  }

  async updateMeasurementRecord(id: string, properties: IUpdateMeasurementRecord): Promise<IndexableType> {
    return await this.measurementRecords.update(id, properties)
  }

  async updateExerciseRecord(id: string, properties: IUpdateExerciseRecord): Promise<IndexableType> {
    return await this.exerciseRecords.update(id, properties)
  }

  async updateWorkoutRecord(id: string, properties: IUpdateWorkoutRecord): Promise<IndexableType> {
    return await this.workoutRecords.update(id, properties)
  }

  async updateActiveExercise(id: string, properties: IUpdateExerciseRecord): Promise<IndexableType> {
    return await this.activeExercises.update(id, properties)
  }

  async updateActiveWorkout(id: string, properties: IUpdateWorkoutRecord): Promise<IndexableType> {
    return await this.activeWorkouts.update(id, properties)
  }

  //
  // Delete
  //

  async deleteMeasurement(id: string): Promise<void> {
    return await this.measurements.delete(id)
  }

  async deleteExercise(id: string): Promise<void> {
    return await this.exercises.delete(id)
  }

  async deleteWorkout(id: string): Promise<void> {
    return await this.workouts.delete(id)
  }

  async deleteMeasurementRecord(id: string): Promise<void> {
    return await this.measurementRecords.delete(id)
  }

  async deleteExerciseRecord(id: string): Promise<void> {
    return await this.exerciseRecords.delete(id)
  }

  async deleteWorkoutRecord(id: string): Promise<void> {
    return await this.workoutRecords.delete(id)
  }

  async deleteActiveExercise(id: string): Promise<void> {
    return await this.activeExercises.delete(id)
  }

  async deleteActiveWorkout(id: string): Promise<void> {
    return await this.activeWorkouts.delete(id)
  }

  //
  // Clear (Delete All)
  //

  async clearMeasurements(): Promise<void> {
    return await this.measurements.clear()
  }

  async clearExercises(): Promise<void> {
    return await this.exercises.clear()
  }

  async clearWorkouts(): Promise<void> {
    return await this.workouts.clear()
  }

  async clearMeasurementRecords(): Promise<void> {
    return await this.measurementRecords.clear()
  }

  async clearExerciseRecords(): Promise<void> {
    return await this.exerciseRecords.clear()
  }

  async clearWorkoutRecords(): Promise<void> {
    return await this.workoutRecords.clear()
  }

  async clearActiveExercises(): Promise<void> {
    return await this.activeExercises.clear()
  }

  async clearActiveWorkouts(): Promise<void> {
    return await this.activeWorkouts.clear()
  }
}

/**
 * Preconfigured LocalDatabase
 */
export const database = new LocalDatabase('FitnessTracker')
