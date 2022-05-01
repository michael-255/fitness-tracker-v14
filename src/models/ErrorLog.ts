import { createId } from '@/utils/build-id'
import { Store } from '@/constants'

// Exports for LocalDatabase
export const errorLogStoreIndices = Object.freeze({ [Store.ERROR_LOGS]: '&id, createdAt, name' })

export interface IErrorLog {
  id: string
  createdAt: string
  name?: string
  inner?: any
  failures?: string[]
  failuresByPos?: string[]
  message?: string[]
  stack?: string[]
}

/**
 * ErrorLog Class
 * @param {Error|any} error (Required)
 * @param {Error|any} cause (Optional)
 */
export class ErrorLog {
  id: string
  createdAt: string
  name?: string
  inner?: any
  failures?: string[]
  failuresByPos?: string[]
  message?: string[]
  stack?: string[]

  constructor(error: Error | any, cause?: Error | any) {
    this.id = createId()
    this.createdAt = new Date().toISOString()
    this.name = `${error?.name}:${cause?.name}`
    this.inner = cause?.inner
    this.failures = cause?.failures
    this.failuresByPos = cause?.failuresByPos
    this.message = [...this.stringToArray(error?.message), ...this.stringToArray(cause?.message)]
    this.stack = [...this.stringToArray(error?.stack), ...this.stringToArray(cause?.stack)]
  }

  stringToArray(str: string): string[] {
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
