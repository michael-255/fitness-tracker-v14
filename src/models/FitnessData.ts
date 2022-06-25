import type {
  IAppLog,
  IExercise,
  IExerciseRecord,
  IMeasurement,
  IMeasurementRecord,
  IWorkout,
  IWorkoutRecord,
} from '@/constants/interfaces'

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
 * @arg obj.measurements
 * @arg obj.exercises
 * @arg obj.workouts
 * @arg obj.measurementRecords
 * @arg obj.exerciseRecords
 * @arg obj.workoutRecords
 * @arg obj.activeExercises
 * @arg obj.activeWorkouts
 * @arg obj.appLogs
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
