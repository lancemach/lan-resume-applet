/*
 * @Author: Lance Ma
 * @Date: 2020-04-03 20:29:12
 * @LastEditTime: 2020-04-07 10:19:21
 * @LastEditors: Please set LastEditors
 * @Description: 基础配置文件
 * @FilePath: .\components\copyright\index.js
 */
// components/copyright/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    config: {
      type: Object,
      value: {},
      observer (data) {
        this.setData({
          config: data,
        });
      },
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
