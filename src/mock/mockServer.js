// 引入mockjs模块
import Mock from 'mockjs'
// 把json数据格式引入进来【webpack默认对外暴露json、图片数据格式,故不需要对外暴露】
import banner from '@/mock/banner.json'
import floor from '@/mock/floor.json'

// mock数据:第一个参数为请求地址,第二个参数为请求数据
// 提供广告位轮播数据的接口
Mock.mock('/mock/banner', { code: 200, data: banner })
// 提供所有楼层数据的接口
Mock.mock('/mock/floor', { code: 200, data: floor })
