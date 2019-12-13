<template>
  <div id="app">
    <div id="cover" />
    <div
      v-show="loading"
      id="loading"
    >
      <Loading />
    </div>
    <Header />
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view />
    </transition>
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Loading from './components/loading/loading.vue'

export default {
  metaInfo: {
    title: 'Simon Todo App'
  },
  components: {
    Header,
    Footer,
    Loading
  },
  computed: {
    ...mapState(['loading'])
  }
}
</script>

<style lang="stylus" scoped>
#app {
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover {
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
#loading {
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background-color rgba(255,255,255,.3)
  z-index 99
  display flex
  align-items center
  justify-content center
}
</style>
