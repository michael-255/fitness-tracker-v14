import { createId } from '@/utils/build-id'
import { Store } from '@/constants'

// Exports for LocalDatabase
export const errorLogStoreIndices = Object.freeze({ [Store.ERROR_LOGS]: '&id, createdAt, name' })

export interface IErrorLog {
  id: string
  createdAt: string
  name: string
  inner?: any
  failures?: string[]
  failuresByPos?: string[]
  message?: string[]
  stack?: string[]
}

/**
 * ErrorLog Class
 * @param {Error|any} caughtError (Required) - Error provided in the catch block
 * @param {Error} localError (Optional) - Additional error for name and trace information
 */
export class ErrorLog {
  id: string
  createdAt: string
  name: string
  inner?: any
  failures?: string[]
  failuresByPos?: string[]
  message?: string[]
  stack?: string[]

  constructor(caughtError: Error | any, localError?: Error) {
    this.id = createId()
    this.createdAt = new Date().toISOString()
    this.name = `${localError?.message}:${caughtError?.name}` // first message is undefined if no localError provided
    this.inner = caughtError?.inner
    this.failures = caughtError?.failures
    this.failuresByPos = caughtError?.failuresByPos
    this.message = [...this.stringToArray(localError?.message), ...this.stringToArray(caughtError?.message)]
    this.stack = [...this.stringToArray(localError?.stack), ...this.stringToArray(caughtError?.stack)]
  }

  stringToArray(str: string | undefined): string[] {
    if (str) {
      return str
        ?.trim() // remove excess whitespace
        ?.split('\n') // seperate on the newline character
        ?.map((s: string) => s?.trim()) // trim whitespace on each new string element
        ?.filter(Boolean) // remove falsy elements
    } else {
      return []
    }
  }
}
