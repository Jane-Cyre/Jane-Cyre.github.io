import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store =  new Vuex.Store({

  //📌state-存储变量的数据仓库    存token
  state: {
    token:'',
    //📌如果本地存储localStorage中有经过用户的添加或减少所保存的“商品信息”，则刷新页面后“读取”本地存储，否则，购物车商品为空
    cartarry: JSON.parse(localStorage.getItem('cartarry')) || []  //存储购物车商品的数组    
  },

  //📌mutations-通过一些方法去操作state中的数据，属于-“同步操作”
  mutations: {

    //设置vuex的token
    settoken(state,token){   //该token为this.$store.commit中从登录接口响应返回的result.data.token(即用户成功登录以后加密生成的token令牌)
      state.token = token   //将待会传入的token的值保存到state数据仓中
    },

    //添加商品到购物车
    tocart(state,tag){
      //📌判断从“分类”页(List.vue)中添加的商品的名称tag.label与“购物车”(Cart.vue)中的商品的名称是否相等（cartarry一开始肯定是空数组，所以一开始肯定执行else语句向cartarry中push了某个商品，那么此时cartarry就不是空数组了，而是[{title:tag.label,cartCount:1}]），后续再“添加商品到购物车”，就可以明显地判断 element.title == tag.label是否成立了
      //将array.find(callback())返回的数组中满足回调的第一个元素的值赋值于goods
      let goods = state.cartarry.find(element => element.title == tag.label) 
      if(goods){
        //如果存在名称相等的那项商品，则让该商品数量+1
        goods.cartCount += 1
      }else{
        //否则，向cartarry数组中添加用户所点击的那个商品
        state.cartarry.push({title:tag.label,cartCount:1,pic:tag.image})
      }
    },

    //购物车商品数量加一
    cartadd(state,index){  //index-标识执行加一操作的商品的“索引”
      //用户每点击一次某个商品的“+按钮”，购物车中的那个商品的数目就“加1”
      state.cartarry[index].cartCount++
    },

    //购物车商品数量减一
    cartremove(state,index){
      //用户每点击一次某个商品的“-按钮”，购物车中的那个商品的数目就“减1”
      if(state.cartarry[index].cartCount > 1){
        //如果该商品数目大于1，则数量可以减一
        state.cartarry[index].cartCount--
      }else{
        //📌否则window弹窗询问是否移除该商品？如需要移除，则调用array的splice方法从数组中的指定位置移除对应的商品
        if(window.confirm('确定从购物车移除商品吗？')){
          state.cartarry.splice(index, 1)
        }
      }
    },

    //清空购物车
    clearcart(state){
      state.cartarry = []
    }

  },

  //📌提交mutation，异步操作
  actions: {

  },

  //📌类似于computed计算属性的简写形式，将方法中的结果以返回值的形式传递
  getters:{
    //定义countsum方法用于将购物车商品的条数随着用户点击增加按钮之后，也会随之加1
    countsum:state => {
      let num = 0
      //对于cartarry中的元素{title:tag.label,cartCount:1}，每遍历一个，num就加1，使得(购物车Cart.vue)待会获取到的值是
      state.cartarry.forEach(element => num += element.cartCount)
      //📌countsum的值就是这个num，Botnav.vue中会通过...mapGetters(['countsum'])从vuex中拿到该值放在该组件的模板的<span>标签中动态地渲染至页面
      return num
    }
  }

})

//监听在每次调用mutations时，都会先进入“store的subscribe这个方法”，然后我们可以在这个方法内执行一些自己想要的处理
store.subscribe((mutations,state) => {
  //把数据存储到本地localStorage中
  localStorage.setItem('cartarry',JSON.stringify(state.cartarry))
})

export default store
