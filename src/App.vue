<script setup>
import { onMounted } from 'vue';
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/Footer.vue'
import CartSidebar from './components/cart/CartSidebar.vue'
import { initAuthListener } from './services/authService.js'

onMounted(() => {
  initAuthListener();
});
</script>

<template>
  <div class="noise-overlay"></div>
  <NavBar />
  <CartSidebar />
  <router-view />
  <SiteFooter />
</template>
