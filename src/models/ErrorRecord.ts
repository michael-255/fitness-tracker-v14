// Exports for LocalDatabase
export const ErrorRecordStore = Object.freeze({ errorRecords: '++id, createdAt, message' })

export interface IErrorRecord {
  createdAt: string
  message: string
  stack: string[] | undefined
}

/**
 * ErrorRecord Class
 * @param {Error|string|undefined} error (Required)
 */
export class ErrorRecord {
  createdAt: string
  message: string
  stack: string[] | undefined

  constructor(error: Error | string | undefined) {
    if (!error) {
      error = new Error('Undefined App Error.')
    } else if (typeof error === 'string') {
      error = new Error(error)
    }

    this.createdAt = new Date().toISOString()
    this.message = error.message
    this.stack = error?.stack
      ?.trim() // remove excess whitespace
      ?.split('\n') // seperate on the newline character
      ?.map((s) => s?.trim()) // trim whitespace on each new string element
      ?.filter(Boolean) // remove falsy elements
  }
}
