import createApp from './create-app'
import bus from './util/bus'

const { app, router } = createApp()

// 重定向到登录页面
bus.$on('authorize', () => {
  router.push('/login')
})

router.onReady(() => {
  app.$mount('#root')
})
