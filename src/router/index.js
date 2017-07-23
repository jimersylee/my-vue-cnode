import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article/Article'
import Home from '../components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    // 首页路由
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // 文章路由
    {
      path: '/article/:id',
      name: 'article',
      component: Article
    }
  ]
})
