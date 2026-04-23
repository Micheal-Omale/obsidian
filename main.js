import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './src/App.vue'
import router from './src/router/index.js'

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')

