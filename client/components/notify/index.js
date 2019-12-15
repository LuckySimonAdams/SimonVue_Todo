import BaseNofity from './notify-base.vue'
import notify from './notify'

export default Vue => {
  Vue.component(BaseNofity.name, BaseNofity)
  Vue.prototype.$notify = notify
}
