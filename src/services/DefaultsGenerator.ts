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
     */
    this.defaultIds = {
      measurements: {
        0: '122G-ISH0-KQQC',
        1: 'BBV6-WJV0-BO7W',
        2: 'F8V7-U81S-RD58',
        3: 'A0DU-AJ0X-LCYD',
        4: 'QLV9-CXMV-9L87',
        5: 'VO6C-7X1V-BFZQ',
        6: 'VLR4-0HZ7-027O',
        7: 'YKDW-16OB-QM1O',
        8: 'R6UV-WRQZ-YA3A',
        9: '2B4M-573D-LLWN',
        10: 'C48H-L6LV-FTCZ',
        11: '7BK9-30DF-MD08',
        12: '6CJL-D836-1J0K',
        13: 'S5CG-WH2J-7MIK',
        14: 'VEHP-0EYL-IW3G',
        // Add new measurement ids here...
      },
      exercises: {
        0: 'LI6N-BS98-26RX',
        1: 'SXL4-79XA-Y5GF',
        2: 'HBPR-WGQ0-NEHJ',
        3: 'VXZU-4CAZ-FB9U',
        4: 'KEM9-NNUN-L3UH',
        5: 'BD56-KU8Y-EQGA',
        // Add new exercise ids here...
      },
      workouts: {
        0: '155T-A7DX-DDTZ',
        1: '87R2-WNY8-J9LM',
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
        name: 'Left Biceps',
        trackInches: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[6],
        name: 'Right Biceps',
        trackInches: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[7],
        name: 'Left Forearms',
        trackInches: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[8],
        name: 'Right Forearms',
        trackInches: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[9],
        name: 'Waist',
        trackInches: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[10],
        name: 'Left Thighs',
        trackInches: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[11],
        name: 'Right Thighs',
        trackInches: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[12],
        name: 'Left Calves',
        trackInches: true,
      }),
      new Measurement({
        id: this.defaultIds.measurements[13],
        name: 'Right Calves',
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
