import { createId } from '@/utils/build-id'
import { Store } from '@/constants'

// Exports for LocalDatabase
export const errorLogStoreIndices = Object.freeze({ [Store.ERROR_LOGS]: '&id, createdAt, message' })

export interface IErrorLog {
  id: string
  createdAt: string
  unexpected: any
  message?: string[]
  stack?: string[]
}

/**
 * ErrorLog Class
 * @param {Error|any} error (Required)
 */
export class ErrorLog {
  id: string
  createdAt: string
  unexpected: any
  message?: string[]
  stack?: string[]

  constructor(error: Error | any) {
    if (error instanceof Error) {
      this.unexpected = null
    } else if (typeof error === 'string') {
      this.unexpected = null
      error = new Error(error)
    } else if (!error) {
      this.unexpected = null
      error = new Error('Undefined App Error.')
    } else {
      this.unexpected = error // pass unkown value into unexpected
      error = new Error('Unexpected data passed into App Error.')
    }

    this.id = createId()
    this.createdAt = new Date().toISOString()
    this.message = error?.message
      ?.trim() // remove excess whitespace
      ?.split('\n') // seperate on the newline character
      ?.map((s: string) => s?.trim()) // trim whitespace on each new string element
      ?.filter(Boolean) // remove falsy elements
    this.stack = error?.stack
      ?.trim() // remove excess whitespace
      ?.split('\n') // seperate on the newline character
      ?.map((s: string) => s?.trim()) // trim whitespace on each new string element
      ?.filter(Boolean) // remove falsy elements
  }
}
