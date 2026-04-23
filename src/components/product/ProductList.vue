<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';
import { useProductStore } from '../../store/productStore.js';
import ProductCard from './ProductCard.vue';

const productStore = useProductStore();

onMounted(async () => {
  // Directly hitting the Cloud Feed instead of hardcoded JSON
  if (productStore.items.length === 0) {
    await productStore.fetchAllProducts();
  }

  // Inject brute GSAP reveal staggered securely after DOM updates
  setTimeout(() => {
    gsap.fromTo('.product-card-wrap', 
      { y: 150, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'expo.out' }
    );
  }, 100);
});
</script>

<template>
  <div>
    <!-- Brutalist Database Interstitial State -->
    <div v-if="productStore.isLoading" class="w-full text-center py-32 text-white font-black uppercase tracking-[0.5em] text-sm opacity-50">
      INJECTING LIVE CLOUD FEED...
    </div>
    
    <!-- Active Grid Populated Directly from DB -->
    <div v-else class="product-grid">
      <div v-for="product in productStore.items" :key="product.id" class="product-card-wrap fashion-magnetic">
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Preserving minimalist strict structure seamlessly */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 4rem 1.5rem;
  width: 100%;
}
@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 3rem 1rem;
  }
}
.w-full { width: 100%; }
.text-center { text-align: center; }
.py-32 { padding-top: 8rem; padding-bottom: 8rem; }
.text-white { color: #ffffff; }
.font-black { font-weight: 900; }
.uppercase { text-transform: uppercase; }
.tracking-\[0\.5em\] { letter-spacing: 0.5em; }
.text-sm { font-size: 0.875rem; }
.opacity-50 { opacity: 0.5; }
</style>
