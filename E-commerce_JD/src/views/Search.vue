<template>
  <van-search
    v-model="value"
    shape="round"
    background="#c66"
    placeholder="搜索商品"
    @search="onSearch"
    input-align="center"
  />
</template>

<script>
  import { Toast } from 'vant'
  export default {
    data() {
      return {
        value:'',
      }
    },
    methods: {
      onSearch(){
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
        })
      },
    }
  }
</script>

<style lang="stylus" scoped>

</style>