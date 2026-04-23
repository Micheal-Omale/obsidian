import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isSidebarOpen: false
  }),
  getters: {
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    cartTotal: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
  },
  actions: {
    async addToCart(product) {
      // Async framework ready for upcoming Firebase injection
      // e.g., await api.syncCart(newCartData)
      
      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      
      // Violently pop the sidebar open to alert the user
      this.isSidebarOpen = true 
    },
    removeItem(productId) {
      this.items = this.items.filter(item => item.id !== productId)
    },
    updateQuantity(productId, amount) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        item.quantity += amount
        if (item.quantity <= 0) {
          this.removeItem(productId)
        }
      }
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    clearCart() {
      this.items = []
      this.isSidebarOpen = false
    }
  }
})
