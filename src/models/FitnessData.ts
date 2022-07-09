import type { AppLog } from './AppLog'
import type { Exercise } from './Exercise'
import type { ExerciseRecord } from './ExerciseRecord'
import type { Measurement } from './Measurement'
import type { MeasurementRecord } from './MeasurementRecord'
import type { Workout } from './Workout'
import type { WorkoutRecord } from './WorkoutRecord'

interface FitnessDataParams {
  measurements?: Measurement[]
  exercises?: Exercise[]
  workouts?: Workout[]
  measurementRecords?: MeasurementRecord[]
  exerciseRecords?: ExerciseRecord[]
  workoutRecords?: WorkoutRecord[]
  activeExercises?: ExerciseRecord[]
  activeWorkouts?: WorkoutRecord[]
  appLogs?: AppLog[]
}

/**
 * FitnessData Class
 * @param obj Partial<FitnessDataParams>
 */
export class FitnessData {
  public measurements: Measurement[]
  public exercises: Exercise[]
  public workouts: Workout[]
  public measurementRecords: MeasurementRecord[]
  public exerciseRecords: ExerciseRecord[]
  public workoutRecords: WorkoutRecord[]
  public activeExercises: ExerciseRecord[]
  public activeWorkouts: WorkoutRecord[]
  public appLogs: AppLog[]

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
  }: Partial<FitnessDataParams> = {}) {
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
