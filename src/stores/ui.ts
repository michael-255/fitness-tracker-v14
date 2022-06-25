import { defineStore } from 'pinia'

// types for the state?

export const useUIStore = defineStore({
  id: 'ui',

  state: () => ({
    drawer: false,
  }),

  actions: {
    toggleDrawer(): void {
      this.drawer = !this.drawer
    },

    closeDrawer(): void {
      this.drawer = false
    },

    openDrawer(): void {
      this.drawer = true
    },
  },
})
