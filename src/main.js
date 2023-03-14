import '@babel/polyfill'
import 'font-awesome/css/font-awesome.css'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/axios'
import firebaseVue from './firebase'
import router from './router'
import App from './App.vue'


// import VueMask from 'v-mask'
import money from 'v-money'

import store from './store'

Vue.use(firebaseVue)

Vue.config.productionTip = false
// Vue.use(VueMask)
Vue.use(money, {
  decimal: ',',
  thousands: '.',
  // prefix: 'R$ ',
  precision: 2,
  masked: false

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
