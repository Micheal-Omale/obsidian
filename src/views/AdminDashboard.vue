<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../store/userStore.js';
import { loginAdmin, logoutAdmin } from '../services/authService.js';
import { useProductStore } from '../store/productStore.js';
import { uploadImagePayload } from '../services/productService.js';
import { getOrders } from '../services/orderService.js';
import { useRouter } from 'vue-router';

const orders = ref([]);
const ordersLoading = ref(false);
const activeTab = ref('inventory');

const fetchOrders = async () => {
  ordersLoading.value = true;
  orders.value = await getOrders();
  ordersLoading.value = false;
};

const userStore = useUserStore();
const productStore = useProductStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const errorMsg = ref('');
const isLoading = ref(false);

const newProduct = ref({
  title: '',
  description: '',
  price: '' // Allows admin to input cost cleanly
});

const uploadFile = ref(null);
const previewSrc = ref('');
const isPumping = ref(false);

onMounted(async () => {
  if (userStore.isAdminAuth) {
    if (productStore.items.length === 0) await productStore.fetchAllProducts();
    await fetchOrders();
  }
});

const handleFile = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  uploadFile.value = file;
  
  // Brutalist raw image ingestion preview targeting
  const reader = new FileReader();
  reader.onload = (event) => {
    previewSrc.value = event.target.result;
  };
  reader.readAsDataURL(file);
};

const handleLogin = async () => {
  if (!email.value || !password.value) return;
  isLoading.value = true;
  errorMsg.value = '';
  
  const res = await loginAdmin(email.value, password.value);
  if (!res.success) {
    errorMsg.value = "PROTOCOL REJECTED: INVALID CREDENTIALS.";
  } else {
    await productStore.fetchAllProducts();
    await fetchOrders();
  }
  isLoading.value = false;
};

const handleLogout = async () => {
  await logoutAdmin();
  router.push('/');
};

const injectProduct = async () => {
  if (!newProduct.value.title || !newProduct.value.price || !uploadFile.value) {
    alert("CRITICAL ERROR: MISSING PAYLOAD PARAMETERS - MUST INCLUDE TARGET IMAGE.");
    return;
  }
  
  isPumping.value = true;
  
  // Eject Image up to Firebase Storage first securely
  const storageRes = await uploadImagePayload(uploadFile.value);
  console.log('STORAGE UPLOAD RESULT:', storageRes);
  if (!storageRes.success) {
    errorMsg.value = "STORAGE REJECTION: " + storageRes.error;
    console.error('STORAGE UPLOAD FAILED:', storageRes.error);
    isPumping.value = false;
    return;
  }
  
  const createRes = await productStore.createProduct({
    title: newProduct.value.title,
    description: newProduct.value.description,
    img: storageRes.url,
    price: Number(newProduct.value.price)
  });
  console.log('PRODUCT CREATE RESULT:', createRes);
  
  // Wipe parameters back raw and empty immediately
  newProduct.value = { title: '', description: '', price: '' };
  uploadFile.value = null;
  previewSrc.value = '';
  isPumping.value = false;
};

const annihilateProduct = async (id) => {
  if (confirm("VIOLENTLY ERASE PRODUCT FROM DATABASE PERMANENTLY?")) {
    await productStore.removeProduct(id);
  }
};
</script>

<template>
  <main class="main-container min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center px-6 relative z-10" style="padding-top: 15vh; padding-bottom: 20vh;">
    
    <!-- Admin Brutalist Login Gate -->
    <div v-if="!userStore.isAdminAuth" class="w-full max-w-lg border border-white/20 p-8 shadow-login bg-black">
      <div class="mb-12 border-b-4 border-white pb-4">
        <h1 class="text-4xl md:text-5xl font-black uppercase tracking-tighter m-0 leading-none">COMMAND<br>CENTER</h1>
        <p class="mt-4 text-[#888] text-[10px] tracking-[0.4em] font-bold uppercase">Restricted Access // Admin Authentication</p>
      </div>

      <div v-if="errorMsg" class="mb-6 border border-red-500 text-red-500 font-bold uppercase text-[10px] tracking-widest p-4 bg-red-900/20">
        {{ errorMsg }}
      </div>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-8">
        <input v-model="email" type="email" placeholder="ADMIN IDENTIFIER" required class="input-brutal w-full bg-transparent border-b border-white/30 text-white outline-none font-bold text-sm tracking-widest uppercase py-4" />
        <input v-model="password" type="password" placeholder="PASSPHRASE" required class="input-brutal w-full bg-transparent border-b border-white/30 text-white outline-none font-bold text-sm tracking-widest py-4" />
        <button type="submit" :disabled="isLoading" class="mt-8 bg-white text-black py-5 font-black text-xs uppercase tracking-[0.3em] hover:bg-neutral-800 hover:text-white transition-all duration-300 disabled:opacity-50 border border-white">
          {{ isLoading ? 'VERIFYING...' : '[ INITIATE UPLINK ]' }}
        </button>
      </form>
    </div>

    <!-- Active Admin Product Management Vault -->
    <div v-else class="w-full max-w-[1400px] flex flex-col pt-12">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-white pb-8">
        <div>
          <h1 class="text-5xl md:text-7xl font-black uppercase tracking-tighter m-0 leading-none">COMMAND<br>CENTER</h1>
          <p class="mt-4 text-[#888] text-[10px] tracking-[0.4em] font-bold uppercase">Direct Access to Live Cloud State</p>
        </div>
        <button @click="handleLogout" class="mt-8 md:mt-0 text-[10px] tracking-[0.3em] font-bold uppercase border border-white/20 hover:bg-white hover:text-black transition-colors duration-300 px-6 py-3">
          [ TERMINATE SESSION ]
        </button>
      </div>

      <!-- Tab Navigation -->
      <div class="tab-nav">
        <button @click="activeTab = 'inventory'" :class="['tab-btn', activeTab === 'inventory' ? 'tab-active' : '']">
          [ INVENTORY ]
        </button>
        <button @click="activeTab = 'orders'; fetchOrders()" :class="['tab-btn', activeTab === 'orders' ? 'tab-active' : '']">
          [ ORDERS ] <span class="order-count">{{ orders.length }}</span>
        </button>
      </div>

      <!-- ERROR DISPLAY FOR AUTHENTICATED ADMIN -->
      <div v-if="errorMsg" class="mb-8 border border-red-500 text-red-500 font-bold uppercase text-[10px] tracking-widest p-4 bg-red-900/20 w-full max-w-[1400px]">
        {{ errorMsg }}
      </div>

      <div v-show="activeTab === 'inventory'" class="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full">
        <!-- Structural Input Panel -->
        <div class="col-span-1 border border-white/20 p-8 h-fit bg-[#0a0a0a]">
          <h3 class="font-black text-lg tracking-[0.2em] mb-8 border-b-2 border-white pb-4 uppercase">[ INJECT ITEM ]</h3>
          
          <form @submit.prevent="injectProduct" class="flex flex-col gap-6">
            <div>
              <label class="text-[10px] text-[#888] tracking-widest font-bold uppercase mb-2 block">Item Title</label>
              <input v-model="newProduct.title" required class="input-brutal w-full bg-transparent border-b border-white/30 text-white outline-none font-bold text-xs uppercase py-3" />
            </div>
            <div>
              <label class="text-[10px] text-[#888] tracking-widest font-bold uppercase mb-2 block">Materials / Description</label>
              <input v-model="newProduct.description" required class="input-brutal w-full bg-transparent border-b border-white/30 text-white outline-none font-bold text-xs uppercase py-3" />
            </div>
            <div>
              <label class="text-[10px] text-[#888] tracking-widest font-bold uppercase mb-2 block">Target Transmission Base (Image)</label>
              <input type="file" accept="image/*" @change="handleFile" required class="input-brutal w-full bg-transparent border-b border-white/30 text-white outline-none font-bold text-xs uppercase py-3 file:mr-4 file:py-2 file:px-4 file:bg-white file:text-black file:cursor-pointer file:font-black file:uppercase file:text-[10px] file:border-none file:tracking-widest cursor-pointer" />
            </div>

            <!-- Monochrome Image Pipeline Previewer Window -->
            <div v-if="previewSrc" class="relative w-full aspect-square max-h-48 mt-4 border border-white/10 bg-black overflow-hidden object-cover grayscale opacity-80 z-0">
               <img :src="previewSrc" class="w-full h-full object-cover">
               <span class="absolute inset-0 flex justify-center items-center font-black text-white text-[10px] uppercase tracking-[0.4em] bg-black/60 pointer-events-none">[ TARGET SECURED ]</span>
            </div>

            <div>
              <label class="text-[10px] text-[#888] tracking-widest font-bold uppercase mb-2 block mt-2">Numeric Value (USD)</label>
              <input type="number" v-model="newProduct.price" required class="input-brutal w-full bg-transparent border-b border-white/30 text-white outline-none font-bold text-xs uppercase py-3" />
            </div>
            <button type="submit" :disabled="isPumping" class="w-full mt-6 bg-[#e2e8f0] text-black py-4 text-[10px] font-black tracking-[0.3em] uppercase transition-colors hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-50">
              {{ isPumping ? 'UPLOADING TO SERVER...' : '[ SUBMIT PAYLOAD ]' }}
            </button>
          </form>
        </div>

        <!-- Inventory List / Array Viewer -->
        <div class="col-span-1 lg:col-span-2">
          <h3 class="font-black text-lg tracking-[0.2em] mb-8 uppercase border-b-2 border-white/20 pb-4">
            [ THE VAULT ] <span class="text-[#555] ml-4 text-[10px] font-bold uppercase">{{ productStore.items.length }} LOADOUTS SCANNED</span>
          </h3>
          
          <div v-if="productStore.isLoading" class="text-center py-20 text-[#555] font-black uppercase tracking-widest text-[10px]">
            FUSING CONNECTION...
          </div>
          <div v-else-if="productStore.items.length === 0" class="border border-white/10 p-12 text-center text-[#555] font-bold tracking-[0.2em] text-xs uppercase bg-[#0a0a0a]">
            VAULT IS EMPTY.<br><br>INJECT A NEW ITEM LOCALLY TO POPULATE THE CLOUD.
          </div>
          <div v-else class="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
            <div v-for="item in productStore.items" :key="item.id" class="flex gap-6 items-center bg-[#0a0a0a] border border-white/10 p-4 hover:border-white/30 transition-colors">
              <div class="w-20 h-24 shrink-0 bg-black overflow-hidden relative">
                <img :src="item.img" class="w-full h-full object-cover grayscale opacity-80" />
              </div>
              <div class="flex-1 overflow-hidden pr-4 flex flex-col justify-center h-full">
                <h4 class="font-bold text-sm uppercase tracking-widest text-white leading-tight truncate mb-2">{{ item.title }}</h4>
                <p class="text-[10px] text-[#666] tracking-[0.2em] uppercase truncate mb-3">{{ item.description }}</p>
                <div class="text-xs font-black tracking-widest text-[#aaa]">${{ item.price }}</div>
              </div>
              
              <!-- Violent Deletion Call to Action -->
              <button @click="annihilateProduct(item.id)" class="bg-[#220000] text-[#ff4444] border-none px-6 py-10 h-full hover:bg-[#ff0000] hover:text-white transition-colors text-xs font-black tracking-widest uppercase cursor-pointer">
                X
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ORDER SURVEILLANCE (shown when orders tab active) -->
      <div v-show="activeTab === 'orders'" class="w-full mt-12">
        <h3 class="font-black text-lg tracking-[0.2em] mb-8 uppercase border-b-2 border-white/20 pb-4">
          [ ORDER SURVEILLANCE ] <span class="text-[#555] ml-4 text-[10px] font-bold uppercase">{{ orders.length }} TRANSMISSIONS LOGGED</span>
        </h3>

        <div v-if="ordersLoading" class="text-center py-20 text-[#555] font-black uppercase tracking-widest text-[10px]">
          SCANNING CHANNELS...
        </div>
        <div v-else-if="orders.length === 0" class="border border-white/10 p-12 text-center text-[#555] font-bold tracking-[0.2em] text-xs uppercase bg-[#0a0a0a]">
          NO TRANSMISSIONS INTERCEPTED YET.
        </div>
        <div v-else class="order-list">
          <div v-for="order in orders" :key="order.id" class="order-card">
            <div class="order-header">
              <div>
                <span class="order-id">#{{ order.id }}</span>
                <span class="order-status" :class="order.status === 'pending' ? 'status-pending' : 'status-done'">{{ order.status }}</span>
              </div>
              <span class="order-total">${{ order.total }}</span>
            </div>
            <div class="order-body">
              <div class="order-guest">
                <div class="order-field"><span class="field-lbl">OPERATIVE</span> {{ order.name }}</div>
                <div class="order-field"><span class="field-lbl">CHANNEL</span> {{ order.email }}</div>
                <div class="order-field"><span class="field-lbl">COORDINATES</span> {{ order.address }}, {{ order.city }} {{ order.zip }}</div>
              </div>
              <div class="order-items">
                <div v-for="(item, i) in order.items" :key="i" class="order-item-row">
                  <span class="order-item-title">{{ item.title }}</span>
                  <span class="order-item-qty">x{{ item.quantity }}</span>
                  <span class="order-item-price">${{ item.price * item.quantity }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<style scoped>
/* Inherited brutal styling map */
.min-h-screen { min-height: 100vh; }
.bg-\[\#050505\] { background-color: #050505; }
.bg-\[\#0a0a0a\] { background-color: #0a0a0a; }
.text-white { color: #ffffff; }
.flex { display: flex; }
.flex-col { flex-direction: column; }
.justify-center { justify-content: center; }
.items-center { align-items: center; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.relative { position: relative; }
.z-10 { z-index: 10; }
.w-full { width: 100%; }
.max-w-lg { max-width: 32rem; }
.border { border-width: 1px; }
.border-white\/20 { border-color: rgba(255,255,255,0.2); }
.p-8 { padding: 2rem; }
.bg-black { background-color: #000; }
.shadow-login { box-shadow: 0 0 50px rgba(255,255,255,0.05); }
.mb-12 { margin-bottom: 3rem; }
.border-b-4 { border-bottom-width: 4px; }
.border-white { border-color: #ffffff; }
.pb-4 { padding-bottom: 1rem; }
.text-4xl { font-size: 2.25rem; }
.font-black { font-weight: 900; }
.uppercase { text-transform: uppercase; }
.tracking-tighter { letter-spacing: -0.05em; }
.m-0 { margin: 0; }
.leading-none { line-height: 1; }
.mt-4 { margin-top: 1rem; }
.text-\[\#888\] { color: #888888; }
.text-\[10px\] { font-size: 10px; }
.tracking-\[0\.4em\] { letter-spacing: 0.4em; }
.font-bold { font-weight: 700; }
.gap-8 { gap: 2rem; }
.bg-transparent { background-color: transparent; }
.border-b { border-bottom-width: 1px; }
.border-b-2 { border-bottom-width: 2px; }
.border-white\/30 { border-color: rgba(255,255,255,0.3); }
.outline-none { outline: 2px solid transparent; outline-offset: 2px; }
.text-sm { font-size: 0.875rem; }
.tracking-widest { letter-spacing: 0.1em; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.mt-8 { margin-top: 2rem; }
.text-black { color: #000000; }
.bg-white { background-color: #ffffff; }
.py-5 { padding-top: 1.25rem; padding-bottom: 1.25rem; }
.text-xs { font-size: 0.75rem; }
.tracking-\[0\.3em\] { letter-spacing: 0.3em; }
.transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4,0,0.2,1); }
.duration-300 { transition-duration: 300ms; }
.hover\:bg-neutral-800:hover { background-color: #262626; }
.hover\:text-white:hover { color: #ffffff; }
.p-12 { padding: 3rem; }
.text-center { text-align: center; }
.text-\[\#555\] { color: #555555; }
.tracking-\[0\.2em\] { letter-spacing: 0.2em; }
.max-w-\[1400px\] { max-width: 1400px; }
.justify-between { justify-content: space-between; }
.border-white\/10 { border-color: rgba(255,255,255,0.1); }
.mb-16 { margin-bottom: 4rem; }
.pb-8 { padding-bottom: 2rem; }
.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.bg-red-900\/20 { background-color: rgba(127, 29, 29, 0.2); }
.border-red-500 { border-color: #ef4444; }
.text-red-500 { color: #ef4444; }
.mb-6 { margin-bottom: 1.5rem; }
.p-4 { padding: 1rem; }

/* Dashboard Grids */
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.gap-12 { gap: 3rem; }
.col-span-1 { grid-column: span 1 / span 1; }
.h-fit { height: fit-content; }
.block { display: block; }
.mt-6 { margin-top: 1.5rem; }
.w-20 { width: 5rem; }
.h-24 { height: 6rem; }
.shrink-0 { flex-shrink: 0; }
.relative { position: relative; }
.object-cover { object-fit: cover; }
.grayscale { filter: grayscale(100%); }
.opacity-80 { opacity: 0.8; }
.flex-1 { flex: 1 1 0%; }
.overflow-hidden { overflow: hidden; }
.pr-4 { padding-right: 1rem; }
.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.text-\[\#eee\] { color: #eeeeee; }
.mb-8 { margin-bottom: 2rem; }
.text-\[\#666\] { color: #666; }
.text-\[\#aaa\] { color: #aaa; }
.tracking-\[0\.1em\] { letter-spacing: 0.1em; }
.bg-\[\#220000\] { background-color: #220000; }
.text-\[\#ff4444\] { color: #ff4444; }
.border-none { border: none; }
.hover\:bg-\[\#ff0000\]:hover { background-color: #ff0000; }
.h-full { height: 100%; }
.cursor-pointer { cursor: pointer; }
.py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.space-y-4 > * + * { margin-top: 1rem; }
.hover\:border-white\/30:hover { border-color: rgba(255,255,255,0.3); }
.pt-12 { padding-top: 3rem; }
.max-h-\[700px\] { max-height: 700px; }
.overflow-y-auto { overflow-y: auto; }
.pr-2 { padding-right: 0.5rem; }
.bg-\[\#e2e8f0\] { background-color: #e2e8f0; }
.hover\:shadow-\[0_0_20px_rgba\(255\,255\,255\,0\.3\)\]:hover { box-shadow: 0 0 20px rgba(255,255,255,0.3); }

/* Minimalist vertical scrollbar overrides */
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ffffff; }

.input-brutal { border-radius: 0; border-top: none; border-left: none; border-right: none; }
.input-brutal::placeholder { color: rgba(255,255,255,0.3); }

@media (min-width: 768px) {
  .md\:text-5xl { font-size: 3rem; }
  .md\:text-7xl { font-size: 4.5rem; }
  .md\:flex-row { flex-direction: row; }
  .md\:items-end { align-items: flex-end; }
  .md\:mt-0 { margin-top: 0; }
}
@media (min-width: 1024px) {
  .lg\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .lg\:col-span-2 { grid-column: span 2 / span 2; }
}

button:disabled { opacity: 0.5; cursor: not-allowed; }
button:disabled:hover { background-color: white; color: black; }

/* ── TAB NAVIGATION ── */
.tab-nav {
  display: flex;
  gap: 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.tab-btn {
  padding: 1rem 2rem;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #555;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s;
}
.tab-btn:hover { color: #fff; }
.tab-active {
  color: #fff;
  border-bottom-color: #fff;
}
.order-count {
  margin-left: 0.5rem;
  font-size: 10px;
  color: #888;
}
.tab-active .order-count { color: #fff; }

/* ── ORDER CARDS ── */
.order-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 700px;
  overflow-y: auto;
  padding-right: 0.5rem;
}
.order-list::-webkit-scrollbar { width: 3px; }
.order-list::-webkit-scrollbar-thumb { background: #333; }

.order-card {
  border: 1px solid rgba(255,255,255,0.1);
  background: #0a0a0a;
  transition: border-color 0.3s;
}
.order-card:hover { border-color: rgba(255,255,255,0.25); }

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.order-id {
  font-size: 0.875rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  color: #fff;
  margin-right: 1rem;
}
.order-status {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 0.25rem 0.75rem;
  border: 1px solid;
}
.status-pending {
  color: #f59e0b;
  border-color: rgba(245,158,11,0.3);
  background: rgba(245,158,11,0.1);
}
.status-done {
  color: #22c55e;
  border-color: rgba(34,197,94,0.3);
  background: rgba(34,197,94,0.1);
}
.order-total {
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.order-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .order-body {
    flex-direction: row;
    gap: 3rem;
  }
}

.order-guest { flex: 1; }
.order-field {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ccc;
  margin-bottom: 0.5rem;
}
.field-lbl {
  font-size: 10px;
  color: #555;
  letter-spacing: 0.2em;
  margin-right: 0.75rem;
}

.order-items { flex: 1; }
.order-item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.order-item-title {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #aaa;
  flex: 1;
}
.order-item-qty {
  font-size: 10px;
  color: #666;
  letter-spacing: 0.1em;
  margin: 0 1rem;
}
.order-item-price {
  font-size: 0.75rem;
  font-weight: 900;
  color: #ccc;
}
</style>
