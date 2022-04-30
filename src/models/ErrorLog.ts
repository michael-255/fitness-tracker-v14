import { createId } from '@/utils/build-id'
import { Store } from '@/constants'

// Exports for LocalDatabase
export const errorLogStoreIndices = Object.freeze({ [Store.ERROR_LOGS]: '&id, createdAt, message' })

export interface IErrorLog {
  id: string
  createdAt: string
  message?: string[]
  stack?: string[]
}

/**
 * ErrorLog Class
 * @param {Error|string|undefined} error (Required)
 */
export class ErrorLog {
  id: string
  createdAt: string
  message?: string[]
  stack?: string[]

  constructor(error: Error | string | undefined) {
    if (!error) {
      error = new Error('Undefined App Error.')
    } else if (typeof error === 'string') {
      error = new Error(error)
    }

    this.id = createId()
    this.createdAt = new Date().toISOString()
    this.message = error?.message
      ?.trim() // remove excess whitespace
      ?.split('\n') // seperate on the newline character
      ?.map((s) => s?.trim()) // trim whitespace on each new string element
      ?.filter(Boolean) // remove falsy elements
    this.stack = error?.stack
      ?.trim() // remove excess whitespace
      ?.split('\n') // seperate on the newline character
      ?.map((s) => s?.trim()) // trim whitespace on each new string element
      ?.filter(Boolean) // remove falsy elements
  }
}
