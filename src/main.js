// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import axios from 'axios'
import axios from '@/axios/axios-init.js'
import qs from 'qs';
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate);
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$store = store;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
