<script setup>
import { computed } from 'vue';
import { useCartStore } from '../../store/cartStore.js';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const cartStore = useCartStore();

// Dynamically resolve image — supports both Firebase URLs and local paths
const imageSrc = computed(() => {
  const img = props.product.img || props.product.src || '';
  return img.startsWith('http') ? img : img.replace('/public', '');
});

const addToCart = () => {
  // Dispatches product with resolved image and price
  cartStore.addToCart({ ...props.product, img: imageSrc.value, price: props.product.price || 240 });
};
</script>

<template>
  <div class="product-card relative flex flex-col items-start cursor-pointer w-full">
    <!-- Image Wrapper with Explicit CSS Hover Physics -->
    <div class="image-mask w-full aspect-[3/4] overflow-hidden mb-4 bg-[#0f0f0f]">
      <img :src="imageSrc" :alt="product.title" class="product-image w-full h-full object-cover">
    </div>
    
    <!-- Miniaturized Meta Info -->
    <div class="meta-section w-full border-t border-white/20 pt-3 flex justify-between items-start">
      <div class="pr-3">
        <h3 class="font-bold text-sm mb-1 leading-tight uppercase tracking-[0.1em]">{{ product.title }}</h3>
        <p class="text-[10px] uppercase tracking-[0.2em] text-[#888]">{{ product.description }}</p>
      </div>
      <span class="text-xs font-bold tracking-[0.2em] mt-0.5 shrink-0">${{ product.price || 240 }}</span>
    </div>

    <!-- Minimalist Action Button -->
    <button @click="addToCart" class="add-btn mt-4 w-full py-3 border border-[#e2e8f0] bg-[#e2e8f0] text-black transition-colors duration-[400ms] text-[10px] font-black uppercase tracking-[0.3em]">
      [ + ADD TO CART ]
    </button>
  </div>
</template>

<style scoped>
/* Explicit Physical Transitions injected here for absolute 2s slow-off fade */
.product-image {
  filter: grayscale(100%);
  transition: filter 2s cubic-bezier(0.22, 1, 0.36, 1), transform 2s ease-out;
}
.product-card:hover .product-image {
  filter: grayscale(0%);
  transform: scale(1.03); 
}

/* Base Utility Classes */
.w-full { width: 100%; }
.aspect-\[3\/4\] { aspect-ratio: 3 / 4; }
.overflow-hidden { overflow: hidden; }
.mb-4 { margin-bottom: 1rem; }
.mt-4 { margin-top: 1rem; }
.pt-3 { padding-top: 0.75rem; }
.pr-3 { padding-right: 0.75rem; }
.mt-0\.5 { margin-top: 0.125rem; }
.mb-1 { margin-bottom: 0.25rem; }
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-start { align-items: flex-start; }
.justify-between { justify-content: space-between; }
.shrink-0 { flex-shrink: 0; }
.border-t { border-top-width: 1px; }
.border-white\/20 { border-color: rgba(255,255,255,0.2); }
.border { border-width: 1px; }
.bg-\[\#0f0f0f\] { background-color: #0f0f0f; }

.add-btn:hover { 
  background-color: transparent; 
  color: #e2e8f0; 
  cursor: pointer;
}

.font-bold { font-weight: 700; }
.font-black { font-weight: 900; }
.text-sm { font-size: 0.875rem; }
.text-xs { font-size: 0.75rem; }
.text-\[10px\] { font-size: 10px; }
.leading-tight { line-height: 1.25; }
.uppercase { text-transform: uppercase; }
.tracking-\[0\.1em\] { letter-spacing: 0.1em; }
.tracking-\[0\.2em\] { letter-spacing: 0.2em; }
.tracking-\[0\.3em\] { letter-spacing: 0.3em; }
.text-\[\#888\] { color: #888; }
.text-black { color: #000; }
.bg-\[\#e2e8f0\] { background-color: #e2e8f0; }
.cursor-pointer { cursor: pointer; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.transition-colors { transition-property: background-color, border-color, color, fill, stroke; }
.duration-\[400ms\] { transition-duration: 400ms; }
</style>
