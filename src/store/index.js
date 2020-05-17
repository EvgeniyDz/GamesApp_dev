import Vue from 'vue'
import Vuex from 'vuex'
import favorite from './modules/favorite.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    favorite,
  },
})
