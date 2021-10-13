<template>
  <div>
    <img class="headerimg" src="../assets/love of my life.png" alt="">
    <ul>
      <li class="mineitem" v-for="item in minearry" :key="item.label" @click="itemclick(item)">
        <span class="minetitle">{{item.label}}</span>
        <i class="cubeic-arrow"></i>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        minearry:[
          {label:'商品收藏'},
          {label:'我的足迹'},
          {label:'店铺收藏'},
          {label:'我的订单'},
          {label:'退出',type:'exit'}
        ]
      }
    },
    methods: {
      //用户点击“退出”标签
      itemclick(item){
        if(item.type == 'exit'){
          //📌调用commit和mutations对话，执行mutations中的settoken()方法清除state中的token
          this.$store.commit('settoken','')
          //📌同时删除本地存储中的token
          localStorage.removeItem('token')
          //📌同时路由跳转至首页重新登录
          this.$router.push({path:'/login'})
        }
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .mineitem
    font-size 14px
    text-align left
    height 50px
    line-height 50px
    padding-left 5%
    border-bottom 1px solid #eee
    .minetitle
      display inline-block
      width 90%
  .headerimg
    height 200px
    width 100%
</style>