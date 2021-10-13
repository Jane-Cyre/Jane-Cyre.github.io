<template>
  <div id="index">
    <!-- 轮播图 -->
    <cube-slide ref="slide" :data="items" @change="changePage">
      <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
        <div class="banner-box">
          <a :href="item.url">
            <!-- v-for所遍历的每一张轮播图图片 -->
            <!-- :src动态指定图片的资源地址(https://···) -->
            <img class="banner" :src="item.image">
          </a>
        </div>
      </cube-slide-item>
    </cube-slide>
    <!-- 滚动分类 -->
     <cube-slide ref="slidelists" :auto-play="false" :data="lists">
      <cube-slide-item v-for="(list, index) in lists" :key="index">
        <ul class="listul">
          <li class="listli" v-for="(item, index1) in list" :key="index1">
            <div class="brand-box">
              <!-- 📌该href属性是从接口获取到的，所以所指定超链接目标的URL地址必须动态获取 -->
              <a :href="item.url">
                <img :src="item.image" alt="">
              </a>
            </div>
            <p>{{item.label}}</p>
          </li>
        </ul>
      </cube-slide-item>
    </cube-slide>
  </div>  
</template>

<script>
  export default {
    name:'Index',
  data() {
    return {
      items: [], //轮播图数组
      lists: []  //滚动分类数组
    }
  },
  methods: {
    changePage(current) {
      // console.log('当前轮播图序号为:' + current)
    },
    clickHandler(item, index) {
      // console.log(item, index)
    }
  },
  //created钩子->在页面初始化&注入响应式之后，此时已经可以访问到data中的数据和methods中的方法了
  //发送网络请求是个异步任务，使用async和await配合执行该异步任务
  async created(){
    try{
      //获取轮播图数据
      const items = await this.$http.get('/api/banner')  //只获取数据，不需要传入什么参数
      this.items = items.data  //将从vue.config.js下的“首页轮播图数据接口”获取到的数据赋值给data()中的items[]数组(即，后者那个数组替换前者那个空数组) 

      //获取滚动分类数据
      const lists = await this.$http.get('/api/rollinglist')
      this.lists = lists.data
    }catch(err){
      console.log(err)
    }
  },
}
</script>

<style lang="stylus" scoped>
  #index
    .banner-box
      width 375px
      height 220px
      a
        .banner
          display block
          width: auto
          height: auto
          max-width 100%
          max-height 103%
    .listul
      display flex
      flex-wrap wrap
      .listli
        width 20%
        justify-content center
        margin-bottom 14px
        margin-top 5px
      .brand-box
        width 45px
        height 45px
        img
          max-width 100%
          max-height 100%
          border-radius 50%
          margin-left: 14px
          margin-top: 4px
      p
        font-size 13px
        padding-top 10px
</style>