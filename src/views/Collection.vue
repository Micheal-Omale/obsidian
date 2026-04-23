<script setup>
import { onMounted } from 'vue';
import { initLenis } from '../js/lenis.js';
import { initAnimations } from '../js/animations.js';
import { initMagnetic } from '../js/magnetic.js';

import ProductList from '../components/product/ProductList.vue';
import SidebarFilter from '../components/common/SidebarFilter.vue';
import SubscribeBlock from '../components/common/SubscribeBlock.vue';
import InstaFeed from '../components/common/InstaFeed.vue';

onMounted(() => {
  initLenis();
  initAnimations();
  initMagnetic();
});
</script>

<template>
  <main class="main-container" style="padding-top: 20vh; min-height: 100vh; overflow: hidden;">
    
    <!-- Shop Header Adaptation -->
    <section class="section relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12">
      <!-- Massive Hero Header -->
      <div class="header-split w-full flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/20 pb-8 mb-16">
        <h1 class="distort-text m-0 tracking-tighter" style="font-size: 6vw; line-height: 0.85;">ARSENAL<br>INDEX</h1>
        
        <!-- Breadcrumbs styling -->
        <div class="text-[10px] font-bold tracking-[0.4em] uppercase text-[#888] text-left md:text-right mt-8 md:mt-0 select-none">
          [ DEPLOYMENT 1 - 17 OF 55 ]<br>
          <span class="text-white mt-2 block hover:underline cursor-pointer transition-all duration-300">SORT LOGIC : DEFAULT</span>
        </div>
      </div>

      <!-- Main Brutalist Store Layout -->
      <div class="store-layout w-full flex flex-col md:flex-row gap-12 lg:gap-24 relative mb-24">
        
        <!-- Pillar Sidebar component -->
        <SidebarFilter />
        
        <!-- Products Grid component -->
        <div class="w-full flex-1">
          <ProductList />
        </div>

      </div>
    </section>

    <!-- Appended Blocks mapped from MiniStore image -->
    <SubscribeBlock />
    <InstaFeed />

  </main>
</template>

<style scoped>
.mb-16 { margin-bottom: 4rem; }
.mb-24 { margin-bottom: 6rem; }
.pb-8 { padding-bottom: 2rem; }
.border-b { border-bottom-width: 1px; }
.border-white\/20 { border-color: rgba(255, 255, 255, 0.2); }
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-start { align-items: flex-start; }
.justify-between { justify-content: space-between; }
.w-full { width: 100%; }
.m-0 { margin: 0; }
.tracking-tighter { letter-spacing: -0.05em; }
.text-\[10px\] { font-size: 10px; }
.font-bold { font-weight: 700; }
.tracking-\[0\.4em\] { letter-spacing: 0.4em; }
.uppercase { text-transform: uppercase; }
.text-\[\#888\] { color: #888888; }
.text-left { text-align: left; }
.text-white { color: #ffffff; }
.mt-8 { margin-top: 2rem; }
.mt-2 { margin-top: 0.5rem; }
.block { display: block; }
.cursor-pointer { cursor: pointer; }
.hover\:underline:hover { text-decoration: underline; }
.transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
.duration-300 { transition-duration: 300ms; }
.gap-12 { gap: 3rem; }
.relative { position: relative; }
.flex-1 { flex: 1 1 0%; }
.max-w-\[1800px\] { max-width: 1800px; }
.mx-auto { margin-left: auto; margin-right: auto; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.select-none { user-select: none; }

@media (min-width: 768px) {
  .md\:flex-row { flex-direction: row; }
  .md\:items-end { align-items: flex-end; }
  .md\:text-right { text-align: right; }
  .md\:mt-0 { margin-top: 0; }
  .md\:px-12 { padding-left: 3rem; padding-right: 3rem; }
}

@media (min-width: 1024px) {
  .lg\:gap-24 { gap: 6rem; }
}
</style>
