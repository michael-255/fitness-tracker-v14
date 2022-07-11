import type { ActivityStatus, RecordStatus } from '@/constants/enums'
import type { Nullable } from '@/constants/globals'

export const ValidationRegex: Readonly<any> = {
  Date: /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z$/, // JS ISO Date
  ShortText: /^.{1,40}$/, // 1-40 alphanumeric characters
  LongText: /^.{0,500}$/, // 0-500 alphanumeric characters
}

export function isBoolean(value: any): boolean {
  return value === true || value === false
}

export function isRequired(value: any): boolean {
  if (Array.isArray(value)) {
    return value.length > 0
  } else {
    return !!value
  }
}

export function isIdValid(id: string): boolean {
  return isRequired(id) && ValidationRegex.ShortText.test(id)
}

export function isCreatedAtValid(date: string): boolean {
  return isRequired(date) && ValidationRegex.Date.test(date)
}

export function isFinishedAtValid(date: Nullable<string>): boolean {
  return date === null || ValidationRegex.Date.test(date)
}

export function isNameValid(name: string): boolean {
  return isRequired(name) && ValidationRegex.ShortText.test(name)
}

export function isTextAreaValid(text: Nullable<string>): boolean {
  return text === null || ValidationRegex.LongText.test(text)
}

export function isStatusValid(status: ActivityStatus | RecordStatus): boolean {
  return isRequired(status)
}
