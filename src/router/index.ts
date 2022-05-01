import { createRouter, createWebHistory } from 'vue-router'
import { Views, Layouts } from '@/constants'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory('/fitness-tracker-v14/'),
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
      path: '/active-workout/:id',
      props: true,
      name: Views.ACTIVEWORKOUT,
      meta: { layout: Layouts.MENU }, // @todo - active workout header/footer
      component: () => import(`../views/${Views.ACTIVEWORKOUT}.vue`),
    },
    {
      path: '/charts',
      name: Views.CHARTS,
      meta: { layout: Layouts.MENU },
      component: () => import(`../views/${Views.CHARTS}.vue`),
    },
    // {
    //   path: '/measurements/edit/:id',
    //   props: true,
    //   name: Views.MEASUREMENTS,
    //   meta: { layout: Layouts.MENU },
    //   component: () => import(`../views/${Views.MEASUREMENTS}.vue`),
    // },
    // {
    //   path: '/measurements/create',
    //   name: Views.MEASUREMENTS,
    //   meta: { layout: Layouts.MENU },
    //   component: () => import(`../views/${Views.MEASUREMENTS}.vue`),
    // },
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
