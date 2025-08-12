import PriceCalculator from '@/PriceCalculator.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'price-calculator',
      component: PriceCalculator,
    },
  ],
})

export default router
