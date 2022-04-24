export const DEBUG = Object.freeze(true)

export enum Icons {
  DASHBOARD = 'dashboard',
  CHART = 'timeline',
  MANAGEMENT = 'tune',
  SETTINGS = 'settings',
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
  MANAGEMENT = 'ManagementView',
  SETTINGS = 'SettingsView',
  ABOUT = 'AboutView',
  NOTFOUND = 'NotFoundView',
}

export enum Layouts {
  DEFAULT = 'DefaultLayout',
  MENU = 'MenuLayout',
}
