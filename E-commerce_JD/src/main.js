import Vue from 'vue'
//引入cube-ui组件库
import './cube-ui'
import App from './App.vue'
//不写/index.js，路径会默认匹配index.js
import router from './router'
import store from './store'
import axios from 'axios'
import 'amfe-flexible'
import setaxios from './setaxios'
//按需引入Vant中的Search组件
import { Search } from 'vant'

//通过Vue.use注册Vant中的Search组件
Vue.use(Search)

//在全局环境下，执行setaxios方法
setaxios()

//全局路由守卫
router.beforeEach((to,from,next) => {
  //无论是刷新还是跳转路由，第一个进入的就是全局前置路由守卫钩子函数
  //用户登录成功以后，将login.vue中通过window.localStorage.setItem保存在本地的token值先通过localstorage.getItem()取出,再通过vuex的commit跟mutations对话，从而将token保存至vuex的state数据仓中
  store.commit('settoken',localStorage.getItem('token'))
  //如果路由权限为ture（to就是路由配置对象{}）
  if(to.meta.requireAuth){
    //如果Vuex的store下的state数据仓中的token有非空值
    if(store.state.token){
      //放行，予以跳转
      next()  
    }else{
      //如果state数据仓中的token为空值
      next({
        //跳转至登录页面重新登录
        path:'/login',
        //捎带一些参数，重定向至fullPath(完整的路径)，即稍后用户登录成功以后将立马跳转至刚才未登录时所点击的但无法访问的页面的“完整路径”
        query:{redirect:to.fullPath}  
      })
    }
  }else{
    next()
  }
})

Vue.config.productionTip = false
//将axios放在Vue原型上，可全局使用(包括vc)
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

