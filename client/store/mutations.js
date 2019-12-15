export default {
  login (state, userInfo) {
    state.user = userInfo
  },
  startLoading (state) {
    state.loading = true
  },
  endLoading (state) {
    state.loading = false
  },
  getAllTodos (state, todos) {
    state.todos = todos
  },
  addTodo (state, todo) {
    state.todos.unshift(todo)
  },
  updateTodo (state, { id, todo }) {
    state.todos.splice(state.todos.findIndex(todo => todo.id === id), 1, todo)
  },
  deleteTodo (state, id) {
    state.todos.splice(state.todos.findIndex(todo => todo.id === id), 1)
  },
  deleteAllCompleted (state) {
    state.todos = state.todos.filter(todo => !todo.completed)
  }
}
