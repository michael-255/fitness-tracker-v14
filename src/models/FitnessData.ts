import type { IAppLog } from './AppLog'
import type { IExercise } from './Exercise'
import type { IExerciseRecord } from './ExerciseRecord'
import type { IMeasurement } from './Measurement'
import type { IMeasurementRecord } from './MeasurementRecord'
import type { IWorkout } from './Workout'
import type { IWorkoutRecord } from './WorkoutRecord'

export interface IFitnessData {
  measurements?: IMeasurement[]
  exercises?: IExercise[]
  workouts?: IWorkout[]
  measurementRecords?: IMeasurementRecord[]
  exerciseRecords?: IExerciseRecord[]
  workoutRecords?: IWorkoutRecord[]
  activeExercises?: IExerciseRecord[]
  activeWorkouts?: IWorkoutRecord[]
  appLogs?: IAppLog[]
}

/**
 * FitnessData Class
 * @arg measurements (Defaulted)
 * @arg exercises (Defaulted)
 * @arg workouts (Defaulted)
 * @arg measurementRecords (Defaulted)
 * @arg exerciseRecords (Defaulted)
 * @arg workoutRecords (Defaulted)
 * @arg activeExercises (Defaulted)
 * @arg activeWorkouts (Defaulted)
 * @arg appLogs (Defaulted)
 */
export class FitnessData {
  measurements: IMeasurement[]
  exercises: IExercise[]
  workouts: IWorkout[]
  measurementRecords: IMeasurementRecord[]
  exerciseRecords: IExerciseRecord[]
  workoutRecords: IWorkoutRecord[]
  activeExercises: IExerciseRecord[]
  activeWorkouts: IWorkoutRecord[]
  appLogs: IAppLog[]

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
  }: IFitnessData = {}) {
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
