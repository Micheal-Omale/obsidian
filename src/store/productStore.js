import { defineStore } from 'pinia';
import { getProducts, addProduct, deleteProduct } from '../services/productService.js';

export const useProductStore = defineStore('product', {
  state: () => ({
    items: [],
    isLoading: false,
    isInitialized: false
  }),
  actions: {
    async fetchAllProducts() {
      this.isLoading = true;
      this.items = await getProducts();
      this.isInitialized = true;
      this.isLoading = false;
    },
    async createProduct(productData) {
      const result = await addProduct(productData);
      if (result.success) {
        // Fast optimistic refetch ensuring UI is perfectly matched with cloud
        await this.fetchAllProducts();
      }
      return result;
    },
    async removeProduct(productId) {
      const result = await deleteProduct(productId);
      if (result.success) {
        // Drop product instantly locally without hard reload
        this.items = this.items.filter(item => item.id !== productId);
      }
      return result;
    }
  }
});
