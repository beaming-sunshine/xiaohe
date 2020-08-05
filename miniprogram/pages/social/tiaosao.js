// miniprogram/pages/social/tiaosao.js
var app = getApp()
Page({
  data: {
    feed: [],
    feed_length: 0,
    shoppings:[]
  },
  //事件处理函数
  bindItemTap: function () {
    wx.navigateTo({
      url: ''
    })
  },
  bindQueTap: function () {
    wx.navigateTo({
      url: ''
    })
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://www.beamingsunshine.cn/HHUC/showshopping.do',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        var jsonLength = 0;
        for (var item in res.data) {
          var key = "条数" + jsonLength
          var year = res.data[key].date.year - 100
          var month = res.data[key].date.month + 1
          var date = res.data[key].date.date
          var time = res.data[key].date.hours + ":" + res.data[key].date.minutes + ":" + res.data[key].date.seconds
          var nowdate = "20" + year + "-" + month + "-" + date + " " + time
          var newArray = [{ title: res.data[key].title, content: res.data[key].content, picUrl: res.data[key].picUrl, user: res.data[key].name, date: nowdate, canshow: res.data[key].canshow}];
          that.setData({
            shoppings: that.data.shoppings.concat(newArray)
          })
          jsonLength++;
        }
      }
    })
  },
    gotsRelease: function () {
    wx.navigateTo({
      url: 'tsrelease/tsrelease'
    })
  }


})
