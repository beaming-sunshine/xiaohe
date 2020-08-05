// pages/social/love.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loveletters:[],
    imgUrls: [
      './../../images/image/love2.jpg',
      './../../images/image/love1.jpg',
      './../../images/image/love3.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 800,
    isBtnShow: false,
    scrollTop: false,
    isRefresh: false,
  },

  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://www.beamingsunshine.cn/HHUC/showlove.do',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        var jsonLength = 0;
        for (var item in res.data) {
          var key = "条数"+jsonLength
          var year = res.data[key].date.year - 100
          var month = res.data[key].date.month + 1
          var date = res.data[key].date.date
          var time = res.data[key].date.hours + ":" + res.data[key].date.minutes + ":" + res.data[key].date.seconds
          var nowdate = "20" + year + "-" + month + "-" + date + " " + time
          var newArray = [{ title: res.data[key].title, content: res.data[key].content, picUrl: res.data[key].picUrl, user: res.data[key].user, date: nowdate, nameCansee: res.data[key].nameCansee, canshow: res.data[key].canshow}];
          that.setData({
            loveletters:that.data.loveletters.concat(newArray)
          })
          jsonLength++;
        }
      }
    })
  },
  goRelease: function () {
    wx.navigateTo({
      url: 'release/release'
    })
  }
})