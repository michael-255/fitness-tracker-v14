// WIP - Add test file once you start using it
export {}

export const AppRegex = Object.freeze({
  Id: /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/,
})

export function isIdValid(id: string): boolean {
  return AppRegex.Id.test(id)
}
