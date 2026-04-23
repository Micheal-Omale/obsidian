import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import CollectionView from '../views/Collection.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import Checkout from '../views/Checkout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/collection',
      name: 'collection',
      component: CollectionView
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboard
    }
  ]
})

export default router

