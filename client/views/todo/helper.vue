<template>
  <div class="helper">
    <span class="left">{{ unFinishedTodoLength }} items left</span>
    <span
      class="clear"
      @click="clearAllCompleted"
    >
      Clear Completed
    </span>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true
    }
  },

  computed: {
    unFinishedTodoLength () {
      return this.todos.filter(todo => !todo.completed).length
    }
  },

  methods: {
    clearAllCompleted () {
      this.$emit('clearAllCompleted')
    }
  }
}
</script>

<style lang="stylus" scoped>
.helper {
  display flex
  justify-content space-between
  padding 5px 0
  line-height 30px
  background #ffffff
  font-size 14px
  font-weight 100
  font-smoothing antialiased
}

.left, .clear {
  padding 0 10px
  box-sizing border-box
}

.left, .clear {
  width 150px
}

.left {
  text-align left
}

.clear {
  text-align right
  cursor pointer
}

.tabs {
  display flex
  justify-content space-around
  width 200px

  * {
    display inline-block
    padding 0 10px
    border 1px solid rgba(175, 47, 47, 0)
    cursor pointer

    &.actived {
      border-color rgba(175, 47, 47, 0.4)
      border-radius 5px
    }
  }
}
</style>
