import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isAdminAuth: false,
    adminId: null,
    isAuthInitialized: false
  }),
  actions: {
    setAdmin(user) {
      if (user) {
        this.isAdminAuth = true;
        this.adminId = user.id;
      } else {
        this.isAdminAuth = false;
        this.adminId = null;
      }
    },
    setInitialized() {
      this.isAuthInitialized = true;
    }
  }
})
