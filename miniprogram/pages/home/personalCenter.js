// miniprogram/pages/home/personalCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  goManager: function () {
    wx.navigateTo({
      url: 'manager'
    })
  },
  onLoad: function (options) {

  }
})