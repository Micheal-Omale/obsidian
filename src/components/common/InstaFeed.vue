<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scroller = ref(null);
const section = ref(null);
let mm = gsap.matchMedia();

onMounted(() => {
  mm.add("(min-width: 768px)", () => {
    // Desktop/Tablet: Horizontal Rail Animation
    const scrollWidth = scroller.value.scrollWidth;
    const viewportWidth = window.innerWidth;
    
    gsap.to(scroller.value, {
      x: () => -(scrollWidth - viewportWidth + 64), // 64 is for padding
      ease: "none",
      scrollTrigger: {
        trigger: section.value,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });
  });

  // Mobile is handled by CSS snap-scroll for best native performance
});

onUnmounted(() => {
  mm.revert();
});
</script>

<template>
  <div ref="section" class="insta-block w-full py-24 border-t border-b border-white/20 overflow-hidden bg-[#050505]">
    
    <!-- Title Block -->
    <div class="text-center mb-16 px-4">
      <h2 class="text-3xl md:text-5xl font-black uppercase tracking-widest text-white m-0">THE FEED</h2>
      <p class="mt-4 text-[#555] text-[10px] tracking-[0.5em] uppercase font-bold">FIELD OPERATIONS / UNFILTERED INTEL</p>
    </div>
    
    <!-- Horizontal Scroller -->
    <div ref="scroller" class="flex gap-4 px-8 overflow-x-auto md:overflow-visible pb-8 snap-x md:snap-none scrollbar-hide will-change-transform">
      <div v-for="(img, index) in [
        'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1584281722912-b8b3e6bdc8e7?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop'
      ]" :key="index" class="flex-shrink-0">
        <img :src="img" class="w-64 h-64 md:w-80 md:h-80 object-cover snap-center grayscale hover:grayscale-0 transition-all duration-[800ms] cursor-pointer border border-white/5 hover:border-white/20" />
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Hidden scrollbars for clean brutalist feed effect */
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

.insta-block {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.will-change-transform {
  will-change: transform;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

@media (max-width: 767px) {
  .insta-block {
    min-height: auto;
    padding-bottom: 8rem;
  }
}

/* Base styles ported for component self-sufficiency */
.w-full { width: 100%; }
.py-24 { padding-top: 6rem; padding-bottom: 6rem; }
.border-t { border-top-width: 1px; }
.border-b { border-bottom-width: 1px; }
.border-white\/20 { border-color: rgba(255, 255, 255, 0.2); }
.overflow-hidden { overflow: hidden; }
.bg-\[\#050505\] { background-color: #050505; }
.text-center { text-align: center; }
.mb-16 { margin-bottom: 4rem; }
.mt-4 { margin-top: 1rem; }
.m-0 { margin: 0; }
.text-white { color: #ffffff; }
.text-\[\#555\] { color: #555555; }
.font-black { font-weight: 900; }
.font-bold { font-weight: 700; }
.uppercase { text-transform: uppercase; }
.tracking-widest { letter-spacing: 0.1em; }
.tracking-\[0\.5em\] { letter-spacing: 0.5em; }
.flex { display: flex; }
.gap-4 { gap: 1rem; }
.px-8 { padding-left: 2rem; padding-right: 2rem; }
.overflow-x-auto { overflow-x: auto; }
.pb-8 { padding-bottom: 2rem; }
.snap-x { scroll-snap-type: x mandatory; }
.object-cover { object-fit: cover; }
.snap-center { scroll-snap-align: center; }
.grayscale { filter: grayscale(100%); }
.transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
.duration-\[800ms\] { transition-duration: 800ms; }
.cursor-pointer { cursor: pointer; }
.hover\:grayscale-0:hover { filter: grayscale(0%); }

@media (min-width: 768px) {
  .md\:w-80 { width: 20rem; }
  .md\:h-80 { height: 20rem; }
  .md\:text-5xl { font-size: 3rem; }
  .md\:overflow-visible { overflow: visible; }
  .md\:snap-none { scroll-snap-type: none; }
}

.text-3xl { font-size: 1.875rem; }
.text-\[10px\] { font-size: 10px; }
.border { border-width: 1px; }
.border-white\/5 { border-color: rgba(255, 255, 255, 0.05); }
</style>
