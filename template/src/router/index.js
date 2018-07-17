import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/index' },
    { name: 'index',
      path: '/index',
      component: Index
    },

  ]
})
