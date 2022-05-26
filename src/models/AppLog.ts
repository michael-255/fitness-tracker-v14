import { createId } from '@/utils/build-id'
import { Store } from '@/constants'

// Exports for LocalDatabase
export const errorLogStoreIndices = Object.freeze({ [Store.APP_LOGS]: '&id, createdAt, name' })

export interface IAppLog {
  id: string
  createdAt: string
  name: string
  data: any
  message?: string[]
  stack?: string[]
}

/**
 * AppLog Class
 * @arg caughtErrorOrObject (Required) - Error provided in the catch block, or log object of a similar structure
 * @arg localError (Optional) - Additional error for name and trace information
 */
export class AppLog {
  id: string
  createdAt: string
  name: string
  data: any
  message?: string[]
  stack?: string[]

  constructor(caughtErrorOrObject: Error | any, localError?: Error) {
    const stringToArray = (str: string | undefined): string[] => {
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

    // Caught Error OR Log Object
    const caughtName = caughtErrorOrObject?.name
    const caughtData = caughtErrorOrObject?.data
    const caughtMessages = stringToArray(caughtErrorOrObject?.message)
    const caughtStack = stringToArray(caughtErrorOrObject?.stack)

    // Local Error (ignoring Error.name since it's just the word Error)
    const localErrorOriginalMessage = localError?.message // User provided when the Error is created
    const localMessages = stringToArray(localError?.message)
    const localStack = stringToArray(localError?.stack)
    localStack.shift() // Removing first element since it just mentions it's an Error type

    this.id = createId()
    this.createdAt = new Date().toISOString()
    this.name = `${localErrorOriginalMessage}:${caughtName}` // first message is undefined if no localError provided
    this.data = caughtData // Make use of this when using an object for logging
    this.message = [...localMessages, ...caughtMessages]
    this.stack = [...localStack, ...caughtStack]
  }
}
