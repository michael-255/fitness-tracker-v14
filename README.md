# Fitness Tracker v14

The 14th iteration of my fitness tracker web app.

- [I. Milestones](#i-milestones)
- [II. Drafting](#ii-drafting)

## I. Milestones

Implement the following:

- [ ] Core App
  - [ ] Data Types + LocalDatabase
    - [ ] `_Entity`
    - [ ] `_Action`
    - [ ] `_Record`
    - [ ] `Measurement` (LocalDatabase)
    - [ ] `Exercise` (LocalDatabase)
    - [ ] `Workout` (LocalDatabase)
    - [ ] `MeasurementRecord` (LocalDatabase)
    - [ ] `ExerciseRecord` (LocalDatabase)
    - [ ] `WorkoutRecord` (LocalDatabase)
    - [ ] Add class methods
    - [ ] Add class tests
    - [ ] Add LocalDatabase methods
    - [ ] Add LocalDatabase tests
  - [ ] Constants and enums
  - [ ] App Functionality
    - [ ] Record history and charts
    - [ ] Enitity editing (CRUD)
    - [ ] Field validation
    - [ ] Fitness data importer/exporter

## II. Drafting

```typescript
class _Entity {
  constructor({
    id = createId(),
    createdAt = new Date().toISOString(),
  } = {}) {...}
}

class _Action {
  constructor({
    name = null,
    description = null,
  } = {}) {...}
}

class Measurement {
  // measurements: &id, name
  constructor({
    id = createId(),
    createdAt = new Date().toISOString(),
    name = 'My Measurement',
    description = null,
  } = {}) {...}
}

class Exercise {
  // exercises: &id, name
  constructor({
    id = createId(),
    createdAt = new Date().toISOString(),
    name = 'My Exercise'
    description = null,
    elements = {},
  } = {}) {...}
}

class Workout {
  // workouts: &id, name
  constructor({
    id = createId(),
    createdAt = new Date().toISOString(),
    name = 'My Workout'
    description = null,
    exerciseIds = [],
  } = {}) {...}
  getWorkoutExercises() {...}
}

class _Record {
  constructor({
    parentId = null,
    note = null,
    data = {},
  } = {}) {...}
  getParentEntity() {...}
}

class MeasurementRecord {
  // measurementRecords: &id, createdAt, measurementId
  constructor({
    id = createId(),
    createdAt = new Date().toISOString(),
    note = null,
    data = {}, // lbs and inches
  } = {}) {...}
}

class ExerciseRecord {
  // exerciseRecords: &id, createdAt, exerciseId
  // activeExercises: &id
  constructor({
    id = createId(),
    createdAt = new Date().toISOString(),
    note = null,
    data = {},
  } = {}) {...}
}

class WorkoutRecord {
  // workoutRecords: &id, createdAt, workoutId
  // activeWorkout: &id
  constructor({
    id = createId(),
    createdAt = new Date().toISOString(),
    note = null,
    data = {}, // finishedAt
  } = {}) {...}
  getDuration() {...}
}

class ExerciseElements {
  constructor({
    hasConfirm = false,
    hasSets = false,
    hasDuration = false,
    hasDistance = false,
    hasWeight = false,
    hasReps = false,
  } = {}) {...}
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

// Interface methods?
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

// Importer & Exporter
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
