import type { IndexableType } from 'dexie'
import { database } from '@/services/LocalDatabase'
import { DBTable } from '@/constants/enums'
import type { Id } from '@/constants/types'
import type { Measurement } from '@/models/Measurement'
import type { Exercise } from '@/models/Exercise'
import type { Workout } from '@/models/Workout'
import type { MeasurementRecord } from '@/models/MeasurementRecord'
import type { ExerciseRecord } from '@/models/ExerciseRecord'
import type { WorkoutRecord } from '@/models/WorkoutRecord'
import type { AppLog } from '@/models/AppLog'
import type { IMeasurement } from '@/constants/interfaces'

/**
 * @todo
 * - Note this is the DAL (Data Access Layer... change name to useDAL / useDataAccessLayer?)
 * - JSDocs for functions and composable
 * - Finish remaining functions
 * - Include useAppLogger (try..catch?)
 * - Try writing tests for composables!!!
 */

export function useDatabase() {
  //
  // GetAll
  //

  async function getAllMeasurements(): Promise<Measurement[]> {
    return await database.getAll<Measurement>(DBTable.MEASUREMENTS)
  }

  async function getAllExercises(): Promise<Exercise[]> {
    return await database.getAll<Exercise>(DBTable.EXERCISES)
  }

  async function getAllWorkouts(): Promise<Workout[]> {
    return await database.getAll<Workout>(DBTable.WORKOUTS)
  }

  async function getAllMeasurementRecords(): Promise<MeasurementRecord[]> {
    return await database.getAll<MeasurementRecord>(DBTable.MEASUREMENT_RECORDS)
  }

  async function getAllExerciseRecords(): Promise<ExerciseRecord[]> {
    return await database.getAll<ExerciseRecord>(DBTable.EXERCISE_RECORDS)
  }

  async function getAllWorkoutRecords(): Promise<WorkoutRecord[]> {
    return await database.getAll<WorkoutRecord>(DBTable.WORKOUT_RECORDS)
  }

  async function getAllActiveExercises(): Promise<ExerciseRecord[]> {
    return await database.getAll<ExerciseRecord>(DBTable.ACTIVE_EXERCISES)
  }

  async function getAllActiveWorkouts(): Promise<WorkoutRecord[]> {
    return await database.getAll<WorkoutRecord>(DBTable.WORKOUT_RECORDS)
  }

  async function getAllAppLogs(): Promise<AppLog[]> {
    return await database.getAll<AppLog>(DBTable.APP_LOGS)
  }

  //
  // GetById
  //

  async function getMeasurementById(id: Id): Promise<Measurement | undefined> {
    return await database.getById<Measurement>(DBTable.MEASUREMENTS, id)
  }

  // getExerciseById
  // getWorkoutById
  // getMeasurementRecordById
  // getExerciseRecordById
  // getWorkoutRecordById
  // getActiveExerciseById
  // getActiveWorkoutById
  // getAppLogById

  //
  // DeleteById
  //

  async function deleteMeasurementById(id: Id): Promise<Measurement | undefined> {
    return await database.deleteById<Measurement>(DBTable.MEASUREMENTS, id)
  }

  //
  // Add (AppLog function is special!)
  //

  async function addMeasurement(item: Measurement): Promise<IndexableType> {
    return await database.add<Measurement>(DBTable.MEASUREMENTS, item)
  }

  async function addAppLog(item: AppLog): Promise<IndexableType> {
    return await database.add<AppLog>(DBTable.APP_LOGS, item)
  }

  //
  // Update (don't include AppLog)
  //

  async function updateMeasurementById(id: Id, properties: IMeasurement): Promise<IndexableType> {
    return await database.updateById<IMeasurement>(DBTable.MEASUREMENTS, id, properties)
  }

  return {
    getAllMeasurements,
    getAllExercises,
    getAllWorkouts,
    getAllMeasurementRecords,
    getAllExerciseRecords,
    getAllWorkoutRecords,
    getAllActiveExercises,
    getAllActiveWorkouts,
    getAllAppLogs,
  }
}
