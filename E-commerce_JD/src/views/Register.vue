<template>
  <div>
    <img class="headerimg" src="../assets/summer sale.png" alt="">
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
      <button type="submit" class="cube-btn" @click="toLogin">去登录</button>
    </div>
  </div>
</template>

<script>
  export default {
    name:'Register',
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
              //失去焦点，就会触发👇messages内的检测项
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
              //失去焦点，就会触发检测
              trigger:'blur'
            },
            //提交按钮
            {
              type:'submit',
              label:'注册'
            }
          ]
        }
      }
    },
    methods: {
      submitHandler(e){
        // e.preventDefault()  //📌由于表单提交以后会产生“自动刷新页面”的默认行为，所以可用event的preventDefault()方法来“阻止元素发生默认行为”❗❗
        //C:\Users\GUI WEI\Desktop\Vue2+3_desktop\AJAX\Code\5-axios-AJAX有代码解析过程
        //vc利用放在Vue原型上的$http(也就是axios)向“注册接口”发送get请求
        // `params` 是与请求一起发送的 URL 参数
        this.$http.get('/api/register',{params:this.model}).then(res => {  //vue.config.js中的注册接口写的是get请求，这里也必须对应get请求
          console.log(res.success)
          alert('注册成功！')
        })
        .catch(err => {  //捕获异常错误
          console.log(err)
        })
      },

      //跳转至登录页面
      toLogin(){
        this.$router.replace({path:'/login'})
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .headerimg
    height 200px
    width 100%
</style>