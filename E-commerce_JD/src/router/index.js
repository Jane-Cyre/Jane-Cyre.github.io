import Vue from 'vue'
import Router from 'vue-router'
//引入组件
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import { IndexList } from 'cube-ui'
Vue.use(Router)

//该路由实例名为router
export default new Router({
  mode: 'history',  //浏览器地址栏没有#
  base: process.env.BASE_URL,
  routes: [
    //重定向
    {
      path: '/',
      name: 'register',
      redirect: '/login'
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.

      //路由懒加载可以使页面首屏秒加载(快速加载并呈现页面，不至于加载很长时间)
      component:() => import('../views/Login.vue')
    },
    {
      path:'/index',
      name:'index',
      //⚡路由懒加载可以使页面首屏秒加载(快速加载并呈现页面，不至于加载很长时间)
      component:() => import('../views/Index.vue')
    },
    {
      path:'/botnav',
      name:'botnav',
      //⚡路由懒加载可以使页面首屏秒加载(快速加载并呈现页面，不至于加载很长时间)
      component:() => import('../views/Botnav.vue'),
      //配置二级路由（页面底端botnav的每个标签项所对应的路由跳转页面）
      children:[
        {
          path:'index',
          name:'index',
          //⚡路由懒加载可以使页面首屏秒加载(快速加载并呈现页面，不至于加载很长时间)
          component:() => import('../views/Index.vue')
        },
        {
          path:'list',
          name:'list',
          //⚡路由懒加载可以使页面首屏秒加载(快速加载并呈现页面，不至于加载很长时间)
          component:() => import('../views/List.vue')
        },
        {
          path:'search',
          name:'search',
          //⚡路由懒加载可以使页面首屏秒加载(快速加载并呈现页面，不至于加载很长时间)
          component:() => import('../views/Search.vue')
        },
        {
          path:'cart',
          name:'cart',
          meta:{requireAuth:true},  //requireAuth(是否授权)，设置该路由页面是否需要配备“登录权限”
          //⚡路由懒加载可以使页面首屏秒加载(快速加载并呈现页面，不至于加载很长时间)
          component:() => import('../views/Cart.vue')
        },
        {
          path:'mine',
          name:'mine',
          meta:{requireAuth:true},  //requireAuth(是否授权)，设置该路由页面是否需要配备“登录权限”
          //⚡路由懒加载可以使页面首屏秒加载(快速加载并呈现页面，不至于加载很长时间)
          component:() => import('../views/Mine.vue')
        }
      ]
    },

  ],
})
