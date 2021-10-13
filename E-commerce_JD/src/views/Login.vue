<template>
  <div>
    <img class="headerimg" src="../assets/清新学院风.png" alt="">
    <!-- 
      ⚡引入cube-form组件后，Register(父组件)给cube-form(子组件)动态传递 “对象类型的props” / "绑定一个自定义事件"，从而实现子给父传递数据
      子组件的props接收到 :model、:schema、@submit 这三组数据后，将使cube-form组件解析其模板，从而将cube-form组件的结构渲染至页面
    -->
    <!-- 📌使用Vue中的事件修饰符-prevent阻止默认事件(可应用于自定义事件) -->
    <cube-form 
      :model="model"  
      :schema="schema"
      @submit.prevent="submitHandler" 
    />
    <div class="cube-form-item border-bottom-1px cube-form-item_btn">
      <button type="submit" class="cube-btn" @click="toRegister">去注册</button>
    </div>
  </div>
</template>

<script>
  export default {
    name:'Login',
    //数据
    data() {
      return {
        //⚡model就是整个表单需要的数据源
        //model-配置用户名和密码
        model:{
          username:'',
          password:''
        },
        //⚡schema就是生成表单所定义的模式（schema-模式）
        schema:{
          fields:[
            //📌用户名配置
            {
              type:'input',
              modelKey:'username',
              label:'用户名',
              //输入框所提示的内容
              props:{
                placeholder:'请输入用户名'
              },
              rules:{
                //校验规则
                required:true, //必填 -配置该项后页面会展现 * 标志
                type:'string',
                min:3,
                max:15
              },
              //失去焦点，就会触发👇messages内的校验项
              trigger:'blur',
              messages:{
                required:'用户名不能为空',
                min:'用户名不能少于3个字符',
                max:'用户名不能大于15个字符'
              }
            },
            //📌密码配置
            {
              type:'input',
              modelKey:'password',
              label:'密码',
              props:{
                placeholder:'请输入密码',
                type:'password',
                eye:{
                  open:false,
                }
              },
              rules:{
                //校验规则
                required:true, //必填 -配置该项后页面会展现 * 标志
              },
              //失去焦点，就会触发校验
              trigger:'blur'
            },
            //提交按钮
            {
              type:'submit',
              label:'登录'
            }
          ]
        }
      }
    },
    methods: {
      //编写异步调用
      async submitHandler(e){
        // e.preventDefault()  //📌由于表单提交以后会产生“自动刷新页面”的默认行为，所以可用event的preventDefault()方法来“阻止元素发生默认行为”❗❗
        //C:\Users\GUI WEI\Desktop\Vue2+3_desktop\AJAX\Code\5-axios-AJAX有代码解析过程
        //vc利用放在Vue原型上的$http(也就是axios)向“登录接口”发送get请求
        try{
          //📌axios请求返回的结果为result，result.data-从登录接口返回的数据，result.data.xxx-所返回数据中的某某属性(如token、code、message)
          const result = await this.$http.get('/api/login',{params:this.model})
          //请求成功（即用户成功登录时）
          if(result.code == '0'){
            //📌通过commit调用mutations后，利用settoken方法，操作从登录接口传过来的token，并通过mutations将其值保存到state数据仓中
            this.$store.commit('settoken',result.token)
            //📌通过vuex存储，只要刷新页面，数据便会丢失。所以还要存储至localstorage本地存储中
            window.localStorage.setItem('token',result.token)
            
            //用户成功登录后，判断路由是否带参，如果带参就去到重定向参数的地址(也就是未登录时用户想点开但又不能显示的页面)，否则就去首页
            if(this.$route.query.redirect){
              //如带参数，跳转至this.$route.query.redirect（也就是main.js中query中的redirect）
              this.$router.replace({path:this.$route.query.redirect})
            }else{
              //如不带参数，则跳转至首页index【编程式路由导航 -> replace: 跳转后无法回退上一级页面，若将replace换成push则可以回退上一级页面】
              this.$router.replace({path:'/botnav/index'})
            }
          }else{   //请求失败
            alert(result.message)
          } 
        }catch(err){
          console.log(err)
        }
      },

      //跳转至注册页面
      toRegister(){
        this.$router.replace({path:'/register'})
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .headerimg
    height 200px
    width 100%
</style>