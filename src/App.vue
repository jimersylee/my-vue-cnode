<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
  import './common/style/icon.scss'
  import * as cookie from './common/utils/cookie'

  export default {
    name: 'app',
    created () {
      const token = cookie.getCookie('userToken')
      this.axios.post('https://cnodejs.org/api/v1/accessToken', token)
        .then(res => {
          if (res.data.success) {
            this.$store.dispatch()
          }
        })
    },
    mounted () {
      this.axios.post('https://cnodejs.org/api/v1/accesstoken', {accesstoken: 'aa0daae4-aae5-4793-b903-16c3bdef6738'})
        .then(res => {
          window.console.log(res)
        })
      window.console.log(this.$store)
    }
  }
</script>

<style lang="scss">
    @import "./common/style/base";
    //scss语法 导入css
    @import "./common/style/animation";
</style>
