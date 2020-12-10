import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Vue.directive('setfont', {
//   bind: function (el, binding) {
//     console.log(binding.modifiers.style)
//     // if (binding.value === 'blue') {
//     //   el.style.color = 'blue'
//     // } else if (binding.value === 'red') {
//     //   el.style.color = 'red'
//     // } else {
//     //   el.style.color = 'salmon'
//     // }
//     el.style.color = binding.value ? binding.value : 'black'
//     // kondisi ke 2 => arg
//     if (binding.arg === 'big') {
//       el.style.fontSize = '50px'
//     } else if (binding.arg === 'small') {
//       el.style.fontSize = '8px'
//     } else {
//       el.style.fontSize = '13px'
//     }

//     // kondisi ke 3 => modifiers
//     if (binding.modifiers.style) {
//       el.style.fontStyle = 'italic'
//     }
//   }
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
