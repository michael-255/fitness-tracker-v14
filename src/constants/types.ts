import type { LogLevel } from '@/constants/enums'

// Entity
export type Id = string
export type CreatedAt = string

// App Log
export type AppLogParams = {
  error: Error | any
  level: LogLevel
  name: string
  details?: string
}

// Activity
export type Name = string
export type Description = string

// Record
export type ParentId = string
export type Note = string

// Other
export type TrackBoolean = boolean
export type RecordNumber = number | null
export type FinishedAt = string | null

export type ExerciseSet = {
  weight?: RecordNumber
  reps?: RecordNumber
  distance?: RecordNumber
  duration?: RecordNumber
}
