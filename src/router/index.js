import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入路由组件
import Login from '@/views/Login/Login.vue'
import Search from '@/views/Search/Search.vue'
import Register from '@/views/Register/Register.vue'
import Detail from '@/views/Detail/Detail.vue'
import AddCartSuccess from '@/views/AddCartSuccess/AddCartSuccess.vue'
import ShopCart from '@/views/ShopCart/ShopCart.vue'
import Trade from '@/views/Trade/Trade.vue'
import Pay from '@/views/Pay/Pay.vue'
import PaySuccess from '@/views/PaySuccess/PaySuccess.vue'
import Center from '@/views/Center/Center.vue'

// 引入二级路由组件
import MyOrder from '@/views/Center/MyOrder/MyOrder.vue'
import GroupOrder from '@/views/Center/GroupOrder/GroupOrder.vue'

// 引入仓库store
import store from '@/store'

Vue.use(VueRouter)

// 路由规则
const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: () => import('@/views/Home/Home.vue'),
    meta: { show: true }
  },
  { path: '/search/:keyword?', component: Search, meta: { show: true }, name: 'search' },
  { path: '/login', component: Login, meta: { show: false } },
  { path: '/register', component: Register, meta: { show: false } },
  { path: '/detail/:id?', component: Detail, meta: { show: true } },
  { path: '/addcartsuccess', component: AddCartSuccess, meta: { show: true }, name: 'addcartsuccess' },
  { path: '/shopcart', component: ShopCart, meta: { show: true } },
  {
    path: '/trade',
    component: Trade,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 去交易页面,必须是从购物车【shopcart】而来
      if (from.path === '/shopcart') {
        next()
      } else {
        // 其他的路由组件而来,停留在当前
        next(false)
      }
    }
  },
  {
    path: '/pay',
    component: Pay,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  { path: '/paysuccess', component: PaySuccess, meta: { show: true } },
  {
    path: '/center',
    component: Center,
    meta: { show: true },
    redirect: '/center/myorder',
    // 二级路由组件
    children: [
      { path: 'myorder', component: MyOrder },
      { path: 'grouporder', component: GroupOrder }
    ]
  }
]

const router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  }
})

// 全局前置守卫：在路由跳转之前进行判断
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  // 此处用name来判断是否为false,不能用userMessage,因为空对象判断永远为真
  const userName = store.state.user.userMessage.name
  // 用户已经登录
  if (token) {
    // 登陆之后不可再回登陆/注册页面
    if (to.path === '/login' || to.path === '/register') {
      next(false)
    } else {
      // 登录&去其他页面,用户名存在,随意行走,否则,派发action获取用户信息
      if (userName) {
        next()
      } else {
        try {
          await store.dispatch('userInfo')
          next()
        } catch (error) {
          // 用户信息没有获取成功,token失效,回到登陆页面重新登陆,并且要清除用户信息及token
          await store.dispatch('userLoginOut')
          next('/login')
        }
      }
    }
  } else {
    // 未登录:不可去交易页面【trade】、支付页面【pay】、【paysuccess】、【个人中心】
    const toPath = to.path
    if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/paysuccess') !== -1 || toPath.indexOf('/center') !== -1) {
      next(`/login?redirect=${toPath}`)
    } else {
      // 去的不是上述路由【search、shopcart】放行！
      next()
    }
  }
})

// 记录原来的push、replace方法
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

// 重写push、replace
// 第一个参数：告诉原来的方法，你往哪里跳转及传递哪些参数
// 第二个参数：成功回调
// 第三个参数：失败回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
export default router
