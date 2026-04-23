<script setup>
import { ref, onMounted, watch } from 'vue';
import { useCartStore } from '../store/cartStore.js';
import { gsap } from 'gsap';

const cartStore = useCartStore();
const isMenuOpen = ref(false);
const menuRef = ref(null);
const overlayRef = ref(null);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

watch(isMenuOpen, (isOpen) => {
  if (isOpen) {
    // Open Animation: Slower, more atmospheric
    gsap.to(overlayRef.value, { opacity: 1, duration: 0.6, pointerEvents: 'auto', ease: 'power2.out' });
    gsap.to(menuRef.value, { x: 0, duration: 0.7, ease: 'expo.out' });
    document.body.style.overflow = 'hidden';
  } else {
    // Close Animation
    gsap.to(overlayRef.value, { opacity: 0, duration: 0.4, pointerEvents: 'none', ease: 'power2.in' });
    gsap.to(menuRef.value, { x: '100%', duration: 0.4, ease: 'power2.in' });
    document.body.style.overflow = '';
  }
});

onMounted(() => {
  // Set initial state for menu
  gsap.set(menuRef.value, { x: '100%' });
  gsap.set(overlayRef.value, { opacity: 0, pointerEvents: 'none' });
});
</script>

<template>
  <nav class="nav">
    <div class="nav-brand">
      <router-link style="font-size: 25px;" to="/">OBSIDIAN</router-link>
    </div>
    
    <!-- Desktop Links -->
    <div class="nav-links desktop-only">
      <router-link  to="/">DEPOT</router-link>
      <router-link to="/collection">ARSENAL</router-link>
      <button @click="cartStore.toggleSidebar" class="cart-btn uppercase font-bold text-xs bg-transparent border-none text-[inherit] cursor-pointer hover:opacity-50 transition-opacity flex items-center gap-2 tracking-[0.2em]">
        LOADOUT <span class="bg-white text-black px-1.5 py-0.5 text-[10px] leading-tight font-black">{{ cartStore.totalItems }}</span>
      </button>
    </div>

    <!-- Mobile Toggle -->
    <div class="mobile-only flex items-center gap-6">
      <button @click="cartStore.toggleSidebar" class="cart-btn uppercase font-bold text-xs bg-transparent border-none text-[inherit] cursor-pointer hover:opacity-50 transition-opacity flex items-center gap-2 tracking-[0.2em]">
         <span class="bg-white text-black px-1.5 py-0.5 text-[10px] leading-tight font-black">{{ cartStore.totalItems }}</span>
      </button>
      <button @click="toggleMenu" class="menu-toggle" :class="{ 'is-active': isMenuOpen }">
        <span class="line"></span>
        <span class="line"></span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div ref="overlayRef" class="menu-overlay" @click="toggleMenu"></div>
    
    <!-- Mobile Menu Side Rail -->
    <div ref="menuRef" class="mobile-menu">
      <div class="mobile-menu-header">
        <span class="text-[10px] tracking-[0.5em] text-[#555] uppercase font-bold">NAVIGATION SYSTEM</span>
        <button @click="toggleMenu" class="close-btn">CLOSE</button>
      </div>
      <div class="mobile-menu-links">
        <router-link to="/" @click="toggleMenu" class="mobile-link">
          <span class="link-num">01</span> DEPOT
        </router-link>
        <router-link to="/collection" @click="toggleMenu" class="mobile-link">
          <span class="link-num">02</span> ARSENAL
        </router-link>
        <div class="mobile-link" @click="() => { toggleMenu(); cartStore.toggleSidebar(); }">
          <span class="link-num">03</span> LOADOUT
        </div>
      </div>
      <div class="mobile-menu-footer">
        <p class="text-[8px] tracking-widest text-[#444] uppercase mb-4">TACTICAL GEAR & DEFENSE SYSTEMS</p>
        <p class="text-[8px] tracking-widest text-[#444] uppercase">V.2.0.6 // SECURE CONNECTION</p>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.cart-btn { font-family: inherit; }
.leading-tight { line-height: 1.25; }
.font-black { font-weight: 900; }
.px-1\.5 { padding-left: 0.375rem; padding-right: 0.375rem; }
.py-0\.5 { padding-top: 0.125rem; padding-bottom: 0.125rem; }
.bg-white { background-color: #ffffff; }
.text-black { color: #000000; }
.flex { display: flex; }
.items-center { align-items: center; }
.gap-2 { gap: 0.5rem; }
.gap-6 { gap: 1.5rem; }
.cursor-pointer { cursor: pointer; }
.bg-transparent { background-color: transparent; }
.border-none { border: none; }
.text-\[inherit\] { color: inherit; }
.text-xs { font-size: 0.75rem; }
.text-\[10px\] { font-size: 10px; }
.font-bold { font-weight: 700; }
.uppercase { text-transform: uppercase; }
.tracking-\[0\.2em\] { letter-spacing: 0.2em; }
.hover\:opacity-50:hover { opacity: 0.5; }
.transition-opacity { transition-property: opacity; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 300ms; }

/* Desktop vs Mobile logic */
.desktop-only { display: flex; }
.mobile-only { display: none; }

/* Hamburger Menu Toggle */
.menu-toggle {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 30px;
  padding: 0;
  z-index: 1001;
}
.menu-toggle .line {
  width: 100%;
  height: 2px;
  background-color: white;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.menu-toggle.is-active .line:nth-child(1) { transform: translateY(4px) rotate(45deg); }
.menu-toggle.is-active .line:nth-child(2) { transform: translateY(-4px) rotate(-45deg); }

/* Mobile Menu Styles */
.menu-overlay {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100dvh;
  background: rgba(0,0,0,0.98);
  backdrop-filter: blur(40px) saturate(150%);
  -webkit-backdrop-filter: blur(40px) saturate(150%);
  z-index: 1000;
}
.mobile-menu {
  position: fixed;
  top: 0; right: 0; height: 100dvh;
  width: 85%; max-width: 450px;
  background: #000000;
  border-left: 1px solid rgba(255,255,255,0.05);
  padding: 4rem 2.5rem;
  display: flex;
  flex-direction: column;
  z-index: 1001;
  box-shadow: -50px 0 100px rgba(0,0,0,0.9);
}
.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
}
.close-btn {
  background: none;
  border: none;
  color: #555;
  font-size: 10px;
  letter-spacing: 0.2em;
  font-weight: 900;
  cursor: pointer;
}
.mobile-menu-links {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-grow: 1;
}
.mobile-link {
  font-family: 'Anton', sans-serif;
  font-size: 3rem;
  color: white;
  text-decoration: none;
  line-height: 1;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}
.link-num {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  color: #555;
  font-weight: 900;
  margin-top: 0.5rem;
}
.mobile-menu-footer {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 2rem;
}

@media (max-width: 768px) {
  .desktop-only { display: none; }
  .mobile-only { display: flex; }
  
  /* Add a dark blur background to the main nav on mobile for readability */
  .nav {
    background: rgba(14, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 1.5rem 2rem;
    mix-blend-mode: normal; /* Disable exclusion on mobile to allow the dark background to work */
  }
}
</style>
