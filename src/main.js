import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from './plugins/axios'
import notify from './plugins/pnotify'

Vue.prototype.$http = axios
Vue.prototype.$notify = notify

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
