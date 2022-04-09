# Fitness Tracker v14

The 14th iteration of my fitness tracker web app.

- [I. Packages](#i-packages)
- [II. Milestones](#ii-milestones)
- [III. Design](#iii-design)

## I. Packages

Don't need the package list anymore.

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

## Database

`measurements`

- &id
- name

`exercises`

- &id
- name

`workouts`

- &id
- name

`measurementRecords`

- &id
- measurementId
- createdAt

`exerciseRecords`

- &id
- exerciseId
- createdAt

`workoutRecords`

- &id
- workoutId
- createdAt

`activeExercises`

- &id
- "
- "

`activeWorkout`

- &id
- "
- "

```typescript
class Measurement {
  // Indices: &id, name
  constructor({
    id = createId(),
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString(),
    name = 'My Measurement',
    description = null,
  } = {}) {...}
}

class Exercise {
  // Indices: &id, name
  constructor({
    id = createId(),
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString(),
    name = 'My Exercise'
    description = null,
    uiConfig = {}, // UIConfig type?
  } = {}) {...}
}

class Workout {
  // Indices: &id, name
  constructor({
    id = createId(),
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString(),
    name = 'My Workout'
    description = null,
    exerciseIds = [],
  } = {}) {...}
}

class MeasurementRecord {
  // Indices: &id, createdAt, measurementId
  constructor({
    id = createId(),
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString(),
    note = null,
    measurementId = null,
    value = null, // in, cm... Unit type?
  } = {}) {...}
}

class ExerciseRecord {
  // Indices: &id, createdAt, exerciseId
  constructor({
    id = createId(),
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString(),
    note = null,
    exerciseId = null,
    data = {}, // @todo - consider how you want to store exercise data
  } = {}) {...}
}

class WorkoutRecord {
  // Indices: &id, createdAt, workoutId
  constructor({
    id = createId(),
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString(),
    note = null,
    workoutId = null,
    finishedAt = null,
  } = {}) {...}
  // duration method
}

class ExerciseUIConfig {
  constructor({
    hasConfirm = false,
    hasSets = false,
    hasDuration = false,
    hasDistance = false,
    hasWeight = false,
    hasReps = false,
  } = {}) {...}
}

class Weight {
  constructor({
    weight = 0,
    unitPref = null,
  } = {}) {
    this._kg = weight
    this._lbs = weight
  }
}

class Distance {
  constructor({
    distance = 0,
    unitPref = null,
  } = {}) {
    this._km = distance
    this._mi = distance
  }
}

class MeasureSize {
  constructor({
    size = 0,
    unitPref = null,
  } = {}) {
    this._in = height // display as feet for some measurements
    this._cm = height
  }
}

enum UnitPreference {
  IMPERIAL = 'Imperial',
  METRIC = 'Metric',
}

enum DistanceConversion {
  KM_TO_MI = 0.621371,
  MI_TO_KM = 1.609344,
}

enum WeightConversion {
  KG_TO_LBS = 2.204623,
  LBS_TO_KG = 0.453592,
}

enum MeasureSizeConversion {
  CM_TO_IN = 0.393701,
  IN_TO_CM = 2.54,
}

enum Limits {
  maxWorkoutExercises = 40,
  maxSets = 100,
  maxNameLength = 50,
  maxDescriptionLength = 500,
  maxNoteLength = 1000,
}

enum Icons {
  NOTES = 'assignment',
  REST = 'hourglass_empty',
  TEMPO = 'speed',
  INTENSITY = 'whatshot',
  RESISTENCE = 'fitness_center',
  INCLINE = 'signal_cellular_null',
  MAXIMUM = 'priority_high'
}

```

## Content from old fitness app repos --------------------

Reference your `fitness-trackers-archive` repo for more old code.

```typescript
// Interfaces

interface IEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  isDeleted: boolean;
}

interface INote {
  note: string;
}

interface IUser extends IEntity {
  email: string;
  birthMonth: number;
  birthYear: number;
  height: IHeight;
}

interface IDescriptors {
  name: string;
  description: string;
  previousRecord: string;
}

interface IExercise extends IEntity, IDescriptors {
  category: Category;
  equipment: Equipment[];
  hasSets: boolean;
  hasWeight: boolean;
  hasReps: boolean;
  hasDuration: boolean;
  hasDistance: boolean;
}

interface IWorkout extends IEntity, IDescriptors {
  exerciseIds: string[];
}

interface IExerciseRecord extends IEntity, INote {
  exerciseId: string;
  sets: IExerciseSet[];
}

interface IExerciseSet {
  weight: IWeight;
  reps: number;
  duration: number;
  distance: IDistance;
}

interface IWorkoutRecord extends IEntity, INote {
  duration: number;
  workoutId: string;
}

interface IMeasurementRecord extends IEntity, INote {
  bodyWeight: number;
  bodyFat: number;
  neck: number;
  shoulders: number;
  chest: number;
  biceps: number;
  forearms: number;
  waist: number;
  thighs: number;
  calves: number;
}

interface IWeight {
  kilograms: number;
  pounds: number;
}

interface IDistance {
  kilometers: number;
  miles: number;
}

interface IHeight {
  centimeters: number;
  inches: number;
}

// Interfaces using functions?

interface IDatabase {
  getExercises(): Exercise[];
  getWorkouts(): Workout[];
  getActiveExercises(): ExerciseRecord[];
  getActiveWorkouts(): WorkoutRecord[];
  getMeasurementRecords(): MeasurementRecord[];
  updateExercises(): null;
  updateWorkouts(): null;
  updateActiveExercises(): null;
  updateActiveWorkouts(): null;
  updateMeasurementRecords(): null;
  deleteExercises(): null;
  deleteWorkouts(): null;
  deleteActiveExercises(): null;
  deleteActiveWorkouts(): null;
  deleteMeasurementRecords(): null;
}

// Exporter Idea

/**
 * @todo Something to collect record meta data?
 **/

interface ExportSummary {
  appVersion: number;
  exporterVersion: number;
  createdAt: date;
  totalCategories: number;
  totalEquipment: number;
  totalWorkouts: number;
  totalWorkoutRecords: number;
  totalExercises: number;
  totalExerciseRecords: number;
  totalMeasurementRecords: number;
  categories: [];
  equipment: [];
  workouts: [];
  workoutRecords: [];
  exercises: [];
  exerciseRecords: [];
  measurementRecords: [];
}
```
