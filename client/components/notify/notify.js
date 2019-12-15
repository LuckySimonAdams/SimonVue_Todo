import Vue from 'vue'

import BaseNotify from './notify-base.vue'

const Component = {
  extends: BaseNotify,
  data () {
    return {
      verticalOffset: 0,
      autoClose: 3000,
      height: 0,
      visible: false
    }
  },
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  mounted () {
    this.createTimer()
  },
  methods: {
    createTimer () {
      if (!this.autoClose) return
      this.timer = setTimeout(() => {
        this.visible = false
      }, this.autoClose)
    },
    clearTimer () {
      this.timer && clearTimeout(this.timer)
    },
    afterEnter () {
      this.height = this.$el.offsetHeight
    }
  },
  beforeDestroy () {
    this.clearTimer()
  }
}

const NofityConstructor = Vue.extend(Component)

const instances = []

const OFFSET_HEIGHT = 16

let seed = 1

const removeInstance = instance => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(ins => instance.id === ins.id)
  instances.splice(index, 1)
  if (len <= 1) return
  const removeHeight = instance.vm.height
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - OFFSET_HEIGHT
  }
}

const notify = options => {
  // 避免服务端渲染执行
  if (Vue.prototype.$isServer) return

  const { autoClose, ...rest } = options
  const instance = new NofityConstructor({
    propsData: { ...rest },
    data: { autoClose: autoClose || 3000 }
  })
  instance.id = `notify_${seed++}`
  instance.vm = instance.$mount()
  instance.vm.visible = true
  document.body.appendChild(instance.vm.$el)

  let verticalOffset = 0
  instances.forEach(ins => {
    verticalOffset += ins.$el.offsetHeight + OFFSET_HEIGHT
  })
  verticalOffset += OFFSET_HEIGHT
  instance.verticalOffset = verticalOffset

  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })
  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })

  instances.push(instance)

  return instance.vm
}

export default notify
