import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Summarize from '../views/Summarize.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Summarize',
    name: Summarize,
    component: Summarize
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
