<template>
  <div class="pagination-container">
    <button :disabled="pageNo === 1" @click="$emit('pageInfo', pageNo - 1)">上一页</button>

    <button v-if="startNumAndEndNum.start > 1" @click="$emit('pageInfo', 1)" :class="{ active: pageNo === 1 }">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 注意：此处vue2与vue3key的书写位置有区别,vue3写在template上 -->
    <template v-for="(page, index) in startNumAndEndNum.end">
      <button :key="index" v-if="page >= startNumAndEndNum.start" @click="$emit('pageInfo', page)" :class="{ active: pageNo === page }">{{ page }}</button>
    </template>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('pageInfo', totalPage)" :class="{ active: pageNo === totalPage }">{{ totalPage }}</button>

    <button :disabled="pageNo === totalPage" @click="this.$emit('pageInfo', pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }}条</button>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'total', 'continues', 'pageSize'],
  computed: {
    // 计算出总页数
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算出连续的页码的起始数字与结束数字
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this
      // 定义两个变量存储起始数字与结束数字
      let start = 0
      let end = 0
      // 总页码数没有连续页码数多
      if (totalPage < continues) {
        start = 1
        end = totalPage
      } else {
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
      }
      // 纠正start与end的超出正常值的情况
      if (start < 1) {
        start = 1
        end = continues
      }
      if (end > totalPage) {
        start = totalPage - continues + 1
        end = totalPage
      }
      return { start, end }
    }
  }
}
</script>
<style lang="less" scoped>
.pagination-container {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #dab6a6;
      color: #fff;
    }
  }
}
</style>
