import { Measurement } from '@/models/Measurement'
import { Exercise } from '@/models/Exercise'
import { Workout } from '@/models/Workout'

type DefaultIds = {
  measurements: any
  exercises: any
  workouts: any
}

/**
 * DefaultsGenerator Class
 */
export class DefaultsGenerator {
  defaultIds: DefaultIds

  constructor() {
    /**
     * Using pre-generated ids so new default measurements, exercises, and
     * workouts can be added without breaking any record data that users
     * may already have in the app.
     * @todo
     * Convert your old records to the commented UUIDs!!!
     */
    this.defaultIds = {
      measurements: {
        0: 'b4450018-1506-450f-a429-9903aded5c9b', //'122G-ISH0-KQQC',
        1: '43e3fc4e-b419-468c-9888-b5e072d81dfb', //'BBV6-WJV0-BO7W',
        2: '0090f468-5917-4124-98bd-1e7711ab360e', //'F8V7-U81S-RD58',
        3: '222452a2-aa29-460e-85a8-4617092d1ba5', //'A0DU-AJ0X-LCYD',
        4: '880cb344-e537-4f0f-bad4-e212a6df51cd', //'QLV9-CXMV-9L87',
        5: 'e126e959-1675-4b3b-866c-261e453d8dae', //'VO6C-7X1V-BFZQ',
        6: '9fddbad2-ba89-4476-95e4-10d9969e782c', //'VLR4-0HZ7-027O',
        7: '96c7229d-91e8-4470-b0a9-ebb1234fe6e7', //'YKDW-16OB-QM1O',
        8: 'fa4c25c7-e1d5-48bf-975a-4fdfd2305646', //'R6UV-WRQZ-YA3A',
        9: 'ed12d669-cffd-45f7-802c-9025426341fa', //'2B4M-573D-LLWN',
        10: '3e3d0d91-3280-491d-967e-d56dcfc51520', //'C48H-L6LV-FTCZ',
        11: '843c6b0f-ce23-4468-9d67-dd1af076b10a', //'7BK9-30DF-MD08',
        12: '09108d87-8337-4424-83a1-1ee5be5e8585', //'6CJL-D836-1J0K',
        13: '0ee16da1-3c8d-48fc-9af1-41ec09cf6317', //'S5CG-WH2J-7MIK',
        14: '3a33d314-f73c-4a32-b65c-d533d6e5ab12', //'VEHP-0EYL-IW3G',
        // Add new measurement ids here...
      },
      exercises: {
        0: '50c1fc75-0975-45f8-8177-ff4988b00de2', //'LI6N-BS98-26RX',
        1: 'd681459e-10c8-40ae-94e9-9b06b7c40367', //'SXL4-79XA-Y5GF',
        2: '08b12cc1-d4b9-4d22-82db-9e33b3e5c3fa', //'HBPR-WGQ0-NEHJ',
        3: 'cc279615-91a6-42ac-a073-4339e7c2034f', //'VXZU-4CAZ-FB9U',
        4: 'b8f1a60e-7f21-4f62-8757-d9b371bffd45', //'KEM9-NNUN-L3UH',
        5: '8c103b3b-dd21-4d67-a0c9-1cd1b6451046', //'BD56-KU8Y-EQGA',
        // Add new exercise ids here...
      },
      workouts: {
        0: '2158e1b2-27e0-4012-bb14-3846b3ee1d6a', //'155T-A7DX-DDTZ',
        1: 'f3a1537c-4d63-43e1-99bd-df5ef59ac220', //'87R2-WNY8-J9LM',
        // Add new workout ids here...
      },
    }
  }

  async generateMeasurements(): Promise<Measurement[]> {
    return [
      new Measurement({
        id: this.defaultIds.measurements[0],
        name: 'Body Weight',
        trackLbs: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[1],
        name: 'Body Fat',
        trackPercent: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[2],
        name: 'Neck',
        trackInches: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[3],
        name: 'Shoulders',
        trackInches: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[4],
        name: 'Chest',
        trackInches: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[5],
        name: 'Left Bicep',
        trackInches: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[6],
        name: 'Right Bicep',
        trackInches: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[7],
        name: 'Left Forearm',
        trackInches: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[8],
        name: 'Right Forearm',
        trackInches: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[9],
        name: 'Waist',
        trackInches: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[10],
        name: 'Left Thigh',
        trackInches: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[11],
        name: 'Right Thigh',
        trackInches: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[12],
        name: 'Left Calve',
        trackInches: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[13],
        name: 'Right Calve',
        trackInches: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[14],
        name: 'Height',
        trackInches: true,
        trackFeet: true,
      }),
      // Add new Measurements here...
    ]
  }

  async generateExercises(): Promise<Exercise[]> {
    return [
      new Exercise({
        id: this.defaultIds.exercises[0],
        name: 'Barbell Squats',
        trackMultipleSets: true,
        trackWeight: true,
        trackReps: true,
      }),
      new Exercise({
        id: this.defaultIds.exercises[1],
        name: 'Barbell Bench Press',
        trackMultipleSets: true,
        trackWeight: true,
        trackReps: true,
      }),
      new Exercise({
        id: this.defaultIds.exercises[2],
        name: 'Barbell Rows',
        trackMultipleSets: true,
        trackWeight: true,
        trackReps: true,
      }),
      new Exercise({
        id: this.defaultIds.exercises[3],
        name: 'Barbell Overhead Press',
        trackMultipleSets: true,
        trackWeight: true,
        trackReps: true,
      }),
      new Exercise({
        id: this.defaultIds.exercises[4],
        name: 'Deadlift',
        trackMultipleSets: true,
        trackWeight: true,
        trackReps: true,
      }),
      new Exercise({
        id: this.defaultIds.exercises[5],
        name: 'Pull-Ups',
        trackMultipleSets: true,
        trackWeight: true,
        trackReps: true,
      }),
      // Add new Exercises here...
    ]
  }

  async generateWorkouts(): Promise<Workout[]> {
    const defaultExercises = await this.generateExercises()

    const getExerciseIdByName = (name: string) => {
      return defaultExercises.find((de) => de.name === name)?.id as string
    }

    return [
      new Workout({
        id: this.defaultIds.workouts[0],
        name: 'StrongLifts 5x5 - Alpha',
        exerciseIds: [
          getExerciseIdByName('Barbell Squats'),
          getExerciseIdByName('Barbell Bench Press'),
          getExerciseIdByName('Barbell Rows'),
        ],
      }),
      new Workout({
        id: this.defaultIds.workouts[1],
        name: 'StrongLifts 5x5 - Beta',
        exerciseIds: [
          getExerciseIdByName('Barbell Squats'),
          getExerciseIdByName('Barbell Overhead Press'),
          getExerciseIdByName('Deadlift'),
        ],
      }),
      // Add new Workouts here...
    ]
  }
}

/**
 * Preconfigured DefaultsGenerator
 */
export const defaults = new DefaultsGenerator()
