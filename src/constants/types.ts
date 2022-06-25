import type { LogLevel } from '@/constants/enums'

export type Nullable<T> = T | null

// Core Types
export type Id = string // Includes ParentId
export type CreatedAt = string
export type FinishedAt = Nullable<string>
export type ActivityName = string
export type TextBlock = Nullable<string>
export type TrackBoolean = boolean
export type RecordNumber = Nullable<number>

export type ExerciseSet = {
  weight?: RecordNumber
  reps?: RecordNumber
  distance?: RecordNumber
  duration?: RecordNumber
}

export type AppLogParams = {
  error: Error | any
  level: LogLevel
  name: string
  details?: string
}

// Helper Types
export type ParentIdOptions = {
  label: string
  id: Id
}

// export type ConfirmDialogProps = {
//   title: string
//   icon: Icon
//   message: string
//   color: string
//   dialog: boolean
//   confirmFunc: () => any
// }
