// 对axios二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// start:进度条开始 //done:进度条结束

// 利用axios对象的方法create，去创建一个axios实例
const mockRequests = axios.create({
  // 基础路径，发送请求时，路径中出现api
  baseURL: '/mock',
  // 请求超时的时间是5s
  timeout: 5000
})

// 请求拦截器：在发送请求之前，请求拦截器可以检测到，在这之前做一些事情
mockRequests.interceptors.request.use((config) => {
  // 进度条开始
  nprogress.start()
  return config
})

// 响应拦截器
mockRequests.interceptors.response.use(
  // 成功的回调函数：服务器响应数据回来后，响应拦截器检测到之后，做一些业务逻辑处理
  (res) => {
    // 进度条结束
    nprogress.done()
    return res.data
  },
  // 响应失败的回调函数
  (error) => {
    return Promise.reject(new Error('fail'))
  }
)

export default mockRequests
