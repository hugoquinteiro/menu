import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/axios'
import router from './router'
import App from './App.vue'
// import VueMask from 'v-mask'
import money from 'v-money'

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
  render: h => h(App),
}).$mount('#app')
