import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.directive('drag', {
  inserted: function (el, binding) {
    el.onmousedown = function (e) {
      e.stopPropagation()
      e.preventDefault()
      const disx = e.pageX - el.offsetLeft
      const disy = e.pageY - el.offsetTop
      document.onmousemove = function (e) {
        e.preventDefault()
        el.position = 'absolute'
        el.style.left = e.pageX - disx + 'px'
        el.style.top = e.pageY - disy + 'px'
      }
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null
        if (binding && binding.value) {
          binding.value.clientX = parseInt(el.style.left)
          binding.value.clientY = parseInt(el.style.top)
        }
      }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
