import { createRouter, createWebHashHistory } from 'vue-router' // Mudança aqui!
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  // Usar Hash History é essencial para GitHub Pages
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/checkout/:productId',
      name: 'checkout',
      props: true,
      component: () => import('../views/Checkout.vue')
    },
    // --- NOVA ROTA DE SUCESSO ---
    {
      path: '/sucesso',
      name: 'sucesso',
      component: () => import('../views/SuccessView.vue')
    },
  ],
})

export default router