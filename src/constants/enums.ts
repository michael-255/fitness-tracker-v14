export enum MeasurementType {
  LBS = 'lbs',
  FEET = 'feet',
  INCHES = 'inches',
  PERCENT = '%',
}

export enum ExerciseTracks {
  MULTIPLE_SETS = 'Multiple Sets',
  WEIGHT_LBS = 'Weight (lbs)',
  REPS = 'Reps',
  DURATION_MINUTES = 'Duration (minutes)',
  DISTANCE_MILES = 'Distance (miles)',
}

export enum LogLevel {
  FATAL = 'Fatal',
  ERROR = 'Error',
  WARN = 'Warning',
  INFO = 'Info',
  DEBUG = 'Debug',
}

export enum ActivityStatus {
  ENABLED = 'Enabled',
  DISABLED = 'Disabled',
  ARCHIVED = 'Archived',
}

export enum RecordStatus {
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  SKIPPED = 'Skipped',
}

export enum DBTable {
  MEASUREMENTS = 'measurements',
  EXERCISES = 'exercises',
  WORKOUTS = 'workouts',
  MEASUREMENT_RECORDS = 'measurementRecords',
  EXERCISE_RECORDS = 'exerciseRecords',
  WORKOUT_RECORDS = 'workoutRecords',
  APP_LOGS = 'appLogs',
}

export enum Views {
  DASHBOARD = 'DashboardView',
  ACTIVE = 'ActiveView',
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
  ACTIVE = 'local_fire_department',
  SAVE = 'save',
  CLOSE = 'close',
  EDIT = 'edit',
  DELETE = 'delete',
  CODE = 'code',
  WEB = 'language',
  INFO = 'info',
  WARN = 'warning',
  ERROR = 'error',
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
