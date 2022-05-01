import { createId } from '@/utils/build-id'
import { Store } from '@/constants'

// Exports for LocalDatabase
export const errorLogStoreIndices = Object.freeze({ [Store.ERROR_LOGS]: '&id, createdAt, message' })

export interface IErrorLog {
  id: string
  createdAt: string
  details: any
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
  details: any
  message?: string[]
  stack?: string[]

  constructor(error: Error | any) {
    let newError = null

    if (error instanceof Error) {
      this.details = null
      newError = error
    } else if (typeof error === 'string') {
      this.details = null
      newError = new Error(error)
    } else if (!error) {
      this.details = null
      newError = new Error('Undefined App Error.')
    } else {
      this.details = error
      newError = new Error('Unexpected data passed into App Error.')
    }

    this.id = createId()
    this.createdAt = new Date().toISOString()
    this.message = newError?.message
      ?.trim() // remove excess whitespace
      ?.split('\n') // seperate on the newline character
      ?.map((s: string) => s?.trim()) // trim whitespace on each new string element
      ?.filter(Boolean) // remove falsy elements
    this.stack = newError?.stack
      ?.trim() // remove excess whitespace
      ?.split('\n') // seperate on the newline character
      ?.map((s: string) => s?.trim()) // trim whitespace on each new string element
      ?.filter(Boolean) // remove falsy elements
  }
}
