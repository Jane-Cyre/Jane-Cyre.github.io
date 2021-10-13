//引入axios
import axios from 'axios'
//引入vuex
import store from './store'
//引入路由
import router from './router'


//http全局拦截
//token要放在请求的header中带给后端接口
export default function sexAxios(){
  // 添加请求拦截器（该写法是固定的），然后在里面写一个config配置
  axios.interceptors.request.use(config => {
    //如果state中所存储的token的值不是空字符串(注:非空字符串的布尔值为true)，就将该token添加到config配置中，然后return该配置
    if(store.state.token){
      config.headers.token = store.state.token
    }
    return config
  })

  //添加响应拦截器
  axios.interceptors.response.use(response => {
    //如果请求状态码等于200
    if(response.status == 200){
      const data = response.data //通过赋值简化response.data为data，方便书写
      //code=-1表示登录过期
      if(data.code == -1){
        //登录过期，需要重新登录，清空vuex中的token 和 localstorage中的token
        store.commit('settoken','')
        localStorage.removeItem('token')
        //跳转到login页面重新登录
        router.replace({path:'/login'})
      }
      return data
    }
    return response
  })
}


