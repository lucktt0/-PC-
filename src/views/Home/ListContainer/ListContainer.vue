<template>
  <!--列表-->
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <Carousel :list="bannerList" />
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">家居乐快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li><span class="bold">特惠</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">公告</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">特惠</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">公告</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">特惠</span>备战开学季 全民半价购数码</li>
          </ul>
        </div>
        <div class="main-news-top-money">
          <ul>
            <li>
              <a href="">
                <i>
                  <!--单元格里的图片-->
                  <svg class="iconfont svg-news" aria-hidden="true">
                    <use xlink:href="#icon-jipiao"></use>
                  </svg>
                </i>
                <span>机票</span>
              </a>
            </li>
            <li>
              <a href="">
                <i>
                  <!--单元格里的图片-->
                  <svg class="iconfont svg-news" aria-hidden="true">
                    <use xlink:href="#icon-huochepiao"></use>
                  </svg>
                </i>
                <span>火车票</span>
              </a>
            </li>
            <li>
              <a href="">
                <i>
                  <!--单元格里的图片-->
                  <svg class="iconfont svg-news" aria-hidden="true">
                    <use xlink:href="#icon-ziyuan"></use>
                  </svg>
                </i>
                <span>话费</span>
              </a>
            </li>
            <li>
              <a href="">
                <i>
                  <svg class="iconfont svg-news" aria-hidden="true">
                    <use xlink:href="#icon-chushoulipinka"></use>
                  </svg>
                </i>
                <!--单元格里的图片-->
                <span>礼品卡</span>
              </a>
            </li>
            <li>
              <a href="">
                <i>
                  <svg class="iconfont svg-news" aria-hidden="true">
                    <use xlink:href="#icon-wodeqiye"></use>
                  </svg>
                </i>
                <!--单元格里的图片-->
                <span>企业</span>
              </a>
            </li>
            <li>
              <a href="">
                <i>
                  <svg class="iconfont svg-news" aria-hidden="true">
                    <use xlink:href="#icon-wujin"></use>
                  </svg>
                </i>
                <span>五金</span>
              </a>
            </li>
            <li>
              <a href="">
                <i>
                  <svg class="iconfont svg-news" aria-hidden="true">
                    <use xlink:href="#icon-jiayouka"></use>
                  </svg>
                </i>
                <!--单元格里的图片-->
                <span>加油卡</span>
              </a>
            </li>
            <li>
              <a href="">
                <i>
                  <svg class="iconfont svg-news" aria-hidden="true">
                    <use
                      xlink:href="#icon-tubiao_dianzhuzhongchou-zhongchoupiaoju
"
                    ></use>
                  </svg>
                </i>
                <!--单元格里的图片-->
                <span>众筹</span>
              </a>
            </li>
            <li>
              <a href="">
                <i>
                  <svg class="iconfont svg-news" aria-hidden="true">
                    <use xlink:href="#icon-jiudian"></use>
                  </svg>
                </i>
                <!--单元格里的图片-->
                <span>酒店</span>
              </a>
            </li>
            <li>
              <a href="">
                <i>
                  <svg class="iconfont svg-news" aria-hidden="true">
                    <use xlink:href="#icon-youxi"></use>
                  </svg>
                </i>
                <!--单元格里的图片-->
                <span>游戏</span>
              </a>
            </li>
            <li>
              <a href="">
                <i>
                  <svg class="iconfont svg-news" aria-hidden="true">
                    <use xlink:href="#icon--dianyingpiao-"></use>
                  </svg>
                </i>
                <!--单元格里的图片-->
                <span>电影票</span>
              </a>
            </li>
            <li>
              <a href="">
                <i>
                  <svg class="iconfont svg-news" aria-hidden="true">
                    <use xlink:href="#icon-baitiaoshanfu"></use>
                  </svg>
                </i>
                <!--单元格里的图片-->
                <span>白条闪付</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'ListContainer',
  data() {
    return {}
  },
  methods: {},
  mounted() {
    // 派发action：告知vuex发起ajax请求,将数据存储在仓库中
    this.$store.dispatch('bannerList')
    // 在new Swiper实例之前,必须得有页面中结构,但放在mounted中不行,因为v-for需要根据异步返回的数据重新渲染页面结构
  },
  computed: {
    ...mapState({
      // 注入一个参数state,其为大仓库中的数据
      bannerList: (state) => state.home.bannerList
    })
  }
  // watch: {
  //   // 定义对象格式的侦听器,监听bannerList数据的变化
  //   bannerList: {
  //     // 若执行handler方法,代表组件实例上的属性值已经发生变化(无——>有)
  //     // 但只能保证bannerList数据已经有了,但无法确定v-for已经执行结束,即结构渲染完毕
  //     // nextTick:在下次DOM更新循环结束之后,执行延迟回调。在修改数据之后,立即使用该方法,获取更新后的DOM
  //     handler(newVal, oldVal) {
  //       this.$nextTick(() => {
  //         const mySwiper = new Swiper(this.$refs.mySwiper, {
  //           loop: true, // 循环模式选项
  //           // 如果需要分页器
  //           pagination: {
  //             el: '.swiper-pagination',
  //             // 点击小球的时候也能切换图片
  //             clickable: true
  //           },
  //           // 如果需要前进后退按钮
  //           navigation: {
  //             nextEl: '.swiper-button-next',
  //             prevEl: '.swiper-button-prev'
  //           }
  //         })
  //       })
  //     }
  //   }
  // }
}
</script>
<style lang="less" scoped>
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
    }

    .right {
      float: left;
      width: 248px;
      .main-news-top-money {
        border-left: 1px dotted #e8e8e8;
        overflow: hidden;
        ul {
          width: 248px;
          li {
            width: 61px;
            height: 64px;
            border: 1px dotted #e8e8e8;
            float: left;
            border-bottom: 0; /* 将每个单元格的下边框去掉*/
            margin-left: -1px; /* 整体向左移动一个单位，因为边框重合了*/
            a {
              display: block;
              width: 61px;
              height: 30px;
              padding-top: 40px;
              text-align: center;
              line-height: 30px;
              position: relative;
              i {
                position: absolute;
                top: 8px;
                left: 10px;
                .svg-news {
                  width: 38px;
                  height: 30px;
                  opacity: 0.8;
                  &:hover {
                    width: 40px;
                    height: 32px;
                    opacity: 1;
                  }
                }
              }
            }
          }
        }
      }
      .news {
        border-top: 1px solid #e8e8e8;
        border-right: 1px dotted #e8e8e8;
        border-left: 1px dotted #e8e8e8;

        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e8e8e8;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;

          .bold {
            font-weight: 550;
            display: inline-block;
            width: 38px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            margin-right: 4px;
            color: #c81623;
            background-color: #fdeeed;
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
