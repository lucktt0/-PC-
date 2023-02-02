<template>
  <div class="home-container">
    <!-- 三级联动--全局组件--不需再引入注册 -->
    <TypeNav />
    <!-- 轮播图+新闻快讯 -->
    <ListContainer />
    <!-- 今日推荐 -->
    <Recommend />
    <!-- 商品排名 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!-- 楼层*2 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <!-- 商家图标 -->
    <Brand />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ListContainer from '@/views/Home/ListContainer/ListContainer.vue'
import Recommend from '@/views/Home/Recommend/Recommend.vue'
import Rank from '@/views/Home/Rank/Rank.vue'
import Like from '@/views/Home/Like/Like.vue'
import Floor from '@/views/Home/Floor/Floor.vue'
import Brand from '@/views/Home/Brand/Brand.vue'
export default {
  name: 'Home',
  data() {
    return {}
  },
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  methods: {},
  mounted() {
    // 派发action：告知vuex发起ajax请求,将数据存储在仓库中
    this.$store.dispatch('floorList')
    // 派发action:登陆成功后,携带令牌token去请求用户信息
    this.$store.dispatch('userInfo')
  },
  computed: {
    ...mapState({
      // 注入一个参数state,其为大仓库中的数据
      floorList: (state) => state.home.floorList
    })
  }
}
</script>
<style lang="less" scoped></style>
