// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

import axios from './axios-backend/vue-axios'

Vue.use(VueMaterial);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
