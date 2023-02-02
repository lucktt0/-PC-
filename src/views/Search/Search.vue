<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i @click="removecategoryName">×</i></li>
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">×</i></li>
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i @click="removetradeMark">×</i></li>
            <li class="with-x" v-for="(value, index) in searchParams.props" :key="index">{{ value.split(':')[1] }}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <!-- 排序 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a>综合<span v-show="isOne" class="iconfont" :class="{ 'icon-direction-down': down, 'icon-direction-up': up }"></span></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a>价格<span v-show="isTwo" class="iconfont" :class="{ 'icon-direction-down': down, 'icon-direction-up': up }"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 需要带着ID跳转到详情页面,故此处用到模板字符串,且to需要动态绑定参数 -->
                    <router-link :to="`/detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">{{ goods.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :total="total" :continues="5" :pageSize="searchParams.pageSize" @pageInfo="pageInfo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector'
export default {
  name: 'Search',
  components: {
    SearchSelector
  },
  data() {
    return {
      // 带给服务器的参数
      searchParams: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        keyword: '',
        // 排序,默认综合倒序
        order: '1:desc',
        pageNo: 1,
        pageSize: 10,
        // 平台售卖属性操作所带参数
        props: [],
        trademark: ''
      }
    }
  },
  // 组件挂载完毕之前,执行一次
  created() {
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  // 组件挂载完毕执行仅一次
  mounted() {
    this.getData()
  },
  computed: {
    // mapGetters里面的写法：传递的是数组,因为getters计算是没有划分模块的
    ...mapGetters(['goodsList']),
    // 获得仓库中的数据总数
    ...mapState({
      total: (state) => state.search.searchInfo.total
    }),
    isOne() {
      return this.searchParams.order.indexOf('1') !== -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') !== -1
    },
    down() {
      return this.searchParams.order.indexOf('desc') !== -1
    },
    up() {
      return this.searchParams.order.indexOf('asc') !== -1
    }
  },
  methods: {
    // 向服务器发请求获取search模块数据,根据参数不同返回不同的数据进行展示
    // 将请求封装为一个函数,在需要调用的时候调用即可
    getData() {
      this.$store.dispatch('searchInfo', this.searchParams)
    },
    // 删除面包屑分类的名字
    removecategoryName() {
      // 把带给服务器的数据置空, 还需要向服务器发起请求
      // 此处带给服务器的参数是可有可无的，故可以将属性值变为undefined, 该数据不会带给服务器,可提升性能
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.getData()
      // 地址栏也需要进行更改,只删除query,不删除params
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
      }
    },
    // 删除面包屑关键字
    removeKeyword() {
      this.searchParams.keyword = undefined
      this.getData()
      // 通知兄弟组件header清除关键字
      this.$bus.$emit('clear')
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.$route.query })
      }
    },
    // 自定义事件回调——整理品牌信息
    trademarkInfo(trademark) {
      // 整理品牌字段的参数   "ID:品牌名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      this.getData()
    },
    // 删除面包屑品牌信息
    removetradeMark() {
      this.searchParams.trademark = undefined
      this.getData()
    },
    // 自定义事件回调——整理平台售卖属性
    attrInfo(attr, valueList) {
      // 整理平台售卖属性    "[ID:属性值:属性名]"
      const props = `${attr.attrId}:${valueList}:${attr.attrName}`
      // 数组去重
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props)
      }
      this.getData()
    },
    // 删除面包屑平台售卖属性
    removeAttr(index) {
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    // 修改排序,flag代表用户点击的是综合【1】还是价格【2】
    changeOrder(flag) {
      // 记录原始值
      const origin = this.searchParams.order
      const originFlag = origin.split(':')[0]
      const originOrder = origin.split(':')[1]
      let newOrder = ''
      // 判断是否与初始值相同,相同切换排序;否则,切换排序名称且初始为倒序
      if (flag === originFlag) {
        newOrder = `${originFlag}:${originOrder === 'desc' ? 'asc' : 'desc'}`
      } else {
        newOrder = `${flag}:${'desc'}`
      }
      // 修改order的值,并且重新请求后台数据
      this.searchParams.order = newOrder
      this.getData()
    },
    // 分页器向服务器发送请求
    pageInfo(page) {
      // 整理发送给服务器的数据
      this.searchParams.pageNo = page
      // 再次发送请求
      this.getData()
    }
  },
  // 数据监听,监听组件实例身上的属性值变化
  watch: {
    // 监听路由的信息是否发生变化,若发生变化,再次发起请求
    $route() {
      // 再次发请求之前,清空之前的id值,但关键字与分类名不用清除,因为每一次路由变化,都会给予其新的值
      this.searchParams.category1Id = ''
      this.searchParams.category2Id = ''
      this.searchParams.category3Id = ''
      // 再次发请求之前,整理带给服务器的参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
