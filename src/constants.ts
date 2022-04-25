export const DEBUG = Object.freeze(true)

export enum Links {
  GITHUB = 'https://github.com/michael-255/fitness-tracker-v14',
  MYAPPS = 'https://www.example.com', // @todo - Make 'My Apps' site
}

export enum Icons {
  DASHBOARD = 'dashboard',
  CHART = 'timeline',
  MANAGEMENT = 'tune',
  MEASUREMENT = 'straighten',
  EXERCISE = 'directions_run',
  WORKOUT = 'fitness_center',
  SETTINGS = 'settings',
  CODE = 'code',
  WEB = 'language',
  WARN = 'warning',
  INFO = 'info',
  NOTES = 'assignment',
  REST = 'hourglass_empty',
  TEMPO = 'speed',
  INTENSITY = 'whatshot',
  RESISTENCE = 'fitness_center',
  INCLINE = 'signal_cellular_null',
  MAXIMUM = 'priority_high',
}

export enum Limits {
  maxWorkoutExercises = 40,
  maxSets = 100,
  maxNameLength = 50,
  maxDescriptionLength = 500,
  maxNoteLength = 1000,
}

export enum Views {
  DASHBOARD = 'DashboardView',
  ACTIVEWORKOUT = 'ActiveWorkoutView',
  CHARTS = 'ChartsView',
  MEASUREMENTS = 'MeasurementsView',
  EXERCISES = 'ExercisesView',
  WORKOUTS = 'WorkoutsView',
  OPTIONS = 'OptionsView',
  ABOUT = 'AboutView',
  NOTFOUND = 'NotFoundView',
}

export enum Layouts {
  DEFAULT = 'DefaultLayout',
  MENU = 'MenuLayout',
}
