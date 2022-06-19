import type {
  Id,
  CreatedAt,
  Name,
  Description,
  TrackBoolean,
  ParentId,
  Note,
  RecordNumber,
  ExerciseSet,
  FinishedAt,
} from '@/constants/types'
import type { LogLevel, ActivityStatus } from '@/constants/enums'

// Entities
export interface IEntity {
  id?: Id
  createdAt?: CreatedAt
}

export interface IAppLog extends IEntity {
  level: LogLevel
  callerName: string
  details?: string
  errorName?: string
  message?: string
  stack?: string
}

// Activities
export interface IActivity extends IEntity {
  name?: Name
  description?: Description
  status?: ActivityStatus
}

export interface IMeasurement extends IActivity {
  trackLbs?: TrackBoolean
  trackInches?: TrackBoolean
  trackFeet?: TrackBoolean
  trackPercent?: TrackBoolean
}

export interface IExercise extends IActivity {
  trackConfirm?: TrackBoolean
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
  parentId?: ParentId
  note?: Note
}

export interface IMeasurementRecord extends IRecord {
  lbs?: RecordNumber
  inches?: RecordNumber
}

export interface IExerciseRecord extends IRecord {
  skipped?: TrackBoolean
  sets?: ExerciseSet[]
}

export interface IWorkoutRecord extends IRecord {
  finishedAt?: FinishedAt
  exerciseRecordIds?: Id[]
}
