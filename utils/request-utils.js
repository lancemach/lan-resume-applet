/*
 * @Author: Lance Ma
 * @Date: 2019-12-09 20:29:29
 * @LastEditTime: 2020-05-27 11:41:46
 * @LastEditors: Please set LastEditors
 * @Description: 通用资源请求方法库
 * @FilePath: .\utils\request-utils.js
 */

import { getUserInfo, getAppQRCode } from './api'
// import wxStorages from '../store/storage'

// 获取 用户 OpenID
export const getUserInfoData = () => {
  // 登录
  wx.login({
    success(res) {
      console.log('login', res)
      const code = res.code
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      if (code) {
        wx.getUserInfo({
          withCredentials: true,
          lang: 'zh_CN',
          success(res) {
            console.log('getUserInfo', res)
            wx.checkSession({
              success () {
                //session_key 未过期，并且在本生命周期一直有效
                getUserInfo({
                  code,
                  encryptedData: res.encryptedData,
                  iv: res.iv
                }).then(res => {
                  
                })
              },
              fail () {
                // session_key 已经失效，需要重新执行登录流程
                getUserInfo({
                  code,
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  access_token: false
                }).then(res => {
                  
                })
              }
            })
          },
          fail(e) {
            console.log(e)
          }
        })
      }
    }
  })
}
// export const getAppQRCodeData = () => {
//   wx.checkSession({
//     success () {
//       //session_key 未过期，并且在本生命周期一直有效
//       getAppQRCode().then(res => {
        
//       })
//     },
//     fail () {
//       // session_key 已经失效，需要重新执行登录流程
//       getAppQRCode({ access_token: false }).then(res => {
        
//       })
//     }
//   })
// }