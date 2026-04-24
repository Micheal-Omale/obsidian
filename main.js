import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './src/App.vue'
import router from './src/router/index.js'

// CSS imports — must be here (not in HTML link tags) so Vite bundles them in production
import './src/assets/styles/base.css'
import './src/assets/styles/nav.css'
import './src/assets/styles/hero.css'
import './src/assets/styles/archive.css'
import './src/assets/styles/horizontal.css'
import './src/assets/styles/interactive.css'
import './src/assets/styles/footer.css'

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')

