export enum LogLevel {
  FATAL = 'Fatal',
  ERROR = 'Error',
  WARN = 'Warning',
  INFO = 'Info',
  DEBUG = 'Debug',
}

export enum DBTable {
  MEASUREMENTS = 'measurements',
  EXERCISES = 'exercises',
  WORKOUTS = 'workouts',
  MEASUREMENT_RECORDS = 'measurementRecords',
  EXERCISE_RECORDS = 'exerciseRecords',
  WORKOUT_RECORDS = 'workoutRecords',
  ACTIVE_EXERCISES = 'activeExercises',
  ACTIVE_WORKOUTS = 'activeWorkouts',
  APP_LOGS = 'appLogs',
}

export enum Views {
  DASHBOARD = 'DashboardView',
  ACTIVEWORKOUT = 'ActiveWorkoutView',
  REPORTS = 'ReportsView',
  MEASUREMENTS = 'MeasurementsView',
  EXERCISES = 'ExercisesView',
  WORKOUTS = 'WorkoutsView',
  APPLOGS = 'AppLogsView',
  OPTIONS = 'OptionsView',
  ABOUT = 'AboutView',
  NOTFOUND = 'NotFoundView',
}

export enum Layouts {
  DEFAULT = 'DefaultLayout',
  MENU = 'MenuLayout',
}

export enum Icon {
  // Entities
  ACTIVITIES = 'directions_run',
  RECORDS = 'web_stories',
  MEASUREMENTS = 'straighten',
  EXERCISES = 'fitness_center',
  WORKOUTS = 'assignment',
  APPLOGS = 'plagiarism',
  // Misc
  DASHBOARD = 'dashboard',
  REPORT = 'timeline',
  MANAGEMENT = 'tune',
  WORKOUT = 'assignment',
  SETTINGS = 'settings',
  DETAILS = 'summarize',
  SAVE = 'save',
  CLOSE = 'close',
  EDIT = 'edit',
  DELETE = 'delete',
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

export enum Links {
  GITHUB = 'https://github.com/michael-255/fitness-tracker-v14',
  MYAPPS = 'https://www.example.com', // @todo - Make 'My Apps' site
}
