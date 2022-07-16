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
  measurements: Measurement[]
  exercises: Exercise[]
  workouts: Workout[]
  measurementRecords: MeasurementRecord[]
  exerciseRecords: ExerciseRecord[]
  workoutRecords: WorkoutRecord[]
  appLogs: AppLog[]

  constructor({
    measurements = [],
    exercises = [],
    workouts = [],
    measurementRecords = [],
    exerciseRecords = [],
    workoutRecords = [],
    appLogs = [],
  }: Partial<FitnessDataParams> = {}) {
    this.measurements = measurements
    this.exercises = exercises
    this.workouts = workouts
    this.measurementRecords = measurementRecords
    this.exerciseRecords = exerciseRecords
    this.workoutRecords = workoutRecords
    this.appLogs = appLogs
  }
}
