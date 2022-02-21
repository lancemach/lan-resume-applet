/*
 * @Author: Lance Ma
 * @Date: 2020-03-16 15:54:06
 * @LastEditTime: 2020-05-06 22:38:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: .\config\page-urls.js
 */

const pageConfig = {
    index: '/pages/index/index',
    job: '/pages/job/job',
    uid: '/pages/login/uuid/index'
}

const pageUrl = data => pageConfig[data]

export default pageUrl
