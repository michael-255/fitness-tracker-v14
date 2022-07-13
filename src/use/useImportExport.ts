import { FitnessData } from '@/models/FitnessData'
import { database } from '@/services/LocalDatabase'
import { downloadFile } from '@/utils/common'
import { DBTable } from '@/constants/enums'
import { logger } from '@/services/Logger'
import { ref } from 'vue'
import { useMessaging } from './useMessaging'
import { LogLevel } from '@/constants/enums'

const { log } = useMessaging()

export function useImportExport() {
  const file: any = ref(null)

  async function onRejectedFile(entries: any) {
    logger.warn('The file upload was rejected.', entries)

    const fileName = entries[0]?.file?.name
    const failedValidation = entries[0]?.failedPropValidation

    log({
      error: new Error('onRejectedFile'),
      level: LogLevel.WARN,
      name: 'onRejectedFile',
      details: `${fileName}:${failedValidation}`,
    })
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

      await database.bulkAdd(DBTable.MEASUREMENTS, fitnessData?.measurements)
      await database.bulkAdd(DBTable.EXERCISES, fitnessData?.exercises)
      await database.bulkAdd(DBTable.WORKOUTS, fitnessData?.workouts)
      await database.bulkAdd(DBTable.MEASUREMENT_RECORDS, fitnessData?.measurementRecords)
      await database.bulkAdd(DBTable.EXERCISE_RECORDS, fitnessData?.exerciseRecords)
      await database.bulkAdd(DBTable.WORKOUT_RECORDS, fitnessData?.workoutRecords)
    } catch (error) {
      log({ error, level: LogLevel.ERROR, name: 'importData' })
    }
  }

  async function exportData() {
    try {
      const fitnessData = new FitnessData({
        measurements: await database.getAll(DBTable.MEASUREMENTS),
        exercises: await database.getAll(DBTable.EXERCISES),
        workouts: await database.getAll(DBTable.WORKOUTS),
        measurementRecords: await database.getAll(DBTable.MEASUREMENT_RECORDS),
        exerciseRecords: await database.getAll(DBTable.EXERCISE_RECORDS),
        workoutRecords: await database.getAll(DBTable.WORKOUT_RECORDS),
        appLogs: await database.getAll(DBTable.APP_LOGS),
      })

      logger.log(fitnessData)

      downloadFile({
        fileName: `fitness-data-v14-export-${new Date().toISOString()}`,
        extension: 'json',
        mimeType: 'application/json',
        textContent: JSON.stringify(fitnessData),
      })
    } catch (error) {
      log({ error, level: LogLevel.ERROR, name: 'exportData' })
    }
  }

  return { file, onRejectedFile, importData, exportData }
}
