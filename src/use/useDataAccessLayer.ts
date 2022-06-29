import type { IndexableType } from 'dexie'
import { database } from '@/services/LocalDatabase'
import { DBTable } from '@/constants/enums'
import type { ActivityName, Id } from '@/constants/types'
import type { Measurement } from '@/models/Measurement'
import type { Exercise } from '@/models/Exercise'
import type { Workout } from '@/models/Workout'
import type { MeasurementRecord } from '@/models/MeasurementRecord'
import type { ExerciseRecord } from '@/models/ExerciseRecord'
import type { WorkoutRecord } from '@/models/WorkoutRecord'
import type { AppLog } from '@/models/AppLog'
import type {
  IExercise,
  IExerciseRecord,
  IMeasurement,
  IMeasurementRecord,
  IWorkout,
  IWorkoutRecord,
} from '@/constants/interfaces'

/**
 * @todo
 * - NOTE: I'm reconsidering doing the DAL (LocalDatabase is my DAL)
 *
 * Data Access Layer (DAL)
 * @returns Database query and mutation functions
 */
export function useDataAccessLayer() {
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

  async function getExerciseById(id: Id): Promise<Exercise | undefined> {
    return await database.getById<Exercise>(DBTable.EXERCISES, id)
  }

  async function getWorkoutById(id: Id): Promise<Workout | undefined> {
    return await database.getById<Workout>(DBTable.WORKOUTS, id)
  }

  async function getMeasurementRecordById(id: Id): Promise<MeasurementRecord | undefined> {
    return await database.getById<MeasurementRecord>(DBTable.MEASUREMENT_RECORDS, id)
  }

  async function getExerciseRecordById(id: Id): Promise<ExerciseRecord | undefined> {
    return await database.getById<ExerciseRecord>(DBTable.EXERCISE_RECORDS, id)
  }

  async function getWorkoutRecordById(id: Id): Promise<WorkoutRecord | undefined> {
    return await database.getById<WorkoutRecord>(DBTable.WORKOUT_RECORDS, id)
  }

  async function getActiveExerciseById(id: Id): Promise<ExerciseRecord | undefined> {
    return await database.getById<ExerciseRecord>(DBTable.ACTIVE_EXERCISES, id)
  }

  async function getActiveWorkoutById(id: Id): Promise<WorkoutRecord | undefined> {
    return await database.getById<WorkoutRecord>(DBTable.ACTIVE_WORKOUTS, id)
  }

  async function getAppLogById(id: Id): Promise<AppLog | undefined> {
    return await database.getById<AppLog>(DBTable.APP_LOGS, id)
  }

  //
  // getByName (only Activities)
  //

  async function getMeasurementByName(name: ActivityName): Promise<Measurement[]> {
    return await database.getByName<Measurement>(DBTable.MEASUREMENTS, name)
  }

  async function getExerciseByName(name: ActivityName): Promise<Exercise[]> {
    return await database.getByName<Exercise>(DBTable.EXERCISES, name)
  }

  async function getWorkoutByName(name: ActivityName): Promise<Workout[]> {
    return await database.getByName<Workout>(DBTable.WORKOUTS, name)
  }

  //
  // DeleteById
  //

  async function deleteMeasurementById(id: Id): Promise<Measurement | undefined> {
    return await database.deleteById<Measurement>(DBTable.MEASUREMENTS, id)
  }

  async function deleteExerciseById(id: Id): Promise<Exercise | undefined> {
    return await database.deleteById<Exercise>(DBTable.EXERCISES, id)
  }

  async function deleteWorkoutById(id: Id): Promise<Workout | undefined> {
    return await database.deleteById<Workout>(DBTable.WORKOUTS, id)
  }

  async function deleteMeasurementRecordById(id: Id): Promise<MeasurementRecord | undefined> {
    return await database.deleteById<MeasurementRecord>(DBTable.MEASUREMENT_RECORDS, id)
  }

  async function deleteExerciseRecordById(id: Id): Promise<ExerciseRecord | undefined> {
    return await database.deleteById<ExerciseRecord>(DBTable.EXERCISE_RECORDS, id)
  }

  async function deleteWorkoutRecordById(id: Id): Promise<WorkoutRecord | undefined> {
    return await database.deleteById<WorkoutRecord>(DBTable.WORKOUT_RECORDS, id)
  }

  async function deleteActiveExerciseById(id: Id): Promise<ExerciseRecord | undefined> {
    return await database.deleteById<ExerciseRecord>(DBTable.ACTIVE_EXERCISES, id)
  }

  async function deleteActiveWorkoutById(id: Id): Promise<WorkoutRecord | undefined> {
    return await database.deleteById<WorkoutRecord>(DBTable.ACTIVE_WORKOUTS, id)
  }

  async function deleteAppLogById(id: Id): Promise<WorkoutRecord | undefined> {
    return await database.deleteById<WorkoutRecord>(DBTable.APP_LOGS, id)
  }

  //
  // Add
  //

  async function addMeasurement(item: Measurement): Promise<IndexableType> {
    return await database.add<Measurement>(DBTable.MEASUREMENTS, item)
  }

  async function addExercise(item: Exercise): Promise<IndexableType> {
    return await database.add<Exercise>(DBTable.EXERCISES, item)
  }

  async function addWorkout(item: Workout): Promise<IndexableType> {
    return await database.add<Workout>(DBTable.WORKOUTS, item)
  }

  async function addMeasurementRecord(item: MeasurementRecord): Promise<IndexableType> {
    return await database.add<MeasurementRecord>(DBTable.MEASUREMENT_RECORDS, item)
  }

  async function addExerciseRecord(item: ExerciseRecord): Promise<IndexableType> {
    return await database.add<ExerciseRecord>(DBTable.EXERCISE_RECORDS, item)
  }

  async function addWorkoutRecord(item: WorkoutRecord): Promise<IndexableType> {
    return await database.add<WorkoutRecord>(DBTable.WORKOUT_RECORDS, item)
  }

  async function addActiveExercise(item: ExerciseRecord): Promise<IndexableType> {
    return await database.add<ExerciseRecord>(DBTable.ACTIVE_EXERCISES, item)
  }

  async function addActiveWorkout(item: WorkoutRecord): Promise<IndexableType> {
    return await database.add<WorkoutRecord>(DBTable.ACTIVE_WORKOUTS, item)
  }

  async function addAppLog(item: AppLog): Promise<IndexableType> {
    return await database.add<AppLog>(DBTable.APP_LOGS, item)
  }

  //
  // Update (AppLog is omitted)
  //

  async function updateMeasurementById(id: Id, properties: IMeasurement): Promise<IndexableType> {
    return await database.updateById<IMeasurement>(DBTable.MEASUREMENTS, id, properties)
  }

  async function updateExerciseById(id: Id, properties: IExercise): Promise<IndexableType> {
    return await database.updateById<IExercise>(DBTable.EXERCISES, id, properties)
  }

  async function updateWorkoutById(id: Id, properties: IWorkout): Promise<IndexableType> {
    return await database.updateById<IWorkout>(DBTable.WORKOUTS, id, properties)
  }

  async function updateMeasurementRecordById(
    id: Id,
    properties: IMeasurementRecord
  ): Promise<IndexableType> {
    return await database.updateById<IMeasurementRecord>(
      DBTable.MEASUREMENT_RECORDS,
      id,
      properties
    )
  }

  async function updateExerciseRecordById(
    id: Id,
    properties: IExerciseRecord
  ): Promise<IndexableType> {
    return await database.updateById<IExerciseRecord>(DBTable.EXERCISE_RECORDS, id, properties)
  }

  async function updateWorkoutRecordById(
    id: Id,
    properties: IWorkoutRecord
  ): Promise<IndexableType> {
    return await database.updateById<IWorkoutRecord>(DBTable.WORKOUT_RECORDS, id, properties)
  }

  async function updateActiveExerciseById(
    id: Id,
    properties: IExerciseRecord
  ): Promise<IndexableType> {
    return await database.updateById<IExerciseRecord>(DBTable.ACTIVE_EXERCISES, id, properties)
  }

  async function updateActiveWorkoutById(
    id: Id,
    properties: IWorkoutRecord
  ): Promise<IndexableType> {
    return await database.updateById<IWorkoutRecord>(DBTable.ACTIVE_WORKOUTS, id, properties)
  }

  return {
    database,
    getAllMeasurements,
    getAllExercises,
    getAllWorkouts,
    getAllMeasurementRecords,
    getAllExerciseRecords,
    getAllWorkoutRecords,
    getAllActiveExercises,
    getAllActiveWorkouts,
    getAllAppLogs,
    getMeasurementById,
    getExerciseById,
    getWorkoutById,
    getMeasurementRecordById,
    getExerciseRecordById,
    getWorkoutRecordById,
    getActiveExerciseById,
    getActiveWorkoutById,
    getAppLogById,
    getMeasurementByName,
    getExerciseByName,
    getWorkoutByName,
    deleteMeasurementById,
    deleteExerciseById,
    deleteWorkoutById,
    deleteMeasurementRecordById,
    deleteExerciseRecordById,
    deleteWorkoutRecordById,
    deleteActiveExerciseById,
    deleteActiveWorkoutById,
    deleteAppLogById,
    addMeasurement,
    addExercise,
    addWorkout,
    addMeasurementRecord,
    addExerciseRecord,
    addWorkoutRecord,
    addActiveExercise,
    addActiveWorkout,
    addAppLog,
    updateMeasurementById,
    updateExerciseById,
    updateWorkoutById,
    updateMeasurementRecordById,
    updateExerciseRecordById,
    updateWorkoutRecordById,
    updateActiveExerciseById,
    updateActiveWorkoutById,
  }
}
