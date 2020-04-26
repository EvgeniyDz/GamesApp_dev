import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'
import routes from './routes'
// import { sync } from 'vuex-router-sync'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: routes,
})

// sync(store, router)

export default router
