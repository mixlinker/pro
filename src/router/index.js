import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/layout/index.vue')
import { basicRouter } from './modules/basic'
const routers = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/pro/index',
      children: [
        ...basicRouter,
      ]
    },
  ]
})

export default routers
