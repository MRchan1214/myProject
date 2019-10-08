import Vue from 'vue'
import Router from 'vue-router'

// 导入写好的自定义子组件
import Login from './views/login/login'
import Home from './views/home/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ]
})
