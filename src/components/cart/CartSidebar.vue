<script setup>
import { useCartStore } from '../../store/cartStore.js';
import { useRouter } from 'vue-router';
const cartStore = useCartStore();
const router = useRouter();

const goToCheckout = () => {
  cartStore.toggleSidebar();
  router.push('/checkout');
};
</script>

<template>
  <div v-show="cartStore.isSidebarOpen" class="fixed inset-0 z-[100] flex justify-end">
    <!-- Brutalist Backdrop Fade -->
    <div @click="cartStore.toggleSidebar" class="absolute inset-0 bg-[#000000cc] backdrop-blur-sm cursor-pointer transition-opacity duration-500"></div>

    <!-- Sliding Sidebar -->
    <aside class="relative w-full md:w-[400px] h-full bg-[#050505] border-l-4 border-white/10 flex flex-col transform shadow-2xl">
      
      <!-- Headers -->
      <div class="px-8 py-8 border-b border-white/20 flex justify-between items-center">
        <h2 class="text-3xl font-black uppercase tracking-tighter text-white m-0">LOADOUT</h2>
        <button @click="cartStore.toggleSidebar" class="text-[10px] font-bold text-[#888] hover:text-white uppercase tracking-[0.3em] transition-colors">[ CLOSE MENU ]</button>
      </div>

      <!-- Items List -->
      <div class="flex-1 overflow-y-auto px-8 py-8 space-y-8 scrollbar-hide">
        <div v-if="cartStore.items.length === 0" class="text-center text-[#555] text-xs font-bold uppercase tracking-[0.2em] mt-12 border border-[#333] p-8">
          NO ITEMS ACQUIRED
        </div>

        <div v-for="item in cartStore.items" :key="item.id" class="flex gap-6 items-center">
          
          <!-- Item Image -->
          <div class="w-20 h-[120px] shrink-0 bg-[#0f0f0f] border border-white/10 overflow-hidden relative">
            <img :src="item.img" :alt="item.title" class="w-full h-full object-cover grayscale">
          </div>
          
          <!-- Item Meta -->
          <div class="flex-1 flex flex-col w-full h-full justify-center">
            <h3 class="font-bold text-[10px] uppercase tracking-widest text-[#eee] leading-tight mb-2">{{ item.title }}</h3>
            <span class="text-[10px] uppercase text-[#888] tracking-[0.1em] mb-4">${{ item.price }}</span>
            
            <div class="flex items-center gap-1 border border-white/20 w-min">
              <button @click="cartStore.updateQuantity(item.id, -1)" class="px-2 py-1 text-[#888] hover:bg-white hover:text-black transition-colors text-xs font-bold">-</button>
              <span class="text-[#eee] text-[10px] font-bold px-2">{{ item.quantity }}</span>
              <button @click="cartStore.updateQuantity(item.id, 1)" class="px-2 py-1 text-[#888] hover:bg-white hover:text-black transition-colors text-xs font-bold">+</button>
            </div>
          </div>
          
          <button @click="cartStore.removeItem(item.id)" class="text-[#555] hover:text-white font-[900] text-sm p-2 shrink-0 transition-colors">X</button>
        </div>
      </div>

      <!-- Footer Checkout -->
      <div class="p-8 border-t border-white/20 bg-black">
        <div class="flex justify-between items-end mb-8">
          <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888]">FINAL SUM</span>
          <span class="text-3xl font-black tracking-tighter text-white">${{ cartStore.cartTotal }}</span>
        </div>
        <button @click="goToCheckout" :disabled="cartStore.items.length === 0" class="w-full py-5 bg-[#e2e8f0] text-black text-xs font-black uppercase tracking-[0.3em] hover:bg-white transition-colors duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:-translate-y-1 disabled:opacity-30 disabled:cursor-not-allowed">
          [ CHECKOUT DATA ]
        </button>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.fixed { position: fixed; }
.inset-0 { top: 0px; right: 0px; bottom: 0px; left: 0px; }
.z-\[100\] { z-index: 100; }
.flex { display: flex; }
.justify-end { justify-content: flex-end; }
.absolute { position: absolute; }
.bg-\[\#000000cc\] { background-color: rgba(0, 0, 0, 0.8); }
.backdrop-blur-sm { backdrop-filter: blur(4px); }
.cursor-pointer { cursor: pointer; }
.transition-opacity { transition-property: opacity; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
.duration-500 { transition-duration: 500ms; }
.relative { position: relative; }
.w-full { width: 100%; }
.h-full { height: 100%; }
.bg-\[\#050505\] { background-color: #050505; }
.border-l-4 { border-left-width: 4px; }
.border-white\/10 { border-color: rgba(255, 255, 255, 0.1); }
.flex-col { flex-direction: column; }
.transform { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.shadow-2xl { --tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow); }
.px-8 { padding-left: 2rem; padding-right: 2rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }
.border-b { border-bottom-width: 1px; }
.border-white\/20 { border-color: rgba(255, 255, 255, 0.2); }
.justify-between { justify-content: space-between; }
.items-center { align-items: center; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.font-black { font-weight: 900; }
.uppercase { text-transform: uppercase; }
.tracking-tighter { letter-spacing: -0.05em; }
.text-white { color: rgba(255, 255, 255, 1); }
.m-0 { margin: 0px; }
.text-\[10px\] { font-size: 10px; }
.font-bold { font-weight: 700; }
.text-\[\#888\] { color: #888888; }
.tracking-\[0\.3em\] { letter-spacing: 0.3em; }
.transition-colors { transition-property: background-color, border-color, color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); duration: 300ms; }
.hover\:text-white:hover { color: rgba(255, 255, 255, 1); }
.flex-1 { flex: 1 1 0%; }
.overflow-y-auto { overflow-y: auto; }
.space-y-8 > :not([hidden]) ~ :not([hidden]) { --tw-space-y-reverse: 0; margin-top: calc(2rem * calc(1 - var(--tw-space-y-reverse))); margin-bottom: calc(2rem * var(--tw-space-y-reverse)); }
.text-center { text-align: center; }
.text-\[\#555\] { color: #555555; }
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.tracking-\[0\.2em\] { letter-spacing: 0.2em; }
.mt-12 { margin-top: 3rem; }
.border { border-width: 1px; }
.border-\[\#333\] { border-color: #333333; }
.p-8 { padding: 2rem; }
.gap-6 { gap: 1.5rem; }
.w-20 { width: 5rem; }
.h-\[120px\] { height: 120px; }
.shrink-0 { flex-shrink: 0; }
.bg-\[\#0f0f0f\] { background-color: #0f0f0f; }
.overflow-hidden { overflow: hidden; }
.object-cover { object-fit: cover; }
.grayscale { filter: grayscale(100%); }
.justify-center { justify-content: center; }
.tracking-widest { letter-spacing: 0.1em; }
.text-\[\#eee\] { color: #eeeeee; }
.leading-tight { line-height: 1.25; }
.mb-2 { margin-bottom: 0.5rem; }
.tracking-\[0\.1em\] { letter-spacing: 0.1em; }
.mb-4 { margin-bottom: 1rem; }
.gap-1 { gap: 0.25rem; }
.w-min { width: min-content; }
.px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
.hover\:bg-white:hover { background-color: rgba(255, 255, 255, 1); }
.hover\:text-black:hover { color: rgba(0, 0, 0, 1); }
.font-\[900\] { font-weight: 900; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.p-2 { padding: 0.5rem; }
.border-t { border-top-width: 1px; }
.bg-black { background-color: rgba(0, 0, 0, 1); }
.items-end { align-items: flex-end; }
.mb-8 { margin-bottom: 2rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.py-5 { padding-top: 1.25rem; padding-bottom: 1.25rem; }
.bg-\[\#e2e8f0\] { background-color: #e2e8f0; }
.text-black { color: rgba(0, 0, 0, 1); }
.duration-300 { transition-duration: 300ms; }
.shadow-\[0_0_30px_rgba\(255\,255\,255\,0\.1\)\] { --tw-shadow: 0 0 30px rgba(255,255,255,0.1); box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow); }
.hover\:shadow-\[0_0_50px_rgba\(255\,255\,255\,0\.3\)\]:hover { --tw-shadow: 0 0 50px rgba(255,255,255,0.3); box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow); }
.hover\:-translate-y-1:hover { --tw-translate-y: -0.25rem; }

@media (min-width: 768px) {
  .md\:w-\[400px\] { width: 400px; }
}
</style>
