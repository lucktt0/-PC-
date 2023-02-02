<template>
  <div class="container">
    <Header></Header>
    <!-- 路由组件出口位置 -->
    <router-view></router-view>
    <!-- 在Home、Search显示，在Login、Register隐藏 -->
    <!-- 根据组件$route获取当前路由信息，通过path判断 -->
    <!-- <Footer v-show="this.$route.path === '/home' || this.$route.path === '/search'"></Footer> -->
    <!-- 配置路由时，添加路由元信息【meta】 -->
    <Footer v-show="this.$route.meta.show"></Footer>
  </div>
</template>
<script>
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'

export default {
  name: 'App',
  data() {
    return {}
  },
  components: {
    Header,
    Footer
  },
  methods: {},
  // 组件挂载完毕，向服务器发请求,将请求写至此处，性能更好，只会请求一次数据
  mounted() {
    // 通知vuex发请求,获取数据,存储于仓库中
    this.$store.dispatch('categoryList')
  }
}
</script>
<style lang="less" scoped></style>
