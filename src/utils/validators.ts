export enum ValidationMessage {
  REQUIRED = '* Required',
  ID = 'Id must be of format XXXX-XXXX-XXXX',
  DATE = 'Date must be of format YYYY-MM-DDTHH:MM:SS.###Z',
  NAME = 'Name must be between 4 and 40 alphanumeric characters',
  TEXTBLOCK = 'Text is limited to 500 alphanumeric characters',
}

export const Regex = Object.freeze({
  Id: /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/,
  CreatedAt: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
  FinishedAt: /(^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$)|^$/, // Supports empty
  Name: /^.{4,40}$/, // 4-40 character
  TextBlock: /^.{0,500}$/, // 0-500 characters
})

export function isRequired(value: any): boolean {
  return !!value
}

export function isIdValid(id: string): boolean {
  return Regex.Id.test(id)
}

export function isCreatedAtValid(date: string): boolean {
  return Regex.CreatedAt.test(date)
}

export function isFinishedAtValid(date: string): boolean {
  return Regex.FinishedAt.test(date)
}

export function isNameValid(Name: string): boolean {
  return Regex.Name.test(Name)
}

export function isTextBlockValid(Name: string): boolean {
  return Regex.TextBlock.test(Name)
}
