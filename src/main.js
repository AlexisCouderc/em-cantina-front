import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router/index'
import VuejsDialog from 'vuejs-dialog'
import VueRouter from 'vue-router'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VuejsDialog)
Vue.use(Vuelidate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
