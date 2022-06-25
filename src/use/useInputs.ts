import { database } from '@/services/LocalDatabase'
import { DBTable } from '@/constants/enums'
import { useAppLogger } from './useAppLogger'
import { LogLevel } from '@/constants/enums'
import { Measurement } from '@/models/Measurement'
import { Exercise } from '@/models/Exercise'
import { Workout } from '@/models/Workout'
import { MeasurementRecord } from '@/models/MeasurementRecord'
import { ExerciseRecord } from '@/models/ExerciseRecord'
import { WorkoutRecord } from '@/models/WorkoutRecord'

const { silentLog } = useAppLogger()

export function useInputs() {
  const measurementKeys: string[] = Measurement.keys()
  const exerciseKeys: string[] = Exercise.keys()
  const workoutKeys: string[] = Workout.keys()
  const measurementRecordKeys: string[] = MeasurementRecord.keys()
  const exerciseRecordKeys: string[] = ExerciseRecord.keys()
  const workoutRecordKeys: string[] = WorkoutRecord.keys()

  async function Inputs() {
    try {
      await Promise.all(Object.values(DBTable).map((table) => database.clear(table as DBTable)))
    } catch (error) {
      silentLog({ error, level: LogLevel.ERROR, name: 'clearAllAppData' })
    }
  }

  return {}
}
