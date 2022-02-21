/*
 * @Author: Lance Ma
 * @Date: 2020-03-31 11:10:12
 * @LastEditTime: 2020-05-06 22:34:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: .\wechat-applet\lancema-applet\utils\util.js
 */
const lanceMa = getApp()
import wxStorages from '../store/storage'

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 小程序跳转
export const navigateToMiniProgram = data => {
  const { appId, path, extraData } = data
  return new Promise((resolve, reject) => {
    wx.navigateToMiniProgram({
      appId,
      path,
      extraData,
      success(res) {
        resolve(res)
      },
      fail (e) {
        reject(e)
      }
    })
  })
}

// 显示转发页面 配置
export const setShowShareMenu = data => {
  return new Promise((resolve, reject) => {
    wx.showShareMenu({
      withShareTicket: true,
      success (res) {
        resolve(res)
      },
      fail (e) {
        reject(e)
      }
    })
  })
}

// 获取用户 登录凭证（code）
export const getUserCode = (app = lanceMa) => {
  wx.login({
    success (res) {
      const resCode = res.code
      if (resCode) {
        //发起网络请求
        app.globalData.weChatCode = resCode
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}

// 开启 Loading 状态
export const setLoadingStart = (that, delayTime = 5) => {
  const boole = true
  that.setData({ loadingStart: boole })
  lanceMa.globalData.loadingStart = boole
  setLoadingType(that, 'loading')
}

// 关闭 Loading 状态
export const setLoadingClose = (that, time = 460) => {
  const { isTitle, title } = that.data
  wx.hideNavigationBarLoading()
  wx.setNavigationBarTitle({ title: isTitle.enabled ? title + (isTitle.number ? '(' + isTitle.number + ')' : '') : title })

  setTimeout(() => {
    that.setData({ loadingStart: false })
    lanceMa.globalData.loadingType = ''
    lanceMa.globalData.loadingStart = false
  }, time)
}

// 设置 Loading 类型
export const setLoadingType = (that, type) => {
  setTimeout(() => {
    that.setData({ loadingType: type })
    lanceMa.globalData.loadingType = type
  }, 120)
}

export const getDataType = data => {  
  return Object.prototype.toString.call(data).replace(/\[object\s(.+)\]/, "$1").toLowerCase()
}

export const sleep = delay => new Promise((resolve) => setTimeout(resolve, delay))