<template>
  <div class="nav-bar">
    <div class="nav-bar-wrap">
      <img src="./cnodejs_light.svg" alt="CNode" class="logo" width="120" height="28">
        <div class="info" @click="changeAboutMeShow"><i class="iconfont icon-about"></i></div>
        <div class="notification"><i class="iconfont icon-notification"></i></div>
        <div class="user"><i class="iconfont icon-user"></i></div>
    </div>
      <about-me v-show="isAboutMeShow"></about-me> <!--about-me 指代AboutMe组件,根据isAboutMeShow变量来决定是否显示-->
  </div>
</template>

<script type="text/ecmascript-6">
  import AboutMe from '../AboutMe/AboutMe'
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'isAboutMeShow'
      ])
    },
    methods: {
      changeAboutMeShow () {
        this.$store.dispatch('changeAboutMeShow')
      }
    },
    components: {
      AboutMe
    }
  }
</script>

<style>
  .nav-bar {
    width: 100%;
    height: 50px;
    background: #1F2D3D;
    padding: 10px;
  }

  /*屏幕宽度小于450px的设备*/
  @media screen and (max-width: 1200px){
    .nav-bar .nav-bar-wrap {
      width: 100%;
      margin: 0 auto;
    }
  }
  /*屏幕宽度大于1200px的设备*/
  @media screen and (min-width: 1200px){
    .nav-bar .nav-bar-wrap {
      width: 1200px;
      margin: 0 auto;
    }
  }
</style>
