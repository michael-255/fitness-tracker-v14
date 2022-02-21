# Fitness Tracker v14

The 14th iteration of my fitness tracker web app.

- [I. Packages](#i-packages)
- [II. Milestones](#ii-milestones)
- [III. Design](#iii-design)

## Quick Reference Todos

Build demonstration projects to learn and reference.

- [x] Logger

- [x] Build ID

- [x] EJS Generators

- [ ] Plop

- [ ] Dexie

- [ ] JS Date Utilities (and constants)

- [ ] Vue3 Demo App for package experimentation

  - [ ] Elements Plus UI components
  - [ ] Pinia (see how it compares to Vuex)
  - [ ] Vue3 Charts (some test charts)
  - [ ] TypeScript (crash course)

- [ ] Vue3 Demo App for DX (true boilerplate app)

  - [ ] Setup .vscode files
  - [ ] Setup ESLint
  - [ ] Setup Prettier
  - [ ] Setup Vue3 specific DX packages
  - [ ] Setup Jest (unit tests only)
  - [ ] Setup TypeScript
  - [ ] Setup Babel
  - [ ] Getting Jest to work with Typescript
  - [ ] Getting other packages to work with TypeScript
  - [ ] Setup Vite (GitHub Pages deployment?)
  - [ ] Cleanup your VSCode app settings
  - [ ] Cleanup GitHub Gists
  - [ ] Vue3 Composition API examples (setup function)

- [ ] Other Utilies and demo apps...

## I. Packages

Summary of packages used in this project with links.

### Framework

- Vue 3 - <https://v3.vuejs.org/>

### State

- Pinia - <https://pinia.vuejs.org/> (may not need)

### Storage

- Dexie - <https://dexie.org/>

### Design

- Element Plus - <https://element-plus.org/en-US/>
- Vue3 Charts - <https://vue3charts.org/>
- Material Icons - <https://fonts.google.com/icons?selected=Material+Icons>

### Testing

- Jest - <https://jestjs.io/>

### Deployment (GitHub Pages)

- Vite - <https://vitejs.dev/>
- Research...

### Utilities

- VueUse - <https://vueuse.org/>
- Plop - <https://plopjs.com/>
- Hygen - <http://www.hygen.io/>
- Cross-env - <https://www.npmjs.com/package/cross-env>

### DX

- TypeScript - <https://www.typescriptlang.org/>
- ESLint - <https://eslint.org/>
- Prettier - <https://prettier.io/>
- Stylelint - <https://stylelint.io/>
- Markdownlint - <https://github.com/DavidAnson/markdownlint>
- EditorConfig - <https://editorconfig.org/>
- Research... (package for Vue3 intelisense)

## II. Milestones

Please leave your Milestones list intact! Check the box as you complete them. Add Milestones as you think of them. Put removed Milestones in the `Cancelled Milestones` section.

- [ ] Build out app data structures

  - [ ] Interfaces
  - [ ] Enums
  - [ ] Classes
  - [ ] Data Sources for Dexie and Pinia

- [ ] App Design

  - [ ] Reference other versions of the app for ideas (ongoing...)

- [ ] Misc Ideas
  - [ ] Ability to manaully create, update, or delete actions and records
  - [ ] Base components: BaseEmpty, BaseSuccess, BaseError, BaseLoading
  - [ ] Progress or skeleton loaders
  - [ ] Validators for data field limits
  - [ ] SummaryCard for completed workout
  - [ ] JSON importer/exporter
  - [ ] Make use of generators?
  - [ ] Look through utils in previous apps
  - [ ] Make use of charts

### Cancelled Milestones

Move Milestones you don't intend to complete to this section so they are documented.

## III. Design

WIP

### Pages

WIP

### Layouts

WIP

### Components

WIP

## Content from old fitness app repos --------------------

Reference your `fitness-trackers-archive` repo for more old code.

```typescript
// Enums

enum Category {
  arms = 'Arms',
  back = 'Back',
  cardio = 'Cardio',
  chest = 'Chest',
  compound = 'Compound',
  core = 'Core',
  legs = 'Legs',
  shoulders = 'Shoulders',
  misc = 'Miscellaneous',
  event = 'Event',
  upperBody = 'Upper Body',
  lowerBody = 'Lower Body',
  fullBody = 'Full Body',
}

enum Equipment {
  barbell = 'Barbell',
  dumbbell = 'Dumbbell',
  kettlebell = 'Kettlebell',
  plate = 'Plate',
  pullupBar = 'Pull-up Bar',
  cardioMachine = 'Cardio Machine',
  cableMachine = 'Cable Machine',
  weightMachine = 'Weight Machine',
  weightVest = 'Weight Vest',
  bands = 'Resistance Bands',
  chains = 'Chains',
}

enum UnitPreference {
  imperial = 'Imperial',
  metric = 'Metric',
}

enum DistanceConversion {
  kilometersToMiles = 0.621371,
  MilesToKilometers = 1.609344,
}

enum WeightConversion {
  kilogramsToPounds = 2.204623,
  poundsToKilograms = 0.453592,
}

enum HeightConversion {
  centimetersToInches = 0.393701,
  inchesToCentimeters = 2.54,
}

enum Limit {
  maxWorkoutExercises = 100,
  maxSets = 100,
  maxRounds = 100,
  maxNameLength = 50,
  maxDescriptionLength = 300,
  maxNoteLength = 300,
}

enum DataStore {
  exercises = 'exercises',
  workouts = 'workouts',
  measurements = 'measurements',
  exerciseRecords = 'exerciseRecords',
  workoutRecords = 'workoutRecords',
  measurementRecords = 'measurementRecords',
  inProgressExercises = 'inProgressExercises',
  inProgressWorkout = 'inProgressWorkout',
}

// Interfaces

interface IEntity {
  id: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string,
  isDeleted: boolean,
}

interface INote {
  note: string,
}

interface IUser extends IEntity {
  email: string,
  birthMonth: number,
  birthYear: number,
  height: IHeight,
}

interface IDescriptors {
  name: string,
  description: string,
  previousRecord: string,
}

interface IExercise extends IEntity, IDescriptors {
  category: Category,
  equipment: Equipment[],
  hasSets: boolean,
  hasWeight: boolean,
  hasReps: boolean,
  hasDuration: boolean,
  hasDistance: boolean,
}

interface IWorkout extends IEntity, IDescriptors {
  exerciseIds: string[],
}

interface IExerciseRecord extends IEntity, INote {
  exerciseId: string,
  sets: IExerciseSet[],
}

interface IExerciseSet {
  weight: IWeight,
  reps: number,
  duration: number,
  distance: IDistance,
}

interface IWorkoutRecord extends IEntity, INote {
  duration: number,
  workoutId: string,
}

interface IMeasurementRecord extends IEntity, INote {
  bodyWeight: number,
  bodyFat: number,
  neck: number,
  shoulders: number,
  chest: number,
  biceps: number,
  forearms: number,
  waist: number,
  thighs: number,
  calves: number,
}

interface IWeight {
  kilograms: number,
  pounds: number,
}

interface IDistance {
  kilometers: number,
  miles: number,
}

interface IHeight {
  centimeters: number,
  inches: number,
}

// Dependency Injection

interface IMyComponentDependencies {
  databaseService: IDatabaseService
  storeService: IStoreService
}

const dependencies = {
  databaseService: databaseThing(),
  storeService: storeThing(),
}

const myComponent({ dependencies: IMyComponentDependencies }) {
  dependencies.databaseService.doSomething()
  dependencies.storeService.doSomething()
}

// Interfaces using functions?

interface IDatabase {
  getExercises(): Exercise[],
  getWorkouts(): Workout[],
  getActiveExercises(): ExerciseRecord[],
  getActiveWorkouts(): WorkoutRecord[],
  getMeasurementRecords(): MeasurementRecord[],
  updateExercises(): null,
  updateWorkouts(): null,
  updateActiveExercises(): null,
  updateActiveWorkouts(): null,
  updateMeasurementRecords(): null,
  deleteExercises(): null,
  deleteWorkouts(): null,
  deleteActiveExercises(): null,
  deleteActiveWorkouts(): null,
  deleteMeasurementRecords(): null,
}

// Exporter Idea

interface ExportSummary {
  appVersion: number,
  exporterVersion: number,
  createdAt: date,
  totalCategories: number,
  totalEquipment: number,
  totalWorkouts: number,
  totalWorkoutRecords: number,
  totalExercises: number,
  totalExerciseRecords: number,
  totalMeasurementRecords: number,
  categories: [],
  equipment: [],
  workouts: [],
  workoutRecords: [],
  exercises: [],
  exerciseRecords: [],
  measurementRecords: [],
}

// Functions

export const isDef = (value) => {
  return value === undefined || value === null
}

export const isUndef = (value) => {
  return value !== undefined && value !== null
}

export const isPrimitive = (value) => {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

export const isTrue = (value) => {
  return value === true
}

export const isFalse = (value) => {
  return value === false
}

export const isObject = (obj) => {
  return obj !== null && typeof obj === 'object'
}

export const isExerciseContainer(container) {
  return container instanceof ExerciseContainer
}

export const INPUT_TYPE = Object.freeze({
  confirmation: 'Confirmation',
  sets: 'Sets',
  weight: 'Weight',
  reps: 'Reps',
  duration: 'Duration',
  distance: 'Distance',
}

// Other Ideas

const ObjectiveType = {
  REST: "Rest",
  TEMPO: "Tempo",
  INTENSITY: "Intensity",
  RESISTENCE: "Resistence",
  INCLINE: "Incline",
  MAXIMUM: "Maximum"
}

const Icon = {
  NOTES: "assignment",
  REST: "hourglass_empty",
  TEMPO: "speed",
  INTENSITY: "whatshot",
  RESISTENCE: "fitness_center",
  INCLINE: "signal_cellular_null",
  MAXIMUM: "priority_high"
}

const IntensityType = {
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low"
}

const TempoType = {
  FAST: "Fast",
  NORMAL: "Normal",
  SLOW: "Slow"
}

// nuxt-boilerplate-project (testing Vue components)

import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueMeta from 'vue-meta'
import ErrorPage from './error'

// Error Page is stored in layouts by Nuxt convention
const localVue = createLocalVue()
localVue.use(VueMeta, { keyName: 'head' })

let wrapper

beforeEach(() => {
  const vuetify = new Vuetify()
  wrapper = mount(ErrorPage, {
    propsData: {
      error: null,
    },
    localVue,
    vuetify,
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Page > error', () => {
  test('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('PROPS', () => {
    test('error prop is object that defaults to null', () => {
      expect(ErrorPage.props.error).toMatchObject({
        type: Object,
        default: null,
      })
    })

    test('error prop can recieve a value', () => {
      const object = { statusCode: 500 }
      wrapper.setProps({ error: object })
      expect(wrapper.props().error).toMatchObject(object)
    })
  })
})

```
