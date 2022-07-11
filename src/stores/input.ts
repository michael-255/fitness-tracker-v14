import { defineStore } from 'pinia'

type InputObject = {
  id: string
  // createdAt: null
  // name: null
  // description: null
  // status: null
  // trackLbs: null
  // trackInches: null
  // trackFeet: null
  // trackPercent: null
}

/**
 * @todo Typescript for the state?
 */
export const useInputStore = defineStore({
  id: 'input',

  state: () =>
    ({
      id: '',
      // createdAt: null,
      // name: null,
      // description: null,
      // status: null,
      // trackLbs: null,
      // trackInches: null,
      // trackFeet: null,
      // trackPercent: null,
    } as InputObject),

  actions: {
    defaultState(): void {
      this.id = ''
    },

    setId(id: string): void {
      this.id = id
    },

    getId(): string {
      return this.id
    },
  },
})
