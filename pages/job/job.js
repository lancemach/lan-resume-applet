/*
 * @Author: Lance Ma
 * @Date: 2020-03-31 11:10:12
 * @LastEditTime: 2021-03-04 20:24:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: .\pages\job\job.js
 */
// pages/job/job.js
const lancema = getApp()

import { setShowShareMenu, navigateToMiniProgram, sleep, setLoadingClose } from '../../utils/util'
import config from '../../config/default-config'
import { getJobIndex } from '../../utils/api'

Page({
  data: {
    config,
    uid: 0,
    loadingStart: true,
    loadingType: '',
    loadingText: '简历',
    title: 'LANCE MA RESUME',
    isTitle: {
      enabled: true
    },
    resume: [
      {
        id: 'index'
      },
      {
        id: 'basics'
      },
      {
        id: 'skill'
      },
      {
        id: 'case'
      },
      {
        id: 'thanks'
      }
    ],
    pager: {
      current: 0,
      total: 0,
      id: 'index'
    },
    gradientColor: {
      '0%': '#4AD18B',
      '100%': '#0B7FF4'
    },
    motto: 'Hello World'
  },
  onLoad (options) {
    const { loadingStart, isTitle } = this.data
    const uid = options.uid || this.data.uid
    console.log('参数：uid', uid)
    getJobIndex({ uid: uid }).then(res => {
      const resume = res[config.requesCode.keyData]
      if (resume) {
        this.setData({ resume: resume })
        if (loadingStart) {
          setLoadingClose(this)
        }
      }
    }).catch(e => console.log(e))
    setShowShareMenu()
    this.bindchange()
  },
  bindchange (data = 0) {
    const current = data.detail ? data.detail.current : 0
    const total = this.data.resume.length - 1 || 0
    const currentItemId = data.detail ? data.detail.currentItemId : 'index'
    this.setData({
      'pager.current': current || 0,
      'pager.total': total,
      'pager.id': currentItemId
    })
  },
  bindNavigateToWApplet ({ currentTarget }) {
    const { appid } = currentTarget.dataset || 0
    if (!appid) {
      return
    }
    navigateToMiniProgram({ appId: appid }).then(res => {
      console.log(res)
    }).catch(e => {
      console.log(e)
    })
  },
  bindPreviewImage ({ currentTarget }) {
    const { image } = currentTarget.dataset || 0
    if (!image) {
      return
    }
    console.log(image)
    wx.previewImage({
      current: image, // 当前显示图片的http链接
      urls: [image] // 需要预览的图片http链接列表
    })
  },
  onShareAppMessage () {
    const pages = getCurrentPages()
    const path = pages[pages.length-1].route
    const { uid, resume } = this.data
    return {
     title: resume[1].info.name  + '的简历',
    //  desc: '分享页面的内容',
     path: path + '?uid=' + uid // 路径，传递参数到指定页面。
    }
   }
})