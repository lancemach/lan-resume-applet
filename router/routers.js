/*
 * @Author: Lance Ma
 * @Date: 2020-03-16 16:02:00
 * @LastEditTime: 2020-05-24 20:09:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: .\router\routers.js
 */

import pagesURL from '../config/page-urls'
import { getDataType } from '../utils/util'

const except = ['start']

const routers = (data = '', type = 'navigateTo') => {
    const pages = getCurrentPages()
    const fromRoute = pages[pages.length-1].route

    if (!data) {
        return console.error('当前跳转页面参数错误！')
    }
    if (type === 'navigateBack') {
        wx.navigateBack({
            delta: data,
            success (res) {
                
            },
            fail (err) {

            }
        })
    } else {

        const toRoute = getDataType(data) === 'string' ? pagesURL(data) : pagesURL(data[0]) + data[1]

        if ('/' + fromRoute === toRoute) {
            return console.warn('当前跳转页面无需重复跳转！')
        }
        if (! toRoute) {
            return console.error('当前跳转页面地址错误！')
        }

        wx[type]({
            url: toRoute,
            events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                // acceptDataFromOpenedPage (acceptData = {}) {
                //     console.log(acceptData)
                // }
            },
            success (res) {
                // 通过eventChannel向被打开页面传送数据
                const resData = {}
                // res.eventChannel.emit('acceptDataFromOpenerPage', resData)
            }
        })
    }
}

export default routers