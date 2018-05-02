import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Dashboard from '@/components/dashboard'
import Theatre from '@/components/theatre'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/theatre/',
      name: 'Theatre',
      component: Theatre,
      props: true,
    }
  ]
})
