<template>
  <section class="real-app">
    <div class="tab-container">
      <tabs
        :value="filter"
        @change="handleChangeTab"
      >
        <tab
          v-for="tab in stats"
          :key="tab"
          :label="tab"
          :index="tab"
        />
      </tabs>
    </div>
    <input
      type="text"
      class="add-input"
      placeholder="add todo item"
      autofocus
      @keyup.enter="handleAdd"
    >
    <Item
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      @del="deleteTodo"
      @toggle="toggleTodoState"
    />
    <Helper
      :filter="filter"
      :todos="todos"
      @clearAllCompleted="clearAllCompleted"
    />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Item from './item.vue'
import Helper from './helper.vue'

export default {
  metaInfo: {
    title: 'The Todo App'
  },
  components: {
    Item,
    Helper
  },
  data () {
    return {
      filter: 'all',
      stats: ['all', 'active', 'completed']
    }
  },
  computed: {
    ...mapState(['todos']),
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => todo.completed === completed)
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     console.log('after enter vm.id is ', vm.id)
  //   })
  // },
  // beforeRouteUpdate (to, from, next) {
  //   next()
  // },
  // beforeRouteLeave (to, from, next) {
  //   next()
  // },
  mounted () {
    // if (this.todos && this.todos.length < 1) {
    //   this.fetchTodos()
    // }
  },
  methods: {
    handleAdd (e) {
      const content = e.target.value.trim()
      if (!content) {
        this.$notify({
          content: '必须输入要做的内容'
        })
        return
      }
      const todo = {
        content,
        completed: false
      }
      this.addTodo(todo)
      e.target.value = ''
    },
    // deleteTodo (id) {
    //   this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    // },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app {
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
}
.add-input {
  position relative
  margin 0
  width 100%
  font-size: 24px
  font-family inherit
  font-weight inherit
  line-height 1.4em
  border 0
  outline none
  color inherit
  padding 6px
  border 1px solid #999
  box-shadow inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2)
  box-sizing border-box
  font-smoothing antialiased
  padding 16px 16px 16px 60px
  border none
  box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)
}
</style>
