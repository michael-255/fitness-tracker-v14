import type {
  Id,
  CreatedAt,
  ActivityName,
  TextBlock,
  TrackBoolean,
  RecordNumber,
  ExerciseSet,
  FinishedAt,
} from '@/constants/types'
import type { LogLevel } from '@/constants/enums'

// Database storage object interfaces

// Entities
export interface EntityObject {
  id?: Id
  createdAt?: CreatedAt
}

// Activities
export interface ActivityObject extends EntityObject {
  name?: ActivityName
  description?: TextBlock
}

export interface MeasurementObject extends ActivityObject {
  trackLbs?: TrackBoolean
  trackInches?: TrackBoolean
  trackFeet?: TrackBoolean
  trackPercent?: TrackBoolean
}

export interface ExerciseObject extends ActivityObject {
  trackMultipleSets?: TrackBoolean
  trackDuration?: TrackBoolean
  trackDistance?: TrackBoolean
  trackWeight?: TrackBoolean
  trackReps?: TrackBoolean
}

export interface WorkoutObject extends ActivityObject {
  exerciseIds?: Id[]
}

// Records
export interface RecordObject extends EntityObject {
  parentId?: Id
  note?: TextBlock
}

export interface MeasurementRecordObject extends RecordObject {
  lbs?: RecordNumber
  inches?: RecordNumber
}

export interface ExerciseRecordObject extends RecordObject {
  sets?: ExerciseSet[]
}

export interface WorkoutRecordObject extends RecordObject {
  finishedAt?: FinishedAt
  exerciseRecordIds?: Id[]
}

// Other
export interface AppLogObject extends EntityObject {
  level: LogLevel
  callerName: string
  details?: string
  errorName?: string
  message?: string
  stack?: string
}

export interface FitnessDataObject {
  measurements?: MeasurementObject[]
  exercises?: ExerciseObject[]
  workouts?: WorkoutObject[]
  measurementRecords?: MeasurementRecordObject[]
  exerciseRecords?: ExerciseRecordObject[]
  workoutRecords?: WorkoutRecordObject[]
  activeExercises?: ExerciseRecordObject[]
  activeWorkouts?: WorkoutRecordObject[]
  appLogs?: AppLogObject[]
}
