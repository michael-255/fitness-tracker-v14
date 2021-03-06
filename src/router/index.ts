import { createRouter, createWebHistory } from 'vue-router'
import { Views, Layouts } from '@/constants/enums'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: Views.DASHBOARD,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.DASHBOARD}.vue`),
    },
    {
      path: '/measurements',
      name: Views.MEASUREMENTS,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.MEASUREMENTS}.vue`),
    },
    {
      path: '/exercises',
      name: Views.EXERCISES,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.EXERCISES}.vue`),
    },
    {
      path: '/workouts',
      name: Views.WORKOUTS,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.WORKOUTS}.vue`),
    },
    {
      path: '/app-logs',
      name: Views.APPLOGS,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.APPLOGS}.vue`),
    },
    {
      path: '/options',
      name: Views.OPTIONS,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.OPTIONS}.vue`),
    },
    {
      path: '/about',
      name: Views.ABOUT,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.ABOUT}.vue`),
    },
    {
      path: '/:pathMatch(.*)*', // 404 Not Found
      name: Views.NOTFOUND,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.NOTFOUND}.vue`),
    },
  ],
})

export default router
