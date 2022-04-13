import Dexie from 'dexie'
import type { Table } from 'dexie'
// Database Stores
import { Measurement, MeasurementStore } from '@/models/Measurement'
import type { IMeasurement } from '@/models/Measurement'
import { Exercise, ExerciseStore } from '@/models/Exercise'
import type { IExercise } from '@/models/Exercise'
import { Workout, WorkoutStore } from '@/models/Workout'
import type { IWorkout } from '@/models/Workout'
import { MeasurementRecord, MeasurementRecordStore } from '@/models/MeasurementRecord'
import type { IMeasurementRecord } from '@/models/MeasurementRecord'
import { ExerciseRecord, ExerciseRecordStore, ActiveExerciseStore } from '@/models/ExerciseRecord'
import type { IExerciseRecord } from '@/models/ExerciseRecord'
import { WorkoutRecord, WorkoutRecordStore, ActiveWorkoutStore } from '@/models/WorkoutRecord'
import type { IWorkoutRecord } from '@/models/WorkoutRecord'

/**
 * Wrapper for Dexie IndexedDB.
 * @param name Database name in the browser dev tools
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

  async getMeasurements(): Promise<IMeasurement[]> {
    return await this.measurements.toArray()
  }

  async getExercises(): Promise<IExercise[]> {
    return await this.exercises.toArray()
  }

  async getWorkouts(): Promise<IWorkout[]> {
    return await this.workouts.toArray()
  }

  async getMeasurementRecords(): Promise<IMeasurementRecord[]> {
    return await this.measurementRecords.toArray()
  }

  async getExerciseRecords(): Promise<IExerciseRecord[]> {
    return await this.exerciseRecords.toArray()
  }

  async getWorkoutRecords(): Promise<IWorkoutRecord[]> {
    return await this.workoutRecords.toArray()
  }

  async getActiveExercises(): Promise<IExerciseRecord[]> {
    return await this.activeExercises.toArray()
  }

  async getActiveWorkouts(): Promise<IWorkoutRecord[]> {
    return await this.activeWorkouts.toArray()
  }

  // async getMeasurementById(id: string): Promise<IMeasurement[]> {
  //   return await this.measurements.toArray()
  // }

  // async getExercisesById(id: string): Promise<IMeasurement[]> {
  //   return await this.exercises.toArray()
  // }

  // async getWorkoutsById(id: string): Promise<IMeasurement[]> {
  //   return await this.workouts.toArray()
  // }

  getWorkoutExercises(): Error {
    return new Error('Not Implemented')
  }
}

/**
 * Preconfigured LocalDatabase
 */
export const database = new LocalDatabase('FitnessTracker')
