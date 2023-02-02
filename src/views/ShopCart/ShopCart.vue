<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked === 1" @click="stateChange(cart, $event)" />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <!-- 加减输入框 -->
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('sub', -1, cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="handler('mid', $event.target.value * 1, cart)" />
            <a href="javascript:void(0)" class="plus" @click="handler('add', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <button class="sindelet" @click="deleteCart(cart)">删除</button>
            <br />
            <button>移到收藏</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- 注意:在购物车为空时,全选状态不勾选 -->
        <input class="chooseAll" type="checkbox" id="cbFull" :checked="fullState && cartInfoList.length > 0" @click="fullChange" />
        <label for="cbFull">全选</label>
      </div>
      <div class="option">
        <button @click="deleteAllCart">删除选中的商品</button>
        <button>移到我的关注</button>
        <button>清除下柜商品</button>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{ totalNumber }}</span>
          件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// 按需引入
import throttle from 'lodash/throttle.js'
export default {
  name: 'ShopCart',
  mounted() {
    this.getData()
  },
  methods: {
    // 获取个人购物车数据
    getData() {
      this.$store.dispatch('cartList')
    },
    // 修改当前商品的选中状态
    async stateChange(cart, event) {
      // 带给服务器的参数,不是布尔值,是0/1
      let newState = event.target.checked ? 1 : 0
      try {
        await this.$store.dispatch('updateCheckedById', { skuId: cart.skuId, isChecked: newState })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 根据ID删除购物车某个产品
    async deleteCart(cart) {
      try {
        // 若删除成功,再次发请求获取新的数据进行展示
        await this.$store.dispatch('deleteCartById', cart.skuId)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改全选商品的状态
    async fullChange(event) {
      const newState = event.target.checked ? 1 : 0
      try {
        await this.$store.dispatch('updateAllCartChecked', newState)
        this.getData()
      } catch (error) {
        alert(error.message)
      }

      // const newState = event.target.checked
      // if (newState === false) {
      //   this.cartInfoList.forEach((item) => {
      //     item.isChecked = 0
      //   })
      // } else {
      //   this.cartInfoList.forEach((item) => {
      //     item.isChecked = 1
      //   })
      // }
    },
    // 修改某一个商品的个数
    handler: throttle(async function (type, disNum, cart) {
      // type:区分那个元素的点击事件
      // disNum:变化值/input最终值
      // cart:记录是哪一个产品【id】
      switch (type) {
        // 减号:需要判断数值是否小于一
        case 'sub':
          disNum = cart.skuNum > 1 ? -1 : 0
          break
        // 加号:直接传递1即可
        case 'add':
          disNum = 1
          break
        // 中间的输入值:需要判断输入值是否合法/负数,用当前值【整数】-原始值
        case 'mid':
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0
          } else {
            disNum = parseInt(disNum) - cart.skuNum
          }
          break
      }
      // 派发action:用到了detail仓库里的action
      try {
        // 修改成功:注意这里传递的参数是差值,与加入购物车传递的值不相同
        await this.$store.dispatch('addUpdateShopCart', { skuId: cart.skuId, skuNum: disNum })
        this.getData()
      } catch (error) {
        console.log(error.message)
      }
    }, 500),
    // 删除选中的商品
    async deleteAllCart() {
      try {
        await this.$store.dispatch('deleteAllCartById')
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    // 购物车数据再次简化
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    // 动态计算全选状态是true还是false
    fullState() {
      return this.cartInfoList.every((item) => item.isChecked === 1)
    },
    // 已勾选商品的总价格:先filter过滤,再reduce累加
    totalPrice() {
      return this.cartInfoList.filter((item) => item.isChecked === 1).reduce((total, item) => (total += item.skuPrice * item.skuNum), 0)
    },
    // 已勾选商品的总数量
    totalNumber() {
      return this.cartInfoList.filter((item) => item.isChecked === 1).reduce((t, item) => (t += item.skuNum), 0)
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          button {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      label {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      button {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
