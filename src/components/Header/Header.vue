<template>
  <div class="header-container">
    <!-- 头部 -->
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p class="first-p">叮咛~</p>
            <p class="first-p">家居乐欢迎您！</p>
            <!-- 没有用户名：即未登录 -->
            <p v-if="!userName">
              <router-link to="/login">登录</router-link>
              <router-link to="/register" class="register">免费注册</router-link>
            </p>
            <!-- 登陆了 -->
            <p v-else>
              <a>{{ userName }}</a>
              <a class="register" @click="lgout">退出登录</a>
            </p>
          </div>
          <div class="typeList">
            <router-link to="/center/myorder">我的订单</router-link>
            <router-link to="/shopcart">我的购物车</router-link>
            <a href="###">我的家居</a>
            <a href="###">会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注家居乐</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <router-link class="logo" to="/home">
            <img src="./images/logo.jpg" alt="" />
          </router-link>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <span><img class="search-icon" src="./images/search.png" /></span>
            <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
            <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    // 搜索按钮的事件处理函数,用于跳转到search路由组件中
    goSearch() {
      // 路由传递参数
      // 第一种：字符串形式
      // this.$router.push('/search/' + this.keyword + '?k=' + this.keyword.toUpperCase())
      // 第二种：模板字符串
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      // 第三种：对象
      const location = { name: 'search', params: { keyword: this.keyword || undefined } }
      if (this.$route.query) {
        location.query = this.$route.query
      }
      this.$router.push(location)
    },
    // 退出登陆：
    // 1.发请求：通知服务器退出登录, 且清除一些数据【token,userInfo】
    // 2.路由跳转到首页
    async lgout() {
      try {
        await this.$store.dispatch('userLoginOut')
        this.$router.push('/home')
      } catch (error) {
        alert(error.message)
      }
    }
  },
  mounted() {
    this.$bus.$on('clear', () => {
      this.keyword = ''
    })
  },
  computed: {
    // 用户名信息
    userName() {
      return this.$store.state.user.userMessage.name
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  & > .top {
    background-color: #dcdcdc;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
        .first-p {
          color: #8b4513;
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 120px;
          margin: 6px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;
      position: relative;

      .searchForm {
        overflow: hidden;
        .search-icon {
          position: absolute;
          display: inline-block;
          top: 7px;
          right: 544px;
          width: 32px;
          height: 30px;
        }
        input {
          box-sizing: border-box;
          width: 590px;
          height: 42px;
          padding: 0px 54px;
          border: 2px solid #a0522d;
          border-radius: 100px;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 36px;
          width: 75px;
          background-color: #a0522d;
          border: none;
          color: #fff;
          position: absolute;
          top: 3px;
          right: 3px;
          cursor: pointer;
          border-radius: 100px;
          font-size: 14px;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
