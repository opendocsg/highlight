import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import router from '@/routes/index'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router
}).$mount('#app')