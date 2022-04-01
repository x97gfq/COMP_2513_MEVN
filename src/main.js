import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false

new Vue({
  BootstrapVue,
  IconsPlugin,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
