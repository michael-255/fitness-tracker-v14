/**
 * @note
 * Make sure the ValidationMaxLength, ValidationMessage, and ValidationRegex contraints match.
 */

import type { Nullable } from '@/constants/globals'

export enum ValidationMaxLength {
  SHORT = 40,
  LONG = 500, // Nullable
}

export enum ValidationMessage {
  REQUIRED = '* Required',
  DATE = 'Date must be of format YYYY-MM-DDTHH:MM:SS.###Z',
  SHORT_TEXT = 'Input must be between 1 and 40 alphanumeric characters',
  LONG_TEXT = 'Input is limited to 500 alphanumeric characters', // Nullable
}

export const ValidationRegex = Object.freeze({
  Date: /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z$/, // JS ISO Date
  ShortText: /^.{1,40}$/, // 1-40 alphanumeric characters
  LongText: /^.{0,500}$/, // 0-500 alphanumeric characters
})

export function isRequired(value: any): boolean {
  if (Array.isArray(value)) {
    return value.length > 0
  } else {
    return !!value
  }
}

export function isShortTextValid(text: string): boolean {
  return ValidationRegex.ShortText.test(text)
}

export function isLongTextValid(text: Nullable<string>): boolean {
  return text === null || ValidationRegex.LongText.test(text)
}

export function isRequiredDateValid(date: string): boolean {
  return ValidationRegex.Date.test(date)
}

export function isNullableDateValid(date: Nullable<string>): boolean {
  return date === null || ValidationRegex.Date.test(date)
}
