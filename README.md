# Fitness Tracker v14

The 14th iteration of my fitness tracker web app.

- [I. Packages](#i-packages)
- [II. Milestones](#ii-milestones)
- [III. Design](#iii-design)

## Quick Reference Todos

Build demonstration projects to learn and reference.

- [x] Logger

- [x] Build ID

- [x] Hygen

- [x] JS Date Utilities

- [x] Dexie

- [x] TypeScript

- [x] Combine Utils into a single project

- [x] Update your Win10 NODE and NPM versions

- [x] Vue3 Demo App for package experimentation

- [ ] Create Vue3 boilerplate project with detailed readme of setup and how to edit it

  - [x] Create Vue3 Vite app with CLI
  - [x] Install packages (some installed by default???)
  - [x] Setup installed packages
  - [x] Write package setup instructions in the README
  - [x] Add your TypeScript utils
  - [x] Update Readme with edit instructions
  - [x] Using 'rest operator' to avoid needing an 'arrayWrap' method for LocalStorage
  - [x] Update README since you move some utils into services with LocalDatabase
  - [x] Constants
  - [x] Dexie Setup (LocalDatabase)
  - [x] Hygen - Part 1
  - [ ] Build frontend with Quasar

    - [ ] Build router layouts (Quasar)

      - [ ] `DefaultLayout` (none)
      - [ ] `SimpleLayout` (header)
      - [ ] `MenuLayout` (header, drawer)

        - [x] Build store for Drawer controls (+ other UI)
        - [ ] Build test file for UI store

    - [ ] Build view components (Quasar)

      - [ ] `DashboardView`
      - [ ] `AboutView`
      - [ ] `NotFoundView`
      - [ ] Include one Chart/Graph as an example
      - [ ] Include one SVG as an example
      - [ ] Include one MD Icon as an example
      - [ ] Include one Image as an example

    - [ ] Notes

      - [ ] Header
      - [ ] Drawer
      - [ ] Include tests

  - [ ] Hygen - Part 2

    - [ ] Create new Vue Quasar component with test file

  - [ ] Common Validators (+Regexes) - `~/src/utils/validators.ts`

- [ ] Update project package list below (remove it?)
- [x] Delete demo-project-vue3

## I. Packages

Summary of packages used in this project with links (may remove once boilerplate project is done).

### Framework

- Vue 3 - <https://v3.vuejs.org/>

### State

- Pinia - <https://pinia.vuejs.org/> (may not need)

### Storage

- Dexie - <https://dexie.org/>

### Design

- Quasar
- Vue3 Charts - <https://vue3charts.org/>
- Material Icons - <https://fonts.google.com/icons?selected=Material+Icons>

### Testing

- Jest - <https://jestjs.io/>

### Deployment

- Vite - <https://vitejs.dev/>

### Utilities

- VueUse - <https://vueuse.org/>
- Hygen - <http://www.hygen.io/>
- Cross-env - <https://www.npmjs.com/package/cross-env>

### DX

- TypeScript - <https://www.typescriptlang.org/>
- ESLint - <https://eslint.org/>
- Prettier - <https://prettier.io/>
- Stylelint - <https://stylelint.io/>
- Markdownlint - <https://github.com/DavidAnson/markdownlint>

## II. Milestones

Please leave your Milestones list intact! Check the box as you complete them. Add Milestones as you
think of them. Put removed Milestones in the `Cancelled Milestones` section.

- [ ] Build out app data structures

  - [ ] Interfaces (extended)
  - [ ] Enums
  - [ ] Classes (using interfaces)
  - [ ] Data Sources for Dexie and Pinia
  - [ ] Consolidate ideas that you pasted below

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

export const INPUT_TYPE = Object.freeze({
  confirmation: 'Confirmation',
  sets: 'Sets',
  weight: 'Weight',
  reps: 'Reps',
  duration: 'Duration',
  distance: 'Distance',
})

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
```
