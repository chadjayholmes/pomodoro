import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Summarize from '../views/Summarize.vue'
import MySummaries from '../views/MySummaries'
import Bookmarked from '../views/Bookmarked'
import { authGuard } from '../auth/authGuard';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Summarize',
    name: 'Summarize',
    component: Summarize,
    beforeEnter: authGuard,
  },
  {
    path: '/MySummaries',
    name: 'MySummaries',
    component: MySummaries,
    beforeEnter: authGuard,
  },
  {
    path: '/Bookmarked',
    name: 'Bookmarked',
    component: Bookmarked,
    beforeEnter: authGuard,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
