import { FitnessData } from '@/models/FitnessData'
import { database } from '@/services/LocalDatabase'
import { downloadFile } from '@/utils/common'
import { Store } from '@/constants'
import { logger } from '@/services/Logger'
import { ref } from 'vue'
import { useAppLogger } from './useAppLogger'
import { LogLevel } from '@/models/AppLog'

const { silentLog } = useAppLogger()

export function useImportExport() {
  const file: any = ref(null)

  async function onRejectedFile(entries: any) {
    logger.warn('The file upload was rejected.', entries)

    const fileName = entries[0]?.file?.name
    const failedValidation = entries[0]?.failedPropValidation

    silentLog({ error: new Error('onRejectedFile'), level: LogLevel.WARN, name: 'onRejectedFile', details: `${fileName}:${failedValidation}` })
  }

  async function importData() {
    try {
      const fileData = await file.value.text()
      const parsedFileData = JSON.parse(fileData)

      const fitnessData = new FitnessData({
        measurements: parsedFileData?.measurements,
        exercises: parsedFileData?.exercises,
        workouts: parsedFileData?.workouts,
        measurementRecords: parsedFileData?.measurementRecords,
        exerciseRecords: parsedFileData?.exerciseRecords,
        workoutRecords: parsedFileData?.workoutRecords,
        activeExercises: parsedFileData?.activeExercises,
        activeWorkouts: parsedFileData?.activeWorkouts,
        appLogs: parsedFileData?.appLogs, // AppLogs are included, but won't be imported into the database
      })

      logger.log(fitnessData)

      await database.bulkAddMeasurements(fitnessData?.measurements)
      await database.bulkAddExercises(fitnessData?.exercises)
      await database.bulkAddWorkouts(fitnessData?.workouts)
      await database.bulkAddMeasurementRecords(fitnessData?.measurementRecords)
      await database.bulkAddExerciseRecords(fitnessData?.exerciseRecords)
      await database.bulkAddWorkoutRecords(fitnessData?.workoutRecords)
      await database.bulkAddActiveExercises(fitnessData?.activeExercises)
      await database.bulkAddActiveWorkouts(fitnessData?.activeWorkouts)
    } catch (error) {
      silentLog({ error, level: LogLevel.ERROR, name: 'importData' })
    }
  }

  async function exportData() {
    try {
      const fitnessData = new FitnessData({
        measurements: await database.getAll(Store.MEASUREMENTS),
        exercises: await database.getAll(Store.EXERCISES),
        workouts: await database.getAll(Store.WORKOUTS),
        measurementRecords: await database.getAll(Store.MEASUREMENT_RECORDS),
        exerciseRecords: await database.getAll(Store.EXERCISE_RECORDS),
        workoutRecords: await database.getAll(Store.WORKOUT_RECORDS),
        activeExercises: await database.getAll(Store.ACTIVE_EXERCISES),
        activeWorkouts: await database.getAll(Store.ACTIVE_WORKOUTS),
        appLogs: await database.getAll(Store.APP_LOGS),
      })

      logger.log(fitnessData)

      downloadFile({
        fileName: `fitness-data-v14-export-${new Date().toISOString()}`,
        extension: 'json',
        mimeType: 'application/json',
        textContent: JSON.stringify(fitnessData),
      })
    } catch (error) {
      silentLog({ error, level: LogLevel.ERROR, name: 'exportData' })
    }
  }

  return { file, onRejectedFile, importData, exportData }
}
