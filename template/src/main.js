// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'

import ToastPlugin from 'vux/src/plugins/toast'
import AjaxPlugin from 'vux/src/plugins/ajax'
import router from './router'
import Loading from './plugins/loading'
import rem from '@/utils/rem'
import openSDK from '@/utils/openSDK'
Vue.use(openSDK)

Vue.use(ToastPlugin)
Vue.use(AjaxPlugin)

Vue.use(Loading)

FastClick.attach(document.body)
rem.set()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
