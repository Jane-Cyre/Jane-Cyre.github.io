<template>
<!-- 面板盒子 -->
  <div class="panelsbox">
    <!-- 左边的滚动 -->
    <cube-scroll class="leftpanels">
      <ul>
        <!-- 遍历“分类标签页”左边“分类项”的数据，list-左边栏的每一个分类项，tabslabel-整个分类标签页 -->
        <!-- 1.selectlist(index)点击左边的分类项时，将通过“路由导航的方式”(跳转)呈现右边的页面 -->
        <!-- 2.active，当某一个分类项标签被鼠标选中(true)时，类名变为active，否则:class=''(无类名) -->
        <li v-for="(list,index) in tabslabel" :key="index" @click="selectlist(index)" :class="list.active?'active':''">
          {{list.label}}
        </li>
      </ul>
    </cube-scroll>
    <!-- 右边的滚动 -->
    <cube-scroll class="rightpanels">
      <ul>
        <!-- 所遍历的每一个li中的每一个tag都对应着一个唯一的被标识的索引index -->
        <li v-for="(tag,index) in tags" :key="index">
          <img :src="tag.image" alt="">
          <!-- 在点击事件中传入 $event事件对象 和 数据tag 两个参数（实现动画效果要用到❓） -->
          <p>{{tag.label}} <i class="cubeic-add" @click="addtocart($event,tag)"></i></p>
        </li>
      </ul>
    </cube-scroll>
    <!-- 添加商品掉入购物车-动画 -->
    <div class="ball-wrap">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @afterEnter="afterEnter"
      >
        <div class="ball" v-if="ball.show">
          <div class="inner">
            <i class="cubeic-add">

            </i>
          </div>
        </div> 
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ball:{
          //球刚开始不显示
          show:false,
          //获取球的DOM
          el:''
        },
        tags:[],
        tabslabel:[
          {
              label:'热门推荐',
              active:true
          },
          {
              label:'手机数码',
              active:false
          },
          {
              label:'家用电器',
              active:false
          },
          {
              label:'电脑办公',
              active:false
          },
          {
              label:'家居厨具',
              active:false
          },
          {
              label:'家具家装',
              active:false
          },
          {
              label:'美妆护肤',
              active:false
          },
          {
              label:'医药保健',
              active:false
          },
          {
              label:'钟表珠宝',
              active:false
          },
          {
              label:'计生情趣',
              active:false
          },
          {
              label:'生活旅行',
              active:false
          },
          {
              label:'国际名牌',
              active:false
          },
        ]
      }
    },
    methods: {
      //点击左侧分类
      selectlist(index){
        //ind-forEach在遍历数组时为每一个元素所指定的索引
        this.tabslabel.forEach((element,ind) => {
          //将forEach所遍历到的分类标签中每一个被指定了ind的标签分别一个一个地与当前鼠标所点击的通过v-for所遍历出来的被指定了index的标签做比较（多对一比较）
          if(index == ind){
            //如果当前所处理的元素的索引ind == 当前所点击的li标签所对应的索引值index，设置该元素active为true(.active样式生效)
            element.active = true
            //同时，调用getclassify()方法“发送axios网络请求”获取当前鼠标所选中标签对应的页面内容
            this.getclassify(index)
          }else{
            //否则，设置该元素active为false(.active样式不生效)
            element.active = false
          }
        })
      },

      //获取分类的方法
      async getclassify(index){
        //向分类页的分类接口发送axios网络请求，并将获取到的“值”赋值给变量result
        const result = await this.$http.get('/api/classify',{params:{type:index}})
        //将获取到的值中的data[···]数组更新替换掉上面的tags:[]
        this.tags = result.data
      },

      //📌将商品数据存入vuex中（即：添加商品到购物车❗）
      addtocart(e,tag){
        this.$store.commit('tocart',tag)
        //添加商品的一瞬间，让小球显示
        this.ball.show = true
        //获取点击的元素e.target
        this.ball.el = e.target
      },

      beforeEnter(el){
            //让小球移动到点击的位置
            //获取点击位置
            const dom=this.ball.el
            console.log(dom)
            const rect=dom.getBoundingClientRect()//获取点击的dom的位置
            console.log(rect)
            const x=rect.left-window.innerWidth*0.7
            const y=-(window.innerHeight-rect.top)
            console.log(x,y)
            el.style.display='block'
            el.style.transform=`translate3d(0,${y}px,0)`
            const inner=el.querySelector('.inner')
            inner.style.transform=`translate3d(${x}px,0,0)`
        },
        enter(el,done){
            //触发重绘
            document.body.offsetHeight
            //小球移动回到原点，就是购物车的位置
             el.style.transform=`translate3d(0,0,0)`
             const inner=el.querySelector('.inner')
            inner.style.transform=`translate3d(0,0,0)`
            //过渡完成后执行的事件
            el.addEventListener('transitionend',done)
        },
        afterEnter(el){
            //结束隐藏小球
            this.ball.show=false
            el.style.display='none'
        }
    },

    //当created钩子被调用时(也就是数据初始化时)，调用👆的getclassify(index)方法向接口发送网络请求
    created() {
      //根据索引值index获取默认的分类数据
      this.getclassify(0)
    },

    //挂载之后，可以进行一系列的DOM操作了
    mounted() {
      const leftpanels = document.querySelector('.leftpanels')
      const rightpanels = document.querySelector('.rightpanels')
      //document.documentElement.clientHeight -> 获取当前已挂载的页面的“可视高度”（也就是手机屏幕的高度）
      const bodyheight = document.documentElement.clientHeight
      //设置左边的cube-scroll的高度
      leftpanels.style.height = bodyheight - 57 + 'px'
      //设置右边的cube-scroll的高度
      rightpanels.style.height = bodyheight - 57 + 'px'
    },
  }
</script>

<style lang="stylus" scoped>
  .panelsbox
    display flex
    .leftpanels
      width 30%
      li
        height 50px
        line-height 50px
        border-bottom 1px solid #fff
        color #333
        background #f8f8f8
        font-size 14px
      .active
        background #fff
        color #CD5C5C
  .rightpanels
    width 70%
    ul
      display flex
      flex-wrap  wrap
      li
        width 50%
        justify-content center
        align-items center
        font-size 15px
        img 
            width 80px
            height  80px
          .cubeic-add
            font-size 18px
  .ball-wrap
    .ball
      position fixed
      left 70%
      bottom 10px
      z-index 1003
      color red
      transition all 1s cubic-bezier(0.49,-0.29,0.75,0.41)
      .inner
        width 16px
        height 16px
        transition all 1s linear  
</style>
