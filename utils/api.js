/*
 * @Author: Lance Ma
 * @Date: 2019-12-10 11:27:37
 * @LastEditTime: 2020-05-24 17:07:04
 * @LastEditors: Please set LastEditors
 * @Description: 网络接口 配置
 * @FilePath: .\utils\api.js
 */
import request from './request'

const apis = {
  'getUDIUserInfo': 'getUDIUserInfo',
  "confirmUDIScopeAuth": 'confirmUDIScopeAuth',
  'job-index': 'job/index'
}

// 确认 统一授权登录
// export function confirmUDIScopeAuth (param) {
//   // requests.wxShowToast = false
//   return requests.requestGet(apis.confirmUDIScopeAuth, param)
// }

// // 获取 用户登录信息
// export function getUDIUserInfo (param) {
//   return requests.requestGet(apis.getUDIUserInfo, param)
// }

// 获取 用户 job index
export function getJobIndex (data) {
  return request('get', apis['job-index'], data)
}

