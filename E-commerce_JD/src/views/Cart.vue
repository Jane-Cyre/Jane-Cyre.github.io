<template>
  <div>
    <div class="goods" v-for="(item, index) in cartarr" :key="index">
      <img :src="item.pic" alt="">
      <span class="title">{{item.title}}</span>
      <div class="goodsright">
        <!-- cube-ui的“移除图标” -->
        <i class="cubeic-remove" @click="removeCart(index)"></i>
        <span>{{item.cartCount}}</span>
        <!-- cube-ui的“添加图标” -->
        <i class="cubeic-add" @click="addCart(index)"></i>
      </div>
    </div>
    <!-- cube-button: CubeUI封装好的button按钮组件 -->
    <cube-button style="margin:10px 0;">下单</cube-button>
    <cube-button @click="clearcart">清空购物车</cube-button>
  </div>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    data() {
      return {
        // cartarr:[]  //由于已经将从vuex中获取到的cartarry赋值给cartarr了，所以data()中已经不需要再配置cartarr了
      }
    },
    computed: {
      //📌将数据从vuex中取出来使用
      ...mapState({       //📌为何要展开，因为mapState的返回结果是一个对象{key:value}的形式，所以要“展开取出”里面的key:value放入computed:{}中                                                              //        computed:{             
        cartarr:state => state.cartarry  //📌计算属性的“cartarr()方法的return返回值”再包一层“箭头函数的return返回值”，即return (return state.cartarry) ，即拿到state数据仓中的cartarry[]然后...展开至computed:{}中  =>   cartarr:cartarry   
      })                                                                                                                                                                                      //        }                
    },
    methods: {
      //减少商品
      removeCart(index){
        // this.cartarr[index].cartCount -= 1  //点击按钮数量-1  -(直接在组件中配置实现)
        //📌通过调用commit直接与mutations进行对话，从而实现在mutations中操作state.cartarry来实现购物车商品数量的“减1操作”  -(利用vuex实现)
        this.$store.commit('cartremove',index)
      },
      //增加商品
      addCart(index){
        // this.cartarr[index].cartCount += 1  //点击按钮数量+1  (直接在组件中配置实现) 
        //📌通过调用commit直接与mutations进行对话，从而实现在mutations中操作state.cartarry来实现购物车商品数量的“加1操作”  -(利用vuex实现)
        this.$store.commit('cartadd',index)
      },
      //清空购物车
      clearcart(){
        //📌通过调用commit直接与mutations进行对话，从而实现“清空购物车”功能
        this.$store.commit('clearcart')
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .goods
    padding 10px
    text-align left
    img
      width 80px
      vertical-align middle
    .title
      vertical-align middle
      margin-left 48%
      font-size 21px
    .goodsright
      float right
      margin-top 25px
      i
        font-size 18px
</style>