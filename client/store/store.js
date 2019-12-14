import Vuex from 'vuex'
import defaultState from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev,
    state: defaultState,
    getters,
    mutations,
    actions
  })

  if (module.hot) {
    module.hot.accept([
      './state',
      './getters',
      './mutations',
      './actions'
    ], () => {
      store.hotUpdate({
        state: require('./state').default,
        getters: require('./getters').default,
        mutations: require('./mutations').default,
        actions: require('./actions').default
      })
    })
  }

  return store
}
