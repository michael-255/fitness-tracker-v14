export const DEBUG = Object.freeze(true)

export enum Icons {
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

export enum Paths {
  DASHBOARD = '/dashboard',
  ABOUT = '/about',
}

export enum Layouts {
  DEFAULT = 'DefaultLayout',
  MENU = 'MenuLayout',
}

export enum Views {
  DASHBOARD = 'DashboardView',
  ABOUT = 'AboutView',
  NOTFOUND = 'NotFoundView',
}
