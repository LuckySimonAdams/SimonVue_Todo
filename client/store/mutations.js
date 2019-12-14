export default {
  updateCount (state, { num, num2 }) {
    console.log(num2)
    state.count = num
  },
  startLoading (state) {
    state.loading = true
  },
  endLoading (state) {
    state.loading = false
  }
}
