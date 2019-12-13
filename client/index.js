import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

import './assets/styles/global.styl'

import createRouter from './router'

Vue.use(VueRouter)

const router = createRouter()

router.beforeEach((to, from, next) => {
  // if (to.fullPath === '/app') {
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }
  next()
})
// router.beforeResolve((to, from, next) => next())
// router.afterEach((to, from) => {})

new Vue({
  router,
  render: h => h(App)
}).$mount('#root')
