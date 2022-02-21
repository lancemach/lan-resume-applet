/*
 * @Author: Lance Ma
 * @Date: 2019-12-02 15:15:21
 * @LastEditTime: 2020-05-24 16:15:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: .\utils\request.js     
 */

const lanceMa = getApp()
import config from '../config/default-config'
import storageSync from '../store/storage'
import { getDataType } from '../utils/util'
import routers from '../router/routers'

/**
 * 设置统一的异常 状态码
 */
const statusCodeCompatable = code => {
  const status = {
    200: '请求成功',
    400: '请求失败',
    401: '用户权限验证失败',
    403: '服务器拒绝请求',
    404: '请求不存在或已删除',
    405: '当前用户未登录',
    500: '服务器内部错误'
  }

  if (!Object.keys(status).includes(`${code}`)) {
    return '网络通信异常'
  }
  return `${code}：` + status[code]
}
  /**
   * 设置统一的异常处理
   */
const errorHandler = message => {
  const data = Object.assign({ title: '操作提示', icon: 'none' }, message)
  wx.showToast(data)
}

export default function request (method = 'GET', url = '', data = {}, header = { 'content-type': 'application/json' }) {
    const targetUrl = getDataType(url) === 'array' ? url.join('/')  : config.hostURL + url
    let toast = true
    if (data && data.toast === false) {
      toast = data.toast
      delete data.toast
    }
    const headerToken =  storageSync.get(config.headerToken) || ''
    if (headerToken) {
        header[config.headerToken] = headerToken
    }

    return new Promise((resolve, reject) => {
      wx.request({
        url: targetUrl,
				method: method,
				data: data,
				header: header,
        success (res) {
          if (res.statusCode !== 200) {
            //其它错误，提示用户错误信息
            if (toast === true) { errorHandler({ title: statusCodeCompatable(res.statusCode) || res.data}) }
            return reject(res)
          }

          const RefreshToken = res.header[config.headerToken] || null
          if (RefreshToken) {
            storageSync.set(config.headerToken, RefreshToken)
          }

          // 通信成功 数据结果异常 处理
          if (res.data[config.requesCode.keycode] !== config.requesCode.statusCode) {
            if (res.data[config.requesCode.keycode] === config.requesCode.loginOutCode) {
              const { unionId, openId } = storageSync.get('userInfo') || ''
              if (toast === true) { errorHandler({ title: res.data[config.requesCode.keyMsg] || res.errMsg}) }
              routers(config.loginName)
            }
            if (toast === true) { errorHandler({ title: res.data[config.requesCode.keyMsg] || res.errMsg}) }
            console.log(res.data[config.requesCode.keyMsg])
            return reject(res.data)
          }
          resolve(res.data)
        },
        fail (res) {
          if (toast === true) {
            errorHandler({ title: res.errMsg.includes(`fail`) === true ? statusCodeCompatable() : res.errMsg})
          }
          reject(res)
        }
      })
    })
}
