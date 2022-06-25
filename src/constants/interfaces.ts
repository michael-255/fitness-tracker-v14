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

// Entities
export interface IEntity {
  id?: Id
  createdAt?: CreatedAt
}

// Activities
export interface IActivity extends IEntity {
  name?: ActivityName
  description?: TextBlock
}

export interface IMeasurement extends IActivity {
  trackLbs?: TrackBoolean
  trackInches?: TrackBoolean
  trackFeet?: TrackBoolean
  trackPercent?: TrackBoolean
}

export interface IExercise extends IActivity {
  trackMultipleSets?: TrackBoolean
  trackDuration?: TrackBoolean
  trackDistance?: TrackBoolean
  trackWeight?: TrackBoolean
  trackReps?: TrackBoolean
}

export interface IWorkout extends IActivity {
  exerciseIds?: Id[]
}

// Records
export interface IRecord extends IEntity {
  parentId?: Id
  note?: TextBlock
}

export interface IMeasurementRecord extends IRecord {
  lbs?: RecordNumber
  inches?: RecordNumber
}

export interface IExerciseRecord extends IRecord {
  sets?: ExerciseSet[]
}

export interface IWorkoutRecord extends IRecord {
  finishedAt?: FinishedAt
  exerciseRecordIds?: Id[]
}

// Other
export interface IAppLog extends IEntity {
  level: LogLevel
  callerName: string
  details?: string
  errorName?: string
  message?: string
  stack?: string
}
