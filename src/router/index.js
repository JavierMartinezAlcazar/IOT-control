import { createRouter, createWebHistory } from 'vue-router'
import mostrarDispositivos from '@/components/mostrarDispositivos.vue'
import verDispositivo from '@/components/verDispositivo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: mostrarDispositivos
    },
    {
      path: '/dispositivo/:sala/:nombre',
      name: 'dispositivo',
      component: verDispositivo
    }
  ]
})

export default router
