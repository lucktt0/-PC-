<template>
  <!-- 首页轮播图 -->
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carouse1 in list" :key="carouse1.id">
        <img :src="carouse1.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
<script>
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    list: {
      // 因为数据是由父亲传输的,不会发生变化,故需要立即监听
      immediate: true,
      handler() {
        // 只能监听到数据已经存在,但v-for动态渲染结构没有办法确定
        this.$nextTick(() => {
          const mySwiper = new Swiper(this.$refs.swiper, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              // 点击小球的时候也能切换图片
              clickable: true
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          })
        })
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
