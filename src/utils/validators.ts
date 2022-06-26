import type { ActivityName, CreatedAt, FinishedAt, Id, TextBlock } from '@/constants/types'

/**
 * @note
 * Make sure the ValidationLimit, ValidationMessage, and ValidationRegex contraints match.
 */

export enum ValidationLimit {
  ID = 40,
  NAME = 40,
  TEXTBLOCK = 500,
}

export enum ValidationMessage {
  REQUIRED = '* Required',
  ID = 'Id must be between 1 and 40 alphanumeric characters',
  DATE = 'Date must be of format YYYY-MM-DDTHH:MM:SS.###Z',
  NAME = 'Name must be between 4 and 40 alphanumeric characters',
  TEXTBLOCK = 'Text is limited to 500 alphanumeric characters',
}

export const ValidationRegex = Object.freeze({
  Id: /^.{1,40}$/, // 1-40 alphanumeric characters
  Date: /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z$/, // JS ISO Date
  Name: /^.{4,40}$/, // 4-40 alphanumeric characters
  TextBlock: /^.{0,500}$/, // 0-500 alphanumeric characters
})

export function isRequired(value: any): boolean {
  if (Array.isArray(value)) {
    return value.length > 0
  } else {
    return !!value
  }
}

export function isIdValid(id: Id): boolean {
  return ValidationRegex.Id.test(id)
}

export function isCreatedAtValid(date: CreatedAt): boolean {
  return ValidationRegex.Date.test(date)
}

export function isFinishedAtValid(date: FinishedAt): boolean {
  return date === null || ValidationRegex.Date.test(date)
}

export function isNameValid(name: ActivityName): boolean {
  return ValidationRegex.Name.test(name)
}

export function isTextBlockValid(text: TextBlock): boolean {
  return text === null || ValidationRegex.TextBlock.test(text)
}
