<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '../store/cartStore.js';
import { submitOrder } from '../services/orderService.js';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();

const guest = ref({
  name: '',
  email: '',
  address: '',
  city: '',
  zip: ''
});

const isTransmitting = ref(false);
const errorMsg = ref('');
const orderComplete = ref(false);
const orderId = ref(null);

const cartItems = computed(() => cartStore.items);
const cartTotal = computed(() => cartStore.cartTotal);

const executeOrder = async () => {
  if (!guest.value.name || !guest.value.email || !guest.value.address || !guest.value.city || !guest.value.zip) {
    errorMsg.value = "ALL PARAMETERS REQUIRED. FILL EVERY FIELD.";
    return;
  }
  if (cartItems.value.length === 0) {
    errorMsg.value = "LOADOUT IS EMPTY. ACQUIRE ITEMS FIRST.";
    return;
  }

  isTransmitting.value = true;
  errorMsg.value = '';

  const res = await submitOrder({
    name: guest.value.name,
    email: guest.value.email,
    address: guest.value.address,
    city: guest.value.city,
    zip: guest.value.zip,
    items: cartItems.value.map(item => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      img: item.img
    })),
    total: cartTotal.value,
    status: 'pending'
  });

  if (res.success) {
    orderId.value = res.id;
    cartStore.clearCart();
    orderComplete.value = true;
  } else {
    errorMsg.value = "TRANSMISSION FAILURE: " + res.error;
  }

  isTransmitting.value = false;
};

const returnToBase = () => {
  router.push('/');
};
</script>

<template>
  <main class="checkout-page">

    <!-- Success State -->
    <div v-if="orderComplete" class="success-state">
      <div class="success-inner">
        <div class="success-bar"></div>
        <h1 class="success-title">TRANSMISSION<br>RECEIVED</h1>
        <p class="success-sub">ORDER #{{ orderId }} HAS BEEN LOGGED INTO THE SYSTEM</p>
        <p class="success-detail">A confirmation has been dispatched to your provided coordinates. Prepare for delivery.</p>
        <button @click="returnToBase" class="return-btn">[ RETURN TO BASE ]</button>
      </div>
    </div>

    <!-- Checkout Form -->
    <div v-else class="checkout-layout">

      <!-- Page Header -->
      <div class="checkout-header">
        <div class="header-tag">GUEST PROTOCOL</div>
        <h1 class="header-title">TRANSMISSION<br>PROTOCOL</h1>
        <p class="header-sub">No account required. Your data is transmitted securely and purged after fulfillment.</p>
      </div>

      <!-- Error Display -->
      <div v-if="errorMsg" class="error-block">
        {{ errorMsg }}
      </div>

      <!-- Two Column Grid -->
      <div class="checkout-grid">

        <!-- LEFT: Guest Form -->
        <div class="form-column">
          <h3 class="section-label">[ IDENTIFICATION ]</h3>

          <form @submit.prevent="executeOrder" class="checkout-form">
            <div class="field-group">
              <label class="field-label">Operative Name</label>
              <input v-model="guest.name" required placeholder="FULL NAME" class="field-input" />
            </div>
            <div class="field-group">
              <label class="field-label">Communication Channel</label>
              <input v-model="guest.email" type="email" required placeholder="EMAIL ADDRESS" class="field-input" />
            </div>
            <div class="field-group">
              <label class="field-label">Drop Coordinates</label>
              <input v-model="guest.address" required placeholder="STREET ADDRESS" class="field-input" />
            </div>
            <div class="field-row">
              <div class="field-group flex-1">
                <label class="field-label">Sector</label>
                <input v-model="guest.city" required placeholder="CITY" class="field-input" />
              </div>
              <div class="field-group" style="width: 140px;">
                <label class="field-label">Zone ID</label>
                <input v-model="guest.zip" required placeholder="ZIP / POSTAL" class="field-input" />
              </div>
            </div>

            <!-- Execute Button (mobile: visible here) -->
            <button type="submit" :disabled="isTransmitting" class="execute-btn mobile-only">
              {{ isTransmitting ? 'TRANSMITTING...' : '[ EXECUTE ORDER ]' }}
            </button>
          </form>
        </div>

        <!-- RIGHT: Order Manifest -->
        <div class="manifest-column">
          <h3 class="section-label">[ ORDER MANIFEST ]</h3>

          <div v-if="cartItems.length === 0" class="empty-manifest">
            NO ITEMS IN LOADOUT
          </div>

          <div v-else class="manifest-list">
            <div v-for="item in cartItems" :key="item.id" class="manifest-item">
              <div class="manifest-img-wrap">
                <img :src="item.img" :alt="item.title" class="manifest-img" />
              </div>
              <div class="manifest-meta">
                <h4 class="manifest-title">{{ item.title }}</h4>
                <span class="manifest-qty">QTY: {{ item.quantity }}</span>
              </div>
              <span class="manifest-price">${{ item.price * item.quantity }}</span>
            </div>
          </div>

          <!-- Totals -->
          <div class="manifest-footer">
            <div class="total-row">
              <span class="total-label">SUBTOTAL</span>
              <span class="total-value">${{ cartTotal }}</span>
            </div>
            <div class="total-row">
              <span class="total-label">SHIPPING</span>
              <span class="total-value dim">CALCULATED AT DISPATCH</span>
            </div>
            <div class="total-row final">
              <span class="total-label">TOTAL PAYLOAD</span>
              <span class="total-value large">${{ cartTotal }}</span>
            </div>
          </div>

          <!-- Execute Button (desktop) -->
          <button @click="executeOrder" :disabled="isTransmitting" class="execute-btn desktop-only">
            {{ isTransmitting ? 'TRANSMITTING...' : '[ EXECUTE ORDER ]' }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background: #050505;
  color: #ffffff;
  padding: 14vh 2rem 10vh;
  position: relative;
  z-index: 10;
}

/* ── SUCCESS STATE ── */
.success-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
}
.success-inner {
  text-align: center;
  max-width: 600px;
}
.success-bar {
  width: 100%;
  height: 4px;
  background: #ffffff;
  margin-bottom: 3rem;
  animation: barGrow 0.8s ease-out;
}
@keyframes barGrow {
  from { width: 0; }
  to { width: 100%; }
}
.success-title {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  line-height: 1;
  margin: 0 0 1.5rem;
}
.success-sub {
  font-size: 10px;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  font-weight: 700;
  color: #888;
  margin-bottom: 2rem;
}
.success-detail {
  font-size: 0.75rem;
  color: #666;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1.8;
  margin-bottom: 3rem;
}
.return-btn {
  background: #e2e8f0;
  color: #000;
  border: none;
  padding: 1.25rem 3rem;
  font-weight: 900;
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;
}
.return-btn:hover {
  background: #fff;
  box-shadow: 0 0 30px rgba(255,255,255,0.2);
}

/* ── CHECKOUT LAYOUT ── */
.checkout-layout {
  max-width: 1200px;
  margin: 0 auto;
}

/* ── HEADER ── */
.checkout-header {
  border-bottom: 4px solid #ffffff;
  padding-bottom: 2rem;
  margin-bottom: 3rem;
}
.header-tag {
  font-size: 10px;
  letter-spacing: 0.4em;
  font-weight: 700;
  text-transform: uppercase;
  color: #555;
  margin-bottom: 1rem;
}
.header-title {
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  line-height: 1;
  margin: 0;
}
.header-sub {
  margin-top: 1rem;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #666;
  font-weight: 700;
}

/* ── ERROR ── */
.error-block {
  border: 1px solid #ef4444;
  color: #ef4444;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 0.1em;
  padding: 1rem;
  margin-bottom: 2rem;
  background: rgba(127,29,29,0.2);
}

/* ── GRID ── */
.checkout-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}
@media (min-width: 768px) {
  .checkout-grid {
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }
}

/* ── FORM COLUMN ── */
.form-column {
  padding-right: 0;
}
@media (min-width: 768px) {
  .form-column {
    padding-right: 3rem;
    border-right: 1px solid rgba(255,255,255,0.1);
  }
}

.section-label {
  font-weight: 900;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #ffffff;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.field-label {
  font-size: 10px;
  letter-spacing: 0.2em;
  font-weight: 700;
  text-transform: uppercase;
  color: #888;
}
.field-input {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.25);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.75rem 0;
  outline: none;
  border-radius: 0;
  transition: border-color 0.3s;
}
.field-input:focus {
  border-bottom-color: #ffffff;
}
.field-input::placeholder {
  color: rgba(255,255,255,0.2);
}

.field-row {
  display: flex;
  gap: 1.5rem;
}
.flex-1 { flex: 1; }

/* ── MANIFEST COLUMN ── */
.manifest-column {
  padding-left: 0;
}
@media (min-width: 768px) {
  .manifest-column {
    padding-left: 3rem;
  }
}

.empty-manifest {
  text-align: center;
  color: #555;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border: 1px solid #333;
  padding: 3rem;
  margin-bottom: 2rem;
}

.manifest-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  max-height: 340px;
  overflow-y: auto;
  padding-right: 0.5rem;
}
.manifest-list::-webkit-scrollbar { width: 3px; }
.manifest-list::-webkit-scrollbar-track { background: transparent; }
.manifest-list::-webkit-scrollbar-thumb { background: #333; }

.manifest-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border: 1px solid rgba(255,255,255,0.08);
  background: #0a0a0a;
  transition: border-color 0.3s;
}
.manifest-item:hover {
  border-color: rgba(255,255,255,0.25);
}

.manifest-img-wrap {
  width: 50px;
  height: 65px;
  flex-shrink: 0;
  overflow: hidden;
  background: #000;
}
.manifest-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  opacity: 0.8;
}

.manifest-meta {
  flex: 1;
  overflow: hidden;
}
.manifest-title {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #eee;
  margin: 0 0 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.manifest-qty {
  font-size: 10px;
  color: #666;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.manifest-price {
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  color: #aaa;
  flex-shrink: 0;
}

/* ── MANIFEST FOOTER ── */
.manifest-footer {
  border-top: 1px solid rgba(255,255,255,0.15);
  padding-top: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.total-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.total-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #888;
}
.total-value {
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.1em;
}
.total-value.dim {
  font-size: 10px;
  font-weight: 700;
  color: #555;
}
.total-row.final {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 1rem;
  margin-top: 0.5rem;
}
.total-value.large {
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}

/* ── EXECUTE BUTTON ── */
.execute-btn {
  width: 100%;
  padding: 1.25rem;
  background: #e2e8f0;
  color: #000;
  border: 1px solid #e2e8f0;
  font-weight: 900;
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;
}
.execute-btn:hover {
  background: #ffffff;
  box-shadow: 0 0 30px rgba(255,255,255,0.2);
  transform: translateY(-2px);
}
.execute-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* ── RESPONSIVE TOGGLES ── */
.mobile-only { display: block; }
.desktop-only { display: none; }

@media (min-width: 768px) {
  .mobile-only { display: none; }
  .desktop-only { display: block; }
}
</style>
