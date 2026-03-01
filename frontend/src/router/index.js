import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
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
    // --- ROTA DE SUCESSO ---
    {
      path: '/sucesso',
      name: 'sucesso',
      component: () => import('../views/SuccessView.vue')
    },
    // --- ADICIONE ESTA ROTA PARA O PIX PENDENTE ---
    {
      path: '/pendente',
      name: 'pendente',
      component: () => import('../views/PendingView.vue')
    },
    // --- ADICIONE ESTA ROTA PARA CASO DE ERRO ---
    {
      path: '/erro',
      name: 'erro',
      component: () => import('../views/ErrorView.vue')
    },
    // Rota curinga (opcional): redireciona para home se a rota não existir
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
})

export default router