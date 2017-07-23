<template>
    <div class="content-wrap">
        <!--首页导航栏-->
        <div class="content-tab-wrap">
            <div class="content-tab">
                <a @click.prevent="changeTab('all')" href="/" :class="{'selected': selectedTab==='all'}">全部</a>
                <a @click.prevent="changeTab('good')" href="/" :class="{'selected': selectedTab === 'good'}">精华</a>
                <a @click.prevent="changeTab('share')" href="/" :class="{'selected': selectedTab === 'share'}">分享</a>
                <a @click.prevent="changeTab('ask')" href="/" :class="{'selected': selectedTab === 'ask'}">问答</a>
                <a @click.prevent="changeTab('job')" href="/" :class="{'selected': selectedTab === 'job'}">招聘</a>
                <a @click.prevent="changeTab('dev')" href="/" :class="{'selected': selectedTab === 'dev'}">客户端测试</a>
            </div>
        </div>
        <!--文章内容-->
        <div class="content" ref="content">
            <ul class="content-list">
                <li v-for="(item, idx) in articleLists" class="article">
                    <article-card :articleOverview="item"></article-card>
                </li>
            </ul>
            <div class="loading" v-show="isLoading">拼命加载中</div>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
  import ArticleCard from './ArticleCard' // 引用文章组件
  import { mapGetters } from 'vuex'

  export default{
    computed: {
      ...mapGetters([
        'selectedTab',
        'articleLists',
        'pageCount',
        'isLoading'
      ])
    },
    methods: {
      changeTab (tabType) {
        // 该函数负责发起API请求,并分发(dispatch)
        // 'changeTab' 'changeTabData'的action
        // 功能:转换tab主题,返回页面首部,并请求数据
        this.axios.get()
          .then(res => {
            this.$store.dispatch('changeTab', tabType)
            this.$store.dispatch('changeTabData', res.data.data)
          })
        // 使页面回到顶部
        this.$refs.content.scrollTop = 0
      },
      loadMoreData (tabType, pageCount) {
        // 功能: 实现页面滑动到底端时,动态加载后面的数据
        // 请求API接口,分发(dispatch)loadMoreData的action
        this.axios.get(`https://cnodejs.org/api/v1/topics/?tab=${tabType}&page=${pageCount}`).then(res => {
          this.$store.dispatch('loadMoreData', res.data.data)
        })
      }
    },
    // 页面创建后的事件
    // 功能: 请求首页数据
    // 当virtual dom创建完毕后,就开始向借口请求数据并初始化
    created () {
      this.axios.get('https://cnodejs.org/api/v1/topics/?tab=all&page=1')
        .then(res => {
          this.$store.dispatch('changeTab', 'all')
          this.$store.dispatch('changeTabData', res.data.data)
        })
    },
    mounted () {
      // 内容挂载后的事件
      // 通过scroll事件,监听页面的变化
      // 当offsetHeight-scrollTop <= 窗口高度 开始一部加载数据
      this.$refs.content.addEventListener('scroll', (e) => {
        if (!this.isLoading && e.target.scrollHeight - e.target.scrollTop <= e.target.offsetHeight) {
          // 对于手机端,仅仅通过高度差判断,且条件成立时,屏幕有可能孩子还在滑动,就会出发多次请求,为了解决这个问题,加入一个isLoading变量,来上锁,防止重复加载
          this.$store.dispatch('changeLoadingStatus')
          this.loadMoreData(this.selectedTab, this.pageCount)
        }
      })
    },
    components: {
      ArticleCard
    }
  }
</script>


<style lang="scss">
    .content-wrap {
        background-color: #EFF2F7;
        flex: 1;
        display: flex;
        position: relative;
        flex-direction: column;
        .content-tab-wrap {
            width: 100%;
            height: 36px;
            line-height: 36px;
            flex: 0 0 36px;
            position: absolute;
            z-index: 9999;
            top: 0;
            left: 0;
            background: #1F2D3D;
            color: #ffffff;
            border-top: 1px solid #475669;
            .content-tab {
                padding-left: 10px;
                a {
                    color: #ffffff;
                    text-decoration: none;
                    margin-right: 2px;
                    font-size: 14px;
                    padding: 2px 5px;
                    text-align: center;
                    &.selected {
                        background-color: #ffffff;
                        color: #1F2D3D;
                        border-radius: 5px;
                    }
                }
            }

            /*屏幕宽度小于450px的设备*/
            @media screen and (max-width: 1200px) {
                .content-tab {
                    width: 100%;
                    margin: 0 auto;
                }
            }
            /*屏幕宽度大于1200px的设备*/
            @media screen and (min-width: 1200px) {
                .content-tab {
                    width: 1200px;
                    margin: 0 auto;
                    padding-left: 0;
                }
            }
        }
        .content {
            flex: 1;
            width: 100%;
            overflow: scroll;
            -webkit-overflow-scrolling: touch;
            overflow-scrolling: touch;
            padding-top: 36px;
            .loading {
                width: 100%;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                background-color: #20a0ff;
                color: #ffffff;
                text-align: center;
            }
        }
    }

</style>
























