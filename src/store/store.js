/**
 * Created by jerryshen on 2017/7/12.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import content from './modules/content/content'
import article from './modules/article/article'
import navBar from './modules/navBar/navBar'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    content,
    article,
    navBar
  }
})
