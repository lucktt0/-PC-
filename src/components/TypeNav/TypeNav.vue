<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 通过mouseenter/mouserleave实现全部商品分类的显示与隐藏 -->
      <div @mouseleave="leaveIndex" @mouseenter="entershow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <!-- v-show=show完成在主页显示，在search不显示 -->
          <div class="sort" v-show="show">
            <!-- 父亲绑定事件goSearch，实现事件委托 -->
            <div class="all-sort-list2" @click="goSearch">
              <div class="item bo" v-for="(c1, index) in categoryList" :key="c1.categoryId" :class="{ cur: currentindex === index }">
                <h3 @mouseenter="changeIndex(index)">
                  <!-- 给a标签加自定义属性data-categoryName，以及data-category1Id -->
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <!-- 二三级菜单 -->
                <div class="item-list clearfix" :style="{ display: currentindex === index ? 'block' : 'none' }">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// 引入lodash:全部功能函数引入
// import _ from 'lodash'
// 按需引入
import throttle from 'lodash/throttle.js'

export default {
  name: 'TypeNav',
  data() {
    return {
      // 存储用户鼠标移到哪个一级分类
      currentindex: -1,
      // 是否展示三级联动
      show: true
    }
  },
  methods: {
    // 鼠标进入修改响应式数据currentindex属性,此处用到节流,注意不要用箭头函数，存在this指向问题
    changeIndex: throttle(function (index) {
      this.currentindex = index
    }, 50),
    // 鼠标离开,不显示search页面的typenav组件
    leaveIndex() {
      this.currentindex = -1
      if (this.$route.path !== '/home') {
        this.show = false
      }
    },
    // 鼠标进入
    entershow() {
      this.show = true
    },
    // 三级联动路由跳转及传参
    goSearch(event) {
      // 获取事件委托中当前点击的节点元素
      const element = event.target
      // 给a标签加自定义属性data-categoryName,给一二级标签加data-categoryId
      // 节点的dataset属性，可获取节点的自定义属性与属性值
      const { categoryname, category1id, category2id, category3id } = element.dataset
      if (categoryname) {
        const location = { name: 'search' }
        const query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        // 整理参数
        location.query = query
        // 如果路由跳转时,有params参数,要将其添加
        if (this.$route.params) {
          location.params = this.$route.params
        }
        // 路由跳转
        this.$router.push(location)
      }
    }
  },
  // 组件挂载完毕，向服务器发请求
  mounted() {
    // 当进入search页面，会再次挂载，若挂载页面不是home,则会隐藏
    if (this.$route.path !== '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      // 注入一个参数state,其为大仓库中的数据
      categoryList: (state) => state.home.categoryList
    })
  }
}
</script>
<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #a0522d;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #a0522d;
      line-height: 45px;
      text-align: center;
      color: #f5f5f5;
      font-size: 16px;
      font-weight: 550;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #dab6a6;
      z-index: 999;

      .all-sort-list2 {
        padding-top: 2px;
        .cur {
          background-color: whitesmoke;
        }
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            //display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }
    // 过渡动画的样式
    // 过渡动画进入之前的初始状态
    .sort-enter {
      height: 0px;
    }
    // 过渡动画进入之后的结束状态
    .sort-enter-to {
      height: 461px;
    }
    // 动画进入的时间段
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
