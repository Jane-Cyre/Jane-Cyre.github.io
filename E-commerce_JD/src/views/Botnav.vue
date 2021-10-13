<template>
  <div>
    <!-- 路由页面之间的过渡动效 -->
    <transition :name="transitionName">
      <!-- ⚡指定组件的呈现位置 -->
      <!-- 此处所呈现的是页面底部标签栏的某一项标签在被点击后要跳转的“路由页面” -->
      <router-view class="Router"></router-view>
    </transition>
    <cube-tab-bar
      v-model="selectedLabelDefault"
      :data="tabs"
      @click="clickHandler"
      @change="changeHandler"
      class="botnav">
    </cube-tab-bar>
    <!-- ⚡设置将商品添加至购物车的数量累计总数 -->
    <span class="countsum">{{countsum}}</span>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
  export default {
    name:'Botnav',
    data () {
      return {
        transitionName:'slide-right',
        //⚡默认选择'首页'
        selectedLabelDefault: '首页',
        tabs: [
          {
            label: '首页',
            icon: 'cubeic-home'
          }, 
          {
            label: '分类',
            icon: 'cubeic-tag'
          }, 
          {
            label: '搜索',
            icon: 'cubeic-search'
          }, 
          {
            label: '购物车',
            icon: 'cubeic-mall'
          },
          {
            label: '我的',
            icon: 'cubeic-person'
          }
        ]
      }
    },
    methods: {
      clickHandler (label) {
        // if you clicked home tab, then print 'Home'
        // console.log(label)
      },
      //点击与自身不同的其他导航
      changeHandler (label) {
        // if you clicked different tab, this methods can be emitted(如果你选择了不同的tag，就会触发该方法)
        switch (label) {
          case '首页':
            //点击‘首页’标签，跳转至/botnav/index路由页面
            //this.$router.push({name:'index'})        //📌命名路由写法
            this.$router.push({path:'/botnav/index'})
            break //跳出switch语句中该case代码段
          case '分类':
            //点击‘分类’标签，跳转至/botnav/list路由页面
            //this.$router.push({name:'list'})        //📌命名路由写法
            this.$router.push({path:'/botnav/list'})
            break //跳出switch语句中该case代码段
          case '搜索':
            //点击‘搜索’标签，跳转至/botnav/search路由页面
            //this.$router.push({name:'search'})        //📌命名路由写法
            this.$router.push({path:'/botnav/search'})
            break //跳出switch语句中该case代码段
          case '购物车':
            //点击‘购物车’标签，跳转至/botnav/cart路由页面
            //this.$router.push({name:'cart'})        //📌命名路由写法
            this.$router.push({path:'/botnav/cart'})
            break //跳出switch语句中该case代码段
          case '我的':
            //点击‘我的’标签，跳转至/botnav/mine路由页面
            //this.$router.push({name:'mine'})        //📌命名路由写法
            this.$router.push({path:'/botnav/mine'})
            break //跳出switch语句中该case代码段
             
          
        }
      }
    },

    computed: {
      //借助mapGetters生成计算属性，从getters中拿到数据 (数组写法)
      ...mapGetters(['countsum'])
    },

    //created钩子->在页面初始化&注入响应式之后，此时已经可以访问到data中的数据和methods中的方法了
    //❗❗当然，这里如果把created换成mounted(页面挂载完成)也可以实现下面的功能
    created() {
      //console.log(this)  ⚡你可以通过这句输出语句查看vc身上的路由信息❗
      /* 在页面刚刚完成初始化并注入响应式后，利用开关语句判断当前浏览器地址栏的路径，如果路径为以下的5个case中的任意一种，则设置默认选择的“分类页” */
      switch(this.$route.path){
        case '/botnav/index':
          //⚡默认选择'首页'
          this.selectedLabelDefault = '首页'
          break
        case '/botnav/list':
          //⚡默认选择'分类'
          this.selectedLabelDefault = '分类'
          break
        case '/botnav/search':
          //⚡默认选择'搜索'
          this.selectedLabelDefault = '搜索'
          break
        case '/botnav/cart':
          //⚡默认选择'购物车'
          this.selectedLabelDefault = '购物车'
          break
        case '/botnav/mine':
          //⚡默认选择'我的'
          this.selectedLabelDefault = '我的'
          break     
      }
    },
  }
</script>

<style lang="stylus">
  .cube-tab-bar.botnav
    position fixed
    bottom 0
    left 0
    z-index 1000
    width 100%
    background #fff
    .cube-tab div
      font-size 16px
      padding-top 3px
    i
      font-size 20px
  .Router
    position absolute
    width 100%
    transition all 0.8s ease
    
  .slide-left-enter,.slide-right-leave-active
    opacity 0
    transform translate(100%,0)
  .slide-left-leave-active,.slide-right-enter
    opacity 0
    transform translate(-100%,0)
  .countsum
    position fixed
    bottom 33px
    right 23% 
    z-index 1001
    width 18px
    height 18px
    line-height 18px
    border-radius 50%
    font-size 14px
    background red
    color #fff
</style>