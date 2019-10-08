import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入全局饿了么框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局css样式
import './styles/index.less'
// 使用饿了么框架
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
