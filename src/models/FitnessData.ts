import type {
  FitnessDataObject,
  AppLogObject,
  ExerciseObject,
  ExerciseRecordObject,
  MeasurementObject,
  MeasurementRecordObject,
  WorkoutObject,
  WorkoutRecordObject,
} from '@/constants/interfaces'

/**
 * FitnessData Class
 * @param obj FitnessDataObject
 */
export class FitnessData {
  public measurements: MeasurementObject[]
  public exercises: ExerciseObject[]
  public workouts: WorkoutObject[]
  public measurementRecords: MeasurementRecordObject[]
  public exerciseRecords: ExerciseRecordObject[]
  public workoutRecords: WorkoutRecordObject[]
  public activeExercises: ExerciseRecordObject[]
  public activeWorkouts: WorkoutRecordObject[]
  public appLogs: AppLogObject[]

  constructor({
    measurements = [],
    exercises = [],
    workouts = [],
    measurementRecords = [],
    exerciseRecords = [],
    workoutRecords = [],
    activeExercises = [],
    activeWorkouts = [],
    appLogs = [],
  }: FitnessDataObject = {}) {
    this.measurements = measurements
    this.exercises = exercises
    this.workouts = workouts
    this.measurementRecords = measurementRecords
    this.exerciseRecords = exerciseRecords
    this.workoutRecords = workoutRecords
    this.activeExercises = activeExercises
    this.activeWorkouts = activeWorkouts
    this.appLogs = appLogs
  }
}
