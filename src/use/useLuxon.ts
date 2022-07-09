import type { Nullable } from '@/constants/types'
import { DateTime } from 'luxon'

/**
 * @todo
 * - Use Luxon in the classes directly to output the date
 * - Remove this composable and import and use in classes instead
 */

export function useLuxon() {
  /**
   * Converts and outputs the ISO date string as a human readable local date string
   * @param date ISO string
   * @returns Example: Sun Jun 6 2022 1:30:45 PM EDT
   */
  function dateISOToDisplay(date: string): string {
    return DateTime.fromISO(date).toFormat('ccc LLL d yyyy ttt')
  }

  /**
   * Converts the display date to an ISO string.
   * @param date Text display date
   * @returns Example: 2022-06-26T18:28:00.000Z
   */
  function dateDisplayToISO(date: Nullable<string>): Nullable<string> {
    if (date) {
      return new Date(date).toISOString()
    } else {
      return null // For nullable FinishedAt date
    }
  }

  return {
    dateISOToDisplay,
    dateDisplayToISO,
  }
}
