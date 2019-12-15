import model from '../model/client-model'
import notify from '../components/notify/notify'
import bus from '../util/bus'

const handleError = err => {
  if (err.code === 401) {
    notify({
      content: '请先登录'
    })
    bus.$emit('authorize')
  }
}

export default {
  login ({ commit }, { username, password }) {
    commit('startLoading')
    return new Promise((resolve, reject) => {
      model.login(username, password)
        .then(data => {
          commit('login', data)
          commit('endLoading')
          notify({
            content: '登录成功'
          })
          resolve()
        })
        .catch(err => {
          handleError(err)
          reject(err)
          commit('endLoading')
        })
    })
  },
  getAllTodos ({ commit }) {
    commit('startLoading')
    return model.getAllTodos()
      .then(data => {
        commit('endLoading')
        commit('getAllTodos', data)
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  addTodo ({ commit }, todo) {
    commit('startLoading')
    return model.addTodo(todo)
      .then(data => {
        commit('endLoading')
        commit('addTodo', data)
        notify({
          content: '你又多了一件事要做'
        })
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  updateTodo ({ commit }, { id, todo }) {
    commit('startLoading')
    return model.updateTodo(id, todo)
      .then(data => {
        commit('endLoading')
        commit('updateTodo', { id, todo: data })
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  deleteTodo ({ commit }, id) {
    commit('startLoading')
    model.deleteTodo(id)
      .then(() => {
        commit('endLoading')
        commit('deleteTodo', id)
        notify({
          content: '你又少了一件事要做'
        })
      }).catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  deleteAllCompleted ({ commit, state }) {
    commit('startLoading')
    const ids = state.todos.filter(todo => todo.completed).map(todo => todo.id)
    model.deleteAllCompleted(ids)
      .then(() => {
        commit('endLoading')
        commit('deleteAllCompleted')
        notify({
          content: '清理已完成事件'
        })
      }).catch(err => {
        commit('endLoading')
        handleError(err)
      })
  }
}
