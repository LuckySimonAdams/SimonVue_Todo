import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'

import './assets/styles/global.styl'

import createRouter from './router/router'
import createStore from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

// store.registerModule('c', {
//   state: {
//     text: 3
//   }
// })
// store.watch((state) => state.count + 1, (newCount) => {
//   console.log('new count watched:', newCount)
// })
// store.subscribe((mutation, state) => {
//   console.log(mutation.type)
//   console.log(mutation.payload)
// })

// router.beforeEach((to, from, next) => {
//   // if (to.fullPath === '/app') {
//   //   next({ path: '/login' })
//   // } else {
//   //   next()
//   // }
//   next()
// })
// router.beforeResolve((to, from, next) => next())
// router.afterEach((to, from) => {})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')
