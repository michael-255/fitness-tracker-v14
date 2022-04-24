import { createRouter, createWebHistory } from 'vue-router'
import { Views, Layouts } from '@/constants'

enum Paths {
  DASHBOARD = '/dashboard',
  ACTIVEWORKOUT = '/active-workout',
  CHARTS = '/charts',
  MANAGEMENT = '/management',
  SETTINGS = '/settings',
  ABOUT = '/about',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: Paths.DASHBOARD,
    },
    {
      path: Paths.DASHBOARD,
      name: Views.DASHBOARD,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.DASHBOARD}.vue`),
    },
    {
      path: Paths.ACTIVEWORKOUT + '/:id',
      name: Views.ACTIVEWORKOUT,
      meta: { layout: Layouts.MENU }, // @todo - active workout header/footer
      component: () => import(`../views/${Views.ACTIVEWORKOUT}.vue`),
      props: true,
    },
    {
      path: Paths.CHARTS,
      name: Views.CHARTS,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.CHARTS}.vue`),
    },
    {
      path: Paths.MANAGEMENT,
      name: Views.MANAGEMENT,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.MANAGEMENT}.vue`),
    },
    {
      path: Paths.SETTINGS,
      name: Views.SETTINGS,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.SETTINGS}.vue`),
    },
    {
      path: Paths.ABOUT,
      name: Views.ABOUT,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.ABOUT}.vue`),
    },
    {
      path: '/:pathMatch(.*)*', // 404 Not Found
      name: Views.NOTFOUND,
      meta: { layout: Layouts.DEFAULT },
      component: () => import(`../views/${Views.NOTFOUND}.vue`),
    },
  ],
})

export default router
