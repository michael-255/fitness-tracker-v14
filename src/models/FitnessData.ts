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
  protected measurements: MeasurementObject[]
  protected exercises: ExerciseObject[]
  protected workouts: WorkoutObject[]
  protected measurementRecords: MeasurementRecordObject[]
  protected exerciseRecords: ExerciseRecordObject[]
  protected workoutRecords: WorkoutRecordObject[]
  protected activeExercises: ExerciseRecordObject[]
  protected activeWorkouts: WorkoutRecordObject[]
  protected appLogs: AppLogObject[]

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
