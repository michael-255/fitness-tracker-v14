import { defineStore } from 'pinia'

// types for the state?

export const useUIStore = defineStore({
  id: 'ui',

  state: () => ({
    drawer: false,
    confirmDialog: {
      isActive: false,
      confirmFunc: () => null, // default function that closes the dialog?
      title: '',
      icon: '',
      message: '',
      color: '',
    },
    fullDialog: {
      isActive: false,
      saveFunc: () => null, // default function that closes the dialog?
      title: '',
      // How to handle the inner inputs? (loop through provided data?)
    },
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

    openConfirmDialog(confirmFunc: any): void {
      this.confirmDialog.confirmFunc = confirmFunc
      this.confirmDialog.isActive = true
    },
  },
})
