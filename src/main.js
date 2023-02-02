import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入仓库
import store from './store'
// 引入阿里字体图标
import '@/assets/icon.js'
// 引入MockServer.js——mock数据
import '@/mock/mockServer.js'
// 引入swiper样式
import 'swiper/css/swiper.css'
// 引入全部的api接口,方便之后在组件中直接调用,不用再单独引入
import * as API from '@/api/index.js'

// 引入组件并注册为全局组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'
import Carousel from '@/components/Carousel/Carousel.vue'
import Pagination from '@/components/Pagination/Pagination.vue'

// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
// 引入图片
import loadimage from '@/assets/images/1.gif'

// 引入表单校验插件
import '@/plugins/validate.js'

// 引入饿了吗组件库
import { MessageBox } from 'element-ui'
// ElementUI注册组件的时候,第二种写法:挂载到原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)

// 懒加载注册
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: loadimage
})

Vue.config.productionTip = false // 阻止vue在启动时生成生产提示

new Vue({
  // 注册路由：KV一致，省略V
  // 注册路由信息：此时组件身上都有$route,$router属性
  router,
  // 注册仓库:组件实例的身上会多一个$store属性
  store,
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  render: (h) => h(App)
}).$mount('#app')
