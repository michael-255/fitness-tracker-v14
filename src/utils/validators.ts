export enum ValidationMessage {
  REQUIRED = '* Required',
  ID = 'Id must be of format XXXX-XXXX-XXXX',
  NAME = 'Name must be between 4 and 40 alphanumeric characters',
  DESCRIPTION = 'Description is limited to 500 alphanumeric characters',
  NOTE = 'Note is limited to 500 alphanumeric characters',
}

export const Regex = Object.freeze({
  Id: /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/,
  Name: /^.{4,40}$/, // 4-40 character
  Description: /^.{0,500}$/, // 0-500 characters
  Note: /^.{0,500}$/, // 0-500 characters
})

export function isRequired(value: any): boolean {
  return !!value
}

export function isIdValid(id: string): boolean {
  return Regex.Id.test(id)
}

export function isNameValid(Name: string): boolean {
  return Regex.Name.test(Name)
}

export function isDescriptionValid(Name: string): boolean {
  return Regex.Description.test(Name)
}

export function isNoteValid(Name: string): boolean {
  return Regex.Note.test(Name)
}
